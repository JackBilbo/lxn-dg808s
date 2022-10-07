class navpanel {
    constructor(instrument) {
        this.instrument = instrument;
        this.instrumentIdentifier = "lxn";
        this.manualselectedairport = "";

        this.airporticons = {}
    }

    init() {
        this.airportlister = new NearestAirportList(this);
        this.selectedAirport = new AirportInfo(this.instrument);

        this.airportlister.Update(20,200);

        document.querySelector("#nearestairports").addEventListener("click",function(e) {
            let el = e.target.parentNode;
            let icao = el.getAttribute("data-airport");

            document.querySelectorAll("#nearestairports li").forEach((el) => { el.classList.remove("selected") })

            if(NAVPANEL.manualselectedairport == icao) {
                NAVPANEL.manualselectedairport = "";
            } else {
                el.classList.add("selected");
                NAVPANEL.manualselectedairport = icao;
            }
        })

        this.navinit = true;
    }

    update() {
        if(!this.navinit) {  return; }

        this.airportlister.Update(20,200);
        
        if(this.airportlister.loadState != 6) {
            this.listerisloading = true;
        }
        
        if(this.listerisloading && this.airportlister.loadState == 6) {
            // Airportlister finished updating
            this.buildAirportList();
            this.listerisloading = false;
        }

        this.getSelectedAirport();
        this.updateSelectedAirport();
    }

    getSelectedAirport() {

        if(this.airportlister.airports.length == 0) { return false; }
        let currentapt = this.selectedAirport.icao;

        if(this.manualselectedairport != "") {
            this.selectedAirport.icao = this.manualselectedairport;
        } else {
            this.selectedAirport.icao = this.airportlister.airports[0].icao;
        }
      
        if(this.selectedAirport.icao != currentapt) {
            this.selectedAirport.UpdateInfos(null, false);
            this.buildAirportList();
        }
    }

    updateSelectedAirport() {
        let aptlatlng = {lat: this.selectedAirport.coordinates.lat, long: this.selectedAirport.coordinates.long};
        this.instrument.vars.sel_apt_icao.value = this.selectedAirport.ident;  
        this.instrument.vars.sel_apt_name.value = this.selectedAirport.name;
        this.instrument.vars.sel_apt_alt.value = this.selectedAirport.coordinates.alt / 0.3048 ;
        this.instrument.vars.sel_apt_bearing.value = Geo.get_bearing_deg(this.instrument.PLANE_POSITION, aptlatlng);
        this.instrument.vars.sel_apt_dist.value = Geo.get_distance_m(this.instrument.PLANE_POSITION, aptlatlng) / 1852;
        this.instrument.vars.sel_apt_arr_agl.value = 0;

        if(UI.pagepos_x != 0) { return; }  // don't update APT page, if not visible
            
            this.selectedAirport.runways.forEach(function(rwy) {
                document.querySelector(".airportinfo .runways").innerHTML = rwy.designation + ": " + NAVPANEL.instrument.displayValue(rwy.length / 0.3048,"ft","alt") +"x" + NAVPANEL.instrument.displayValue(rwy.width / 0.3048,"ft","alt") + NAVPANEL.instrument.units.alt.pref;
            })
            

            /* arrivalheight - formula as used in waypoint class */
            /* redundant code, but better the reinventing a square wheel */
            
            // Delta is angle between wind and waypoint
            let delta_radians = Geo.DEG_TO_RAD(this.instrument.WIND_DIRECTION_DEG - this.instrument.vars.sel_apt_bearing.value - 180);

            // wind_x_mps is wind speed along line to waypoint (+ve is a tailwind)
            let wind_x_ms = Math.cos(delta_radians) * this.instrument.WIND_SPEED_MS;

            // wind_y_ms is wind speed perpendicular to line to waypoint (the sign is irrelevant)
            let wind_y_ms = Math.sin(delta_radians) * this.instrument.WIND_SPEED_MS;

            // vmg also used for arrival height
            let velocity_made_good_ms;
            if (this.instrument.vars.stf.value * 0.51444 <= Math.abs(wind_y_ms)) {
                velocity_made_good_ms = 1;
            } else {
                velocity_made_good_ms = wind_x_ms + Math.sqrt(Math.pow(this.instrument.vars.stf.value * 0.51444, 2) - Math.pow(wind_y_ms,
                    2));
            }

            this.selectedAirport.tailwind_ms = velocity_made_good_ms - this.instrument.vars.stf.value * 0.51444; // tailwind is +ve

            // *******************************************************************
            // Update wp.arrival_height_msl_m
            // *******************************************************************
            
            let time_to_wp_s;
            let height_needed_m;
            
            time_to_wp_s = (this.instrument.vars.sel_apt_dist.value * 1852) / velocity_made_good_ms;
            height_needed_m = time_to_wp_s * Math.abs(this.instrument.vars.sink_stf.value * 0.51444); // Sink is negative
            this.selectedAirport.arrival_height_msl_m = this.instrument.vars.alt.value * 0.3048 - height_needed_m;

            this.instrument.vars.sel_apt_arr_msl.value = this.selectedAirport.arrival_height_msl_m / 0.3048 ;
            this.instrument.vars.sel_apt_arr_agl.value = this.instrument.vars.sel_apt_arr_msl.value - this.instrument.vars.sel_apt_alt.value;
            this.instrument.vars.sel_apt_ete.value =  time_to_wp_s / 60;


    }

    buildAirportList() {
        let aptlist = document.querySelector("#nearestairports");
        aptlist.innerHTML = "";
        let airporticons =  [];
        
        for(let i=0;i<this.airportlister.airports.length;i++) {
            let item = document.createElement("li");
            item.setAttribute("data-airport", this.airportlister.airports[i].icao);
            item.innerHTML  = '<span class="apt_icao">' + this.airportlister.airports[i].ident + '</span>';
            item.innerHTML += '<span class="apt_name">' + this.airportlister.airports[i].name + '</span>';
            item.innerHTML += '<span class="apt_direction"><span style="transform: rotate(' + (this.airportlister.airports[i].bearing - this.instrument.vars.hdg.value ) + 'deg)">&#8593;</span></span>';
            item.innerHTML += '<span class="apt_dist">' + this.instrument.displayValue(this.airportlister.airports[i].distance, "nm", "dist") + '</span>';
            
            if(this.airportlister.airports[i].icao == this.manualselectedairport) {
                item.setAttribute("class","selected");
            }

            if(typeof(TOPOMAP.addLayer) == "function") {
                let icon = this.airportlister.airports[i].airportClass == 1 ? NAVMAP.bigairportIcon : NAVMAP.smallairportIcon; 

                airporticons.push({
                    "type": "Feature",
                    "geometry": {
                      "type": "Point",
                      "coordinates": [
                        this.airportlister.airports[i].coordinates.long,
                        this.airportlister.airports[i].coordinates.lat
                      ]
                    },
                    "properties": {
                      "myicon": icon
                    }
                  })
            }
            
            aptlist.appendChild(item);
        }

        NAVMAP.paintAirports(airporticons);
        
        this.listisbulidt = true;
    }

}

