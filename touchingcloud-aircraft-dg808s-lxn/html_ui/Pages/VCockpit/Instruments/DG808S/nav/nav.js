
class lxn extends NavSystemTouch {

    constructor() {
        super();

        this.TIMER_05 = 0;
        this.TIMER_1 = 0;

        this.ELECTRICAL_MASTER_BATTERY = true;

        // Colors fpr B21 Soaring Engine Task Management - task will be drawn in dashed lines of these colors
        this.TASK_LINE_WIDTH = 4;
        this.TASK_LINE_DASH_SIZE = 30;
        this.TASK_LINE_CURRENT_COLOR = "#FF9D1E";     // colors just for the current leg
        this.TASK_LINE_CURRENT_COLOR_ALT = "#44273F"; // darker orange?
        this.TASK_LINE_COLOR = "#C60AC6";       // for all task legs except current
        this.TASK_LINE_COLOR_ALT = "#C60AC6";

        this.WAYPOINT_CIRCLE_COLOR = "#FF9D1E";
        this.WAYPOINT_CIRCLE_COLOR_ALT = "#44273F";
        this.WAYPOINT_CIRCLE_WIDTH = 4;

        this.RANGE_COLOR = "#FF9D1E";
        this.RANGE_COLOR_ALT = "#44273F";
        this.RANGE_DASH_SIZE = 30;
        this.RANGE_WIDTH = 4;

        this.WP_SELECTED_COLOR = "#FFFF66";
        this.WP_NON_TASK_COLOR = "#999999";

        this.map_rotation = EMapRotationMode.NorthUp;

        // Temporary legacy values for Speedgauge and Hawk

        this.jbb_mccready = 0;
        this.jbb_mccready_ms = 0;
        this.jbb_refwt = 779;
        this.jbb_avg_wind_direction = 0;
        this.jbb_avg_wind_speed = 0;   
        
        this.jbb_lift_dot_delay = 3;
        this.lift_dots = [];
        this.lift_dots_max = 40;

       	
        this.vars = {            
            ias: { value: 10, label: "IAS", longlabel: "Indicated Airspeed", category: "speed", baseunit: "kts" },
            tas: { value: 10, label: "TAS", longlabel: "True Airspeed", category: "speed", baseunit: "kts" },
            hdg: { value: 0, label: "HDG", longlabel: "Plane Heading", category: "direction", baseunit: "deg"},
            trk: { value: 0, label: "TRK", longlabel: "GPS Groundtrack", category: "direction", baseunit: "deg"},
            gndspd: { value: 0, label: "GND SPD", longlabel: "GPS Groundspeed", category: "speed", baseunit: "kts"},
            stf: { value: 0, label: "STF", longlabel: "Speed to fly", category: "speed", baseunit: "kts" },
            sink_stf: { value: 0, label: "Sink at STF", longlabel: "Sink at Speed to fly", category: "verticalspeed", baseunit: "kts" },
            current_netto: { value: 0, label: "NETTO", longlabel: "Smoothed Netto", category: "verticalspeed", baseunit: "kts"},
            wind_direction: { value: 0, label: "Wind", longlabel: "Wind Direction", category: "direction", baseunit: "deg" },
            wind_spd: { value: 0, label: "Wind", longlabel: "Windspeed", category: "windspeed", baseunit: "kts" },
            wind_vertical: { value: 0, label: "Wind Vert.", longlabel: "Vertical Windspeed", category: "windspeed", baseunit: "kts" },
            mccready: { value: 0, label: "MC", longlabel: "McCready Value", category: "verticalspeed", baseunit: "kts"},
            alt: { value: 13542, label: "ALT", longlabel: "Altitude", category: "alt", baseunit: "ft" },
            alt_gnd: { value: 3318, label: "ALT (GND)", longlabel: "Altitude above Ground", category: "alt", baseunit: "ft" },
            oat: { value: 1, label: "OAT", longlabel: "Outside Air Temperature",category:"temperature", baseunit: "F"},
            ballast: { value: 348, label: "Ballast", longlabel: "Current Ballast",category:"weight", baseunit: "lbs"},
            localtime: { value: 0, label: "Local", longlabel: "Local Time", category: "time_of_day", baseunit: "s"},
            sel_apt_icao: { value: "XXXX", label: "APT ICAO", longlabel: "Selected Airport ICAO", category: "plaintext", baseunit: "none" },
            sel_apt_name: { value: "NAME", label: "APT NAME", longlabel: "Selected Airport Name", category: "plaintext", baseunit: "none" },
            sel_apt_alt: { value: 0, label: "APT ALT", longlabel: "Selected Airport Altitude", category: "alt", baseunit: "ft" },
            sel_apt_bearing: { value: 0, label: "APT BRG", longlabel: "Selected Airport Bearing", category: "direction", baseunit: "deg" },
            sel_apt_dist: { value: 0, label: "APT DIST", longlabel: "Selected Airport Distance", category: "dist", baseunit: "nm" },
            sel_apt_arr_agl: { value: 0, label: "APT ARR (AGL)", longlabel: "Selected Airport Arrival (AGL)", category: "alt", baseunit: "ft" },
            sel_apt_arr_msl: { value: 0, label: "APT ARR (MSL)", longlabel: "Selected Airport Arrival (MSL)", category: "alt", baseunit: "ft" },
            sel_apt_ete: { value: 0, label: "APT ETE", longlabel: "Selected Airport Time Enroute", category: "time", baseunit: "min" },
            wp_name: { value: "", label: "WP NAME", longlabel: "Waypoint Name", category: "plaintext", baseunit: "none" },
            wp_alt: { value: 0, label: "WP ALT", longlabel: "Waypoint Altitude", category: "alt", baseunit: "ft" },
            wp_bearing: { value: 0, label: "WP BRG", longlabel: "Waypoint Bearing", category: "direction", baseunit: "deg" },
            wp_dist: { value: 0, label: "WP DIST", longlabel: "Waypoint Distance", category: "dist", baseunit: "nm" },
            wp_arr_agl: { value: 0, label: "WP ARR (AGL)", longlabel: "Waypoint Arrival (AGL)", category: "alt", baseunit: "ft" },
            wp_arr_msl: { value: 0, label: "WP ARR (MSL)", longlabel: "Waypoint Arrival (MSL)", category: "alt", baseunit: "ft" },
            wp_ete: { value: 0, label: "WP ETE", longlabel: "Waypoint Time Enroute", category: "time", baseunit: "min" }

        }
        /* for Dev-Purposes added DEBUG-Values, that can simply filled with text. Should be removed for production use */
        
        this.units = {
            speed: { pref: "kts", imperial: "kts", metric: "kmh", options: ["kts","kmh","ms","mph"] },
            dist: { pref: "nm", imperial: "nm", metric: "km", options: ["nm","ml","km","m"] },
            alt: { pref: "ft", imperial: "ft", metric: "m", options: ["ft","m"] },
            windspeed: { pref: "kts", imperial: "kts", metric: "ms", options: ["kts","kmh","ms","fs"] },
            verticalspeed: { pref: "kts", imperial: "kts", metric: "ms", options: ["kts","kmh","ms","fs"] },
            direction: { pref: "deg", imperial: "deg", metric: "deg", options: ["deg"] },
            weight: {  pref: "lbs", imperial: "lbs", metric: "kg", options: ["lbs", "kg"] },
            temperature: {  pref: "F", imperial: "F", metric: "C", options: ["F", "C"] },
            time: { pref: "min", imperial: "min", metric: "min", options: ["min","sec"] },
            time_of_day:  { pref: "hms24", imperial: "hms12", metric: "hms24", options: ["hms12","hms24"] },
            plaintext:  { pref: "none", imperial: "none", metric: "none", options: ["none"] }
        }
        
        this.factors = {
            speed: {
                kts : 1,
                kmh : 1.852,
                mph : 1.15078,
                ms : 0.51444
            },
            dist: {
                nm : 1,
                km : 1.852,
                ml : 1.15078,
                m  : 1852
            },
            direction: {
                deg: 1
            },
            windspeed: {
                kts : 1,
                kmh : 1.852,
                mph : 1.15078,
                ms : 0.51444
            },
            verticalspeed: {
                kts : 1,
                kmh : 1.852,
                mph : 1.15078,
                ms : 0.51444
            },
            alt: {
                ft: 1,
                m: 0.3048
            },
            weight: {
                lbs: 1,
                kg: 0.453592
            },
            temperature: {
                F: 1,
                C: 0.55555555
            },
            time: {
                min: 1    
            },
            time_of_day: {
                hms24: 1,
                hms12: 1
            }
        }
		
    }

    get templateID() {
        return "lxn";
    } // ID of <script> tag in nav.html
	
	system_init() {
        
        let LXNAV = this; // Psst, grobi, tell me what THIS is, please...
        this.mainframe = document.querySelector("#mainframe");
        this.panelframe = document.querySelector("#panelframe");
        this.pages = [];
        this.panels = [];
        this.pagepos_x = 0;
        this.pagepos_y = 0;
        this.pagewidth = 867;
        this.pageheight = 1319;

        this.test = "";

        this.KNOBS_VAR = ("0000" + SimVar.GetSimVarValue("TRANSPONDER CODE:1", "number")).slice(-4);
        this.prev_knobs_var = this.KNOBS_VAR;

        if(GetStoredData("Discus_unitsetting")) {
            this.setUnitPrefs(GetStoredData("Discus_unitsetting"));           
        } else {
            this.setUnitPrefs("metric");
        }

        document.getElementById("nav_debug").innerHTML += "System init<br />";
        /* Collect available panels and pages */
        document.querySelectorAll(".panel").forEach( function(p,i) {
            LXNAV.panels.push(p);
            LXNAV.pages[i] = [];
            p.querySelectorAll(".page").forEach( function(page) {
                LXNAV.pages[i].push(page);
            })
            document.getElementById("nav_debug").innerHTML += i + "/" + LXNAV.pages[i].length + " Pages<br />";
        });

        this.pages[this.pagepos_x][this.pagepos_y].classList.add("current");

        /* Make pages swipable */

        let mousedownpos;

        this.panelframe.addEventListener("mousedown", (e)=> {
            mousedownpos = e;
        })

        this.panelframe.addEventListener("mouseup", (e)=> {
            if(typeof(mousedownpos) == "object") {
                if(e.offsetX - mousedownpos.offsetX < -300) { this.swipeRight() }
                else if(e.offsetX - mousedownpos.offsetX > 300) { this.swipeLeft() }
                else if(e.offsetY - mousedownpos.offsetY < -300) { this.swipeUp() }
                else if(e.offsetY - mousedownpos.offsetY > 300) { this.swipeDown() }
            } 
        })


        /* Editable Datacells */

        document.querySelector("#toggle_config").addEventListener("click", function() {
            document.querySelector("#panelframe").classList.toggle("configmode");
        });

        document.querySelector("#map_orientation").addEventListener("click", function() {
            
            if(LXNAV.map_rotation == 1) {
                LXNAV.map_rotation = EMapRotationMode.NorthUp;
                document.querySelector("#battery_required").setAttribute("class","map_northup");
            } else {
                LXNAV.map_rotation = EMapRotationMode.TrackUp;
                document.querySelector("#battery_required").setAttribute("class","map_trackup");
            }

            LXNAV.set_map_rotation(LXNAV.map_rotation);
        });

        document.querySelector("#map_zoomin").addEventListener("click", function() {
            LXNAV.zoom_in();
        })

        document.querySelector("#map_zoomout").addEventListener("click", function() {
            LXNAV.zoom_out();
        })
        
        /* make all datacells clickable */
        document.querySelectorAll(".datacell").forEach((el)=>{
            let myid = el.getAttribute("id");
            if(GetStoredData("discus_" + myid)) {
                el.setAttribute("data-userconfig", GetStoredData("discus_" + myid))
            }

            // Retrieve JSON-String containing possible user settings
            // and set el.setAttribute("user", JSONSTRING);

            el.addEventListener("click", function() {
                if( document.getElementById("panelframe").classList.contains("configmode")) {
                    LXNAV.editConfig(this);
                }
            })
        })

        /* Form Action in config-Panel - prepare and set userconfig to data-attribute */
        document.querySelector("#cellconfig").addEventListener("submit", function(e) {
            e.preventDefault();
            let currentconfig = {
                "back": document.querySelector("#cell-background").value,
                "backneg": document.querySelector("#cell-backgroundneg").value,
                "text": document.querySelector("#cell-text").value,
                "value": document.querySelector("#cell-value").value
            }

            let cellid = this.getAttribute("data-cellrelation");

            if(currentconfig.value == "none") {
                /* Nothing to display, so clear the cell */
                document.getElementById(cellid).querySelector(".label").innerHTML = "";
                document.getElementById(cellid).querySelector(".number").innerHTML = "";
                document.getElementById(cellid).querySelector(".unit").innerHTML = "";
            }

            if( cellid != "" ) {
                document.getElementById(cellid).setAttribute("data-userconfig", JSON.stringify(currentconfig));
                SetStoredData("discus_" + cellid, JSON.stringify(currentconfig));
            }

            document.querySelector("#cellconfigpanel").style.display = "none";
        })

        document.querySelector("#configreset").addEventListener("click", function(e) {
            e.preventDefault();
            document.querySelector("#cellconfigpanel").style.display = "none";
        })

        document.querySelector("#resetall").addEventListener("click", function(e) {
            console.log("resetting all datafields");
            document.querySelectorAll(".datacells_top .datacell, .datacells_bottom .datacell").forEach((el)=>{
                let cellid = el.getAttribute("id");
                console.log(cellid);
                el.setAttribute("data-userconfig","");
                SetStoredData("discus_" + cellid, "");
            })
        })

        /* Simulate colorpickers, since webview doesnt support html5 input types */

        const rgba2hex = (rgba) => `#${rgba.match(/^rgba?\((\d+),\s*(\d+),\s*(\d+)(?:,\s*(\d+\.{0,1}\d*))?\)$/).slice(1).map((n, i) => (i === 3 ? Math.round(parseFloat(n) * 255) : parseFloat(n)).toString(16).padStart(2, '0').replace('NaN', '')).join('')}`

        document.querySelectorAll(".colorpatch").forEach((el) => {
            el.addEventListener("click", (e)=> {
                let thiscolor = rgba2hex(e.target.style.backgroundColor);
                e.target.parentNode.parentNode.querySelector("input").value = thiscolor;
                e.target.parentNode.parentNode.querySelector("input").dispatchEvent(new Event('change'));
            })
        })

        document.querySelectorAll(".colorpicker input").forEach((picker) => {
            picker.addEventListener("change", (e) => {
                e.target.parentNode.querySelector(".colorpatches").style.backgroundColor = e.target.value;
            })
        })

        /* Populate config-form with all available Variables. Maybe later grouped with optgroup or even split into different selects */

        for(var variable in this.vars) {
            let thisvar = this.vars[variable];
            let thisentry = document.createElement("option");
            thisentry.setAttribute("value", variable);
            thisentry.text = thisvar.longlabel;
    
            document.querySelector("#cell-value").appendChild(thisentry);
        }
    
        /* activate Config page */
    
        document.querySelectorAll(".lxconfigbtn").forEach((el)=> {
            el.addEventListener("click", function(e) {
                e.stopPropagation();
                let target = this.getAttribute("aria-controls");
                document.getElementById(target).classList.add("active");
            })
        });
    
        document.querySelectorAll(".configpanel_close").forEach((el)=> {
            el.addEventListener("click", function(e) {
                document.querySelectorAll(".configpanel").forEach((el)=>{
                    el.classList.remove("active");
                })
            })
        });
    
        /* Unitswitching on systemspanel - simple buttons, while we don't have anything more sophisticated */
    
        document.getElementById("conf_units_imperial").addEventListener("click", function(e) {
            LXNAV.setUnitPrefs("imperial");
        })
    
        document.getElementById("conf_units_metric").addEventListener("click", function(e) {
            LXNAV.setUnitPrefs("metric");
        })

        document.getElementById("wp_back").addEventListener("click", function() {
            if(LXNAV.task_index() > 0) {
                LXNAV.change_wp(-1);
            }
        })

        document.getElementById("wp_next").addEventListener("click", function() {
            if(LXNAV.task_index() < LXNAV.task_length() -1 ) {
                LXNAV.change_wp(1);
            }
        })
        
        this.init_speedgauge();
        this.jbb_init_calc_polar();

	}

    connectedCallback() {
        super.connectedCallback();

        this.system_init();

        // Map display elements for B21 Map & Task Management
        this.map_overlay_el = document.getElementById("lx_9050_map_overlay");
        this.task_svg_el = document.getElementById("lx_9050_task");

        this._isConnected = true;

        this.airportlister = new lxn_Touch_NRST_Airport()

        this.pageGroups = [
            new lxn_Touch_PageGroup("NRST", this, [
                new lxn_Touch_NavSystemPage("Nearest Airport", "NearestAirport", this.airportlister, "Apt", "/Pages/VCockpit/Instruments/NavSystems/Shared/Images/TSC/Icons/ICON_MAP_AIRPORT.png")
            ])
        ]

	}
	
    disconnectedCallback() {
        super.disconnectedCallback();
    }
	
    get isInteractive() {
        return true;
    }  

    onUpdate(_deltaTime) {
        super.onUpdate(_deltaTime);

        if (!this._isConnected) {
            return;
        }

        let LXNAV = this;
        this.vars.ias.value = SimVar.GetSimVarValue("A:AIRSPEED INDICATED", "knots");
        this.vars.tas.value = SimVar.GetSimVarValue("A:AIRSPEED TRUE", "knots");
        this.vars.hdg.value = SimVar.GetSimVarValue("A:PLANE HEADING DEGREES TRUE","degrees");
        this.vars.trk.value = SimVar.GetSimVarValue("GPS GROUND TRUE TRACK","degrees");
        this.vars.gndspd.value = SimVar.GetSimVarValue("A:GPS GROUND SPEED","knots");
        this.vars.alt.value = SimVar.GetSimVarValue("A:PLANE ALTITUDE", "feet");
        this.vars.alt_gnd.value = SimVar.GetSimVarValue("A:PLANE ALT ABOVE GROUND", "feet");
        this.vars.wind_spd.value = parseFloat(SimVar.GetSimVarValue("A:AMBIENT WIND VELOCITY", "knots"));
        this.vars.wind_direction.value = parseFloat(SimVar.GetSimVarValue("A:AMBIENT WIND DIRECTION", "degrees"));
        this.vars.wind_vertical.value = SimVar.GetSimVarValue("A:AMBIENT WIND Y", "knots");
        this.vars.current_netto.value = (this.vars.current_netto.value * 0.9) + (SimVar.GetSimVarValue("L:NETTO", "knots") * 0.1);
        


        /* Set Vars for B21 Functions */

        this.TIME_S = SimVar.GetSimVarValue("E:SIMULATION TIME","seconds");
        this.AIRSPEED_MS = SimVar.GetSimVarValue("A:AIRSPEED INDICATED", "meters per second");
        this.AIRSPEED_TRUE_MS = SimVar.GetSimVarValue("A:AIRSPEED TRUE", "meters per second");
        this.ALTITUDE_M = SimVar.GetSimVarValue("A:INDICATED ALTITUDE", "meters");
        this.ON_GROUND = SimVar.GetSimVarValue("SIM ON GROUND", "bool") ? true : false;
        this.TOTAL_WEIGHT_KG = SimVar.GetSimVarValue("A:TOTAL WEIGHT", "kilograms");
        this.PLANE_POSITION = this.get_position(); // returns a MSFS LatLong()
        this.WIND_DIRECTION_DEG = SimVar.GetSimVarValue("A:AMBIENT WIND DIRECTION", "degrees");
        // Get wind speed with gust filtering
        if (this.WIND_SPEED_MS==null) {
            this.WIND_SPEED_MS = SimVar.GetSimVarValue("A:AMBIENT WIND VELOCITY", "meters per second");
        }
        this.WIND_SPEED_MS = 0.99 * this.WIND_SPEED_MS  + 0.01 * SimVar.GetSimVarValue("A:AMBIENT WIND VELOCITY", "meters per second");

        this.MACCREADY_MS = this.vars.mccready.value * 0.51444;
 

        this.load_map();
        
        this.jbb_update_hawk();
        this.update_speedgauge();
        
        if (this.map_instrument_loaded) {
            this.update_sim_time();
            // this.ex="C";this.update_nav();
            this.update_map();
            this.update_task_load();

            //this.ex="G";this.update_ai();
            //this.ex="M";this.update_task_message(); // Clear any task message after display period
            //this.ex="T";this.thermalling_display.update();

            if(this.map_rotation == EMapRotationMode.NorthUp) {
                document.getElementById("glidericon").style.transform = "rotate(" + this.vars.hdg.value + "deg)";
            } else {
                document.getElementById("glidericon").style.transform = "rotate(0deg)";
            }

            if(this.vars.ias.value > 20) {
                document.getElementById("ac_trk").style.transform = "rotate(" + (this.vars.trk.value - this.vars.hdg.value) + "deg)";
            } 
            
        }     


        if(this.TIME_S - this.TIMER_05 > 0.5) {
            /* Stuff happening twice per second ***************************************************** */
            this.TIMER_05 = this.TIME_S;

            this.jbb_update_stf();

            if (this.map_instrument_loaded) {

                if (this.task != null && this.task_active()) {
                    this.task.update();
                    this.ex="F";this.update_task_page();
                    this.update_task_wp_switch();
                }

                this.vars.wp_name.value = this.task.current_wp().name;
                this.vars.wp_dist.value = this.task.current_wp().distance_m / 1852; // convert to baseunit
                this.vars.wp_bearing.value = this.task.current_wp().bearing_deg;
                this.vars.wp_arr_msl.value = this.task.current_wp().arrival_height_msl_m / 0.3048;
                this.vars.wp_ete.value = this.task.current_wp().ete / 60;
                this.vars.wp_alt.value = this.task.current_wp().alt_m / 0.3048;
                this.vars.wp_arr_agl.value = (this.task.current_wp().arrival_height_msl_m - this.task.current_wp().alt_m) / 0.3048;
            }

            this.STF_SPEED_0_MS = this.vars.stf.value * 0.5144;
            this.STF_SINK_0_MS = this.vars.sink_stf.value * 0.5144;

            this.updateKineticAssistant();
        }

        if(this.TIME_S - this.TIMER_1 > 1) {
            /* Stuff happening every second ********************************************************* */
            this.TIMER_1 = this.TIME_S;

            
            this.vars.oat.value = parseFloat(SimVar.GetSimVarValue("A:AMBIENT TEMPERATURE", "fahrenheit"));
            this.vars.ballast.value = parseFloat(SimVar.GetSimVarValue("PAYLOAD STATION WEIGHT:3", "pounds") + SimVar.GetSimVarValue("PAYLOAD STATION WEIGHT:4", "pounds") + SimVar.GetSimVarValue("PAYLOAD STATION WEIGHT:6", "pounds") + SimVar.GetSimVarValue("PAYLOAD STATION WEIGHT:5", "pounds"));
            this.vars.localtime.value = SimVar.GetSimVarValue("E:LOCAL TIME","seconds");

            this.updateLiftdots();
            this.updateSelectedAirport();

        }

        if(this.lift_dots_timer_prev == null) {
            this.lift_dots_timer_prev = this.TIME_S;
        }

        if(this.TIME_S - this.lift_dots_timer_prev > this.jbb_lift_dot_delay && this.vars.ias.value > 40) {
            this.lift_dots_timer_prev = this.TIME_S;
            this.addLiftdot()
        }

        /* now update all visible datacells with their selected values */
        document.querySelectorAll(".current .datacell").forEach((cell)=> {
            let currentconfigstr = cell.getAttribute("data-userconfig") != "" ? cell.getAttribute("data-userconfig") : cell.getAttribute("data-default");
            
            if(currentconfigstr != null) {
                let currentconfig = JSON.parse(currentconfigstr);
                if(currentconfig.value != "none") {

                    let displaynumber; 
                    if(LXNAV.vars[currentconfig.value].category != "plaintext") {
                        displaynumber = LXNAV.displayValue(LXNAV.vars[currentconfig.value].value, LXNAV.vars[currentconfig.value].baseunit, LXNAV.vars[currentconfig.value].category);
                    } 
                    
                    cell.style.backgroundColor = displaynumber > 0 ? currentconfig.back + "BB" : currentconfig.backneg + "BB";
                    cell.style.color = currentconfig.text;
        
                    cell.querySelector(".label").innerHTML = LXNAV.vars[currentconfig.value].label;
                    
                    if(LXNAV.vars[currentconfig.value].category != "plaintext") {
                        cell.querySelector(".number").innerHTML = displaynumber;
                        cell.querySelector(".unit").innerHTML = LXNAV.units[LXNAV.vars[currentconfig.value].category].pref;
                    } else {
                        cell.querySelector(".number").innerHTML = LXNAV.vars[currentconfig.value].value;
                        cell.querySelector(".unit").innerHTML = "";
                    }
                } else {
                    cell.style.backgroundColor = "transparent";
                    cell.style.color = "transparent";
                }
            }
        })
        
        /* same for any "livedata"- fields, that might be present in a currently selected panel */
        document.querySelectorAll(".current .livedata, .pageheader .livedata").forEach((field)=> {
            let requestedvalue = field.getAttribute("data-value");
            let preferredunit;
            if(field.getAttribute("showunit") == "no") {
                preferredunit = "";   
            } else {
                preferredunit = LXNAV.units[LXNAV.vars[requestedvalue].category].pref;
            }     
            
            if(LXNAV.vars[requestedvalue].category != "plaintext") {
                field.innerHTML = LXNAV.displayValue(LXNAV.vars[requestedvalue].value, LXNAV.vars[requestedvalue].baseunit, LXNAV.vars[requestedvalue].category) + preferredunit;
            }
            else {
                
                field.innerHTML = LXNAV.vars[requestedvalue].value;
            }   
     })


         /* keybindings */

        this.KNOBS_VAR = ("0000" + SimVar.GetSimVarValue("TRANSPONDER CODE:1", "number")).slice(-4); // knobs encoded in 4 digits of XPNDR
        
        if (this.prev_knobs_var[2] > this.KNOBS_VAR[2] || (this.prev_knobs_var[2] == 0 && this.KNOBS_VAR[2] == 7)) {
            this.prev_knobs_var = this.KNOBS_VAR;
            this.map_instrument.zoomOut();
        }

        if (this.prev_knobs_var[2] < this.KNOBS_VAR[2] || (this.prev_knobs_var[2] == 7 && this.KNOBS_VAR[2] == 0)) {
            this.prev_knobs_var = this.KNOBS_VAR;
            this.map_instrument.zoomIn();
        }

        if (this.prev_knobs_var[3] > this.KNOBS_VAR[3] || (this.prev_knobs_var[3] == 0 && this.KNOBS_VAR[3] == 7)) {
            this.prev_knobs_var = this.KNOBS_VAR;
            this.swipeLeft();
         }
 
         if (this.prev_knobs_var[3] < this.KNOBS_VAR[3] || (this.prev_knobs_var[3] == 7 && this.KNOBS_VAR[3] == 0)) {
            this.prev_knobs_var = this.KNOBS_VAR;
            this.swipeRight();
         }

         if (this.prev_knobs_var[1] > this.KNOBS_VAR[1] || (this.prev_knobs_var[1] == 0 && this.KNOBS_VAR[1] == 7)) {
            this.prev_knobs_var = this.KNOBS_VAR;
            this.swipeUp();
         }
 
         if (this.prev_knobs_var[1] < this.KNOBS_VAR[1] || (this.prev_knobs_var[1] == 7 && this.KNOBS_VAR[1] == 0)) {
            this.prev_knobs_var = this.KNOBS_VAR;
            this.swipeDown();
         }
    	           

	
    }





    /* Utility Function to display Data converted to User Preference */
    /* Input any numerical Value, the current Unit and the Variable category (speed, distance, etc. as defined in the units-object) */
    /* Returns the Number converted to whatever preference the User has set. */
    /* Unit abbreviation (and Batteries) not included */
    /* Unit abbreviation can be easily retrieved: units.category.pref */

    displayValue(val,baseunit,category) {
        val = parseFloat(val); // better make sure, it's a number
        let selected_unit = this.units[category].pref;
        let result = 0;

        if(this.factors[category][baseunit] == 1) {
            let factor = this.factors[category][selected_unit];
            result = val * factor;
        } else {
            let interim = val / this.factors[category][baseunit];
            let factor = this.factors[category][selected_unit];
            result = interim * factor;
        }

        /* We'll propably see a huge amount of special formatting exceptions here for various unit types. "+" for AGL e.g. */
        if(category == "time_of_day") {
            let time = val;
			let seconds = Math.floor(time % 60);
			let minutes = Math.floor((time / 60) % 60);
			let hours = Math.floor(Math.min(time / 3600, 99));
			result = ("0" + hours).substr(-2) + ":" + ("0" + minutes).substr(-2) + ":" + ("0" + seconds).substr(-2);
			
        }

        if(category == "temperature") {
            if(baseunit == "F" && selected_unit == "C") {
                result = (val - 32) * 5/9;
            }
            
            result = result.toFixed(1);
        }

        if(category == "alt" || category == "dist") {
            if(Math.abs(result) > 9999) {
                result = (result/1000).toFixed(1) + "k";
            } else if (Math.abs(result) < 100) {
                result = result.toFixed(1);
            } else {
                result = result.toFixed(0);
            }
        }

        if(category == "windspeed" || category == "verticalspeed") {
            result = result < 10 ? result.toFixed(1) : result.toFixed(0);
        }

        /* if no formatting has messed with our result up to this point, simply make it a whole number */
        if(typeof(result) == "number") { result = result.toFixed(0); }

        return result;
    }




    /* Interface Functions */

    editConfig(el) {
        /* read current cell confiuguration and prepare config-panel */
        let currentconfigstr = el.getAttribute("data-userconfig") != "" ? el.getAttribute("data-userconfig") : el.getAttribute("data-default");
        
        let currentconfig = currentconfigstr != null ? JSON.parse(currentconfigstr) : {"back": "#000000", "backneg": "#000000","text": "#ffffff", "value": "none"};
        
        document.querySelector("#cell-background").value = currentconfig.back;
        document.querySelector("#cell-backgroundneg").value = currentconfig.backneg;
        document.querySelector("#cell-text").value = currentconfig.text;

        let options = document.querySelectorAll("#cell-value option");
        let selectedoption = 0;

        for(var i = 0; i < options.length; i++) {
            if(options[i].value == currentconfig.value) { selectedoption = i}
        }

        document.querySelector("#cell-value").selectedIndex = selectedoption;

        document.querySelector("#cellconfigpanel").style.display = "block";
        document.querySelector("#cellconfig").setAttribute("data-cellrelation", el.getAttribute("id"));
    }

    setUnitPrefs(sys) {
        // security. We currently only support imp & metric
        sys = sys == "imperial" ? "imperial" : "metric";
        document.getElementById("nav_debug").innerHTML += "Setting: " + sys;
        for(var cat in this.units) {
            this.units[cat].pref = this.units[cat][sys];
            document.getElementById("nav_debug").innerHTML += cat + ": " + this.units[cat].pref + "<br />";
        }

        SetStoredData("Discus_unitsetting", sys);
        
        if(sys == "imperial") {
            document.getElementById("conf_units_imperial").classList.add("highlighted");
            document.getElementById("conf_units_metric").classList.remove("highlighted");
            SimVar.SetSimVarValue("L:UNITS_IMPERIAL", "percent", 100);
        } else {
            document.getElementById("conf_units_metric").classList.add("highlighted");
            document.getElementById("conf_units_imperial").classList.remove("highlighted");
            SimVar.SetSimVarValue("L:UNITS_IMPERIAL", "percent", 0);
        }
        document.getElementById("nav_debug").innerHTML += "Units set to " + sys;
    }

    
    swipeRight() {
        this.pages[this.pagepos_x][this.pagepos_y].classList.remove("current");
        this.panels[this.pagepos_x].querySelector(".pageframe").style.transform = "translate(0px, 0px)";
        this.pagepos_y = 0;
        this.pagepos_x = this.pagepos_x >= this.pages.length-1 ? 0 : this.pagepos_x + 1;
        this.panelframe.style.transform = "translate(-" + (this.pagepos_x * this.pagewidth) +"px,0)";
        this.updatePageClasses(this.pagepos_x,this.pagepos_y);
    }

    swipeLeft() {
        this.pages[this.pagepos_x][this.pagepos_y].classList.remove("current");
        this.panels[this.pagepos_x].querySelector(".pageframe").style.transform = "translate(0px, 0px)";
        this.pagepos_y = 0;
        this.pagepos_x = this.pagepos_x <= 0 ? this.pages.length-1 : this.pagepos_x - 1;
        this.panelframe.style.transform = "translate(-" + (this.pagepos_x * this.pagewidth) +"px,0)";
        this.updatePageClasses(this.pagepos_x,this.pagepos_y);
    }

    swipeUp() {
        if(this.pagepos_y >= this.pages[this.pagepos_x].length -1) { return }
        this.pages[this.pagepos_x][this.pagepos_y].classList.remove("current");
        this.pagepos_y++;
        this.panels[this.pagepos_x].querySelector(".pageframe").style.transform = "translate(0px, -" + (this.pagepos_y * this.pageheight) + "px)";
        this.updatePageClasses(this.pagepos_x,this.pagepos_y);
    }

    swipeDown() {
        if(this.pagepos_y <= 0) { return }
        this.pages[this.pagepos_x][this.pagepos_y].classList.remove("current");
        this.pagepos_y--;
        this.panels[this.pagepos_x].querySelector(".pageframe").style.transform = "translate(0px, -" + (this.pagepos_y * this.pageheight) + "px)";
        this.updatePageClasses(this.pagepos_x,this.pagepos_y);
    }

    updatePageClasses(x,y) {
        this.pages[this.pagepos_x][this.pagepos_y].classList.add("current");
        if(this.pages[this.pagepos_x][this.pagepos_y].querySelector(".datacells_top") != null) {
            document.querySelectorAll(".mapbutton").forEach((e) => {
                e.style.display = "block";
            })
            document.querySelector("#hawk").style.display = "block";
            document.querySelector(".speedgauge").style.display = "block";
        } else {
            document.querySelectorAll(".mapbutton").forEach((e) => {
                e.style.display = "none";
            })
            document.querySelector("#hawk").style.display = "none";
            document.querySelector(".speedgauge").style.display = "none";
        }
    }
    


    /* special Interface stuff like Speedladder & Hawk */

    jbb_init_calc_polar() {
        // Init polar calculation according to Helmut Reichmanns Formula
        // write a,b,c to Variables for later use in actual STF-calculation
        // polar values from Vario-Script:

        // Speed and sink in knots at Minimum Sink
        let c4 = 48;
        let d4 = -0.83585;

        // Speed and sink in knots at best glide
        let c5 = 57;
        let d5 = -0.9136;

        // Speed and sink in knots at "fast speed" - around 92kts/170kmh
        let c6 = 92;
        let d6 = -1.94384;
 
         let atop = (c6-c5) * (d4-d5) + (c5-c4) * (d6-d5);
         let abottom = c4 * c4 * (c6 -c5) + c6 * c6 * (c5-c4) + c5 * c5 * (c4-c6);
         this.jbb_calcpolar_a = atop/abottom;
     
         let btop = d6 - d5 - this.jbb_calcpolar_a * (c6 * c6 - c5 * c5);
         let bbottom = c6 - c5;
     
         this.jbb_calcpolar_b  = btop/bbottom;
     
         this.jbb_calcpolar_c = d5 - this.jbb_calcpolar_a * c5 * c5 - this.jbb_calcpolar_b * c5;

    }

    jbb_update_stf()  {
        // No "Bugs" on simulated wings so far
        let bugs = 100;
        let ballast = this.vars.ballast.value;
        let wf = Math.sqrt(eval(this.jbb_refwt + parseFloat(ballast)) / this.jbb_refwt);
    
        let aa = this.jbb_calcpolar_a / wf * 100 / bugs;
        let bb = this.jbb_calcpolar_b * 100 / bugs;
        let cc = this.jbb_calcpolar_c * wf * 100 / bugs;

        let mccready = this.vars.mccready.value;
        
        // temporarily shift mccready to give higher speed in netto sink and slower in climbs. Does that make sense??
        // this.jbb_smoothed_netto = (this.jbb_smoothed_netto * 0.9) + (SimVar.GetSimVarValue("L:NETTO", "meters per second").toFixed(2) * 0.1);
        // let mccready_shifted = mccready - this.vars.current_netto.value;
        // if (mccready_shifted < 0) { mccready_shifted = 0; }

        let stf = Math.sqrt((cc - mccready) /aa).toFixed(0);

        this.vars.sink_stf.value = (aa * stf * stf) + (bb * stf) + cc;
        this.vars.stf.value = stf;

        // let ias = SimVar.GetSimVarValue("A:AIRSPEED INDICATED", "knots");
        // this.jbb_current_polar_sink = (aa * ias * ias) + (bb * ias) + cc;
    }

    init_speedgauge() {
        
        var minspeed_kph = 60;
        var stallspeed_kph = 80;
        var maneuverspeed_kph = 200;
        var maxspeed_kph = 300;

        var minspeed_kts = 30;
        var stallspeed_kts = 43;
        var maneuverspeed_kts = 108;
        var maxspeed_kts = 160;

        for(let i = minspeed_kph; i <= maxspeed_kph + 20; i+=5) {
            let t = document.createElement("span");
            let markerclass = "";

            if(i < stallspeed_kph || i >= maxspeed_kph) {  markerclass = "tick_warn";  }
            if(i > maneuverspeed_kph && i < maxspeed_kph) {  markerclass = "tick_alert"; }

            t.setAttribute("class", "tick " + markerclass);

            if((i % 10) == 0) {
                let l = document.createElement("span");
                l.classList.add("label");
                l.innerHTML = i;
                t.append(l);
            }
            this.querySelector(".speedladder.kmh").prepend(t);
        }

        for(let i = minspeed_kts; i <= maxspeed_kts + 20; i+=5) {
            let t = document.createElement("span");
            let markerclass = "";

            if(i < stallspeed_kts || i >= maxspeed_kts) {  markerclass = "tick_warn";  }
            if(i > maneuverspeed_kts && i < maxspeed_kts) {  markerclass = "tick_alert"; }
            t.setAttribute("class", "tick " + markerclass);

            if((i % 10) == 0) {
                let l = document.createElement("span");
                l.classList.add("label");
                l.innerHTML = i;
                t.append(l);
            }
            this.querySelector(".speedladder.kts").prepend(t);
        }

        this.querySelector(".mccready .datacell-clickspot").addEventListener("click", function(el) {
            this.parentNode.classList.toggle("expanded");
        })

        let that = this;
        this.querySelectorAll(".speedgauge .button").forEach((e)=> {
            e.addEventListener("click", function (e) {

                if(e.target.classList.contains("inc")) {
                    that.vars.mccready.value += 0.2;
                }
                if(e.target.classList.contains("dec")) {
                    that.vars.mccready.value = that.vars.mccready.value <= 0 ? 0 : that.vars.mccready.value - 0.2;
                }
            })
        })
    }

    update_speedgauge() {
        if(this.slew_mode || document.querySelector(".speedgauge").style.display == "none") { return; }
        let units = SimVar.GetSimVarValue("L:UNITS_IMPERIAL", "percent") == 100;
        let IAS = SimVar.GetSimVarValue("A:AIRSPEED INDICATED", "kph");
        let speedbandoffset = -210;

        this.querySelector(".speedband").setAttribute("class", (units ? "speedband kts" : "speedband kmh"));
        this.querySelector(".currentspeed span").innerHTML = (units? IAS/1.852 : IAS).toFixed(0);

        if(IAS > 60 && IAS < 350) {
            document.querySelector(".speedladder.kmh").style.transform = "translate(0," + (speedbandoffset + (IAS - 60) * 10) +  "px)";
            document.querySelector(".speedladder.kts").style.transform = "translate(0," + (speedbandoffset + (IAS/1.852 - 30) * 10) +  "px)";

            this.querySelector(".speedladder.kmh .stfmarker").style.transform = "translate(0,-" + ((this.vars.stf.value * 1.852 - 60) * 10) +  "px)";
            this.querySelector(".speedladder.kts .stfmarker").style.transform = "translate(0,-" + ((this.vars.stf.value - 30) * 10) +  "px)";

        } else {
            document.querySelector(".speedladder.kmh").style.transform = "translate(0, " + speedbandoffset +  "px)";
            document.querySelector(".speedladder.kts").style.transform = "translate(0, " + speedbandoffset +  "px)";
        }

        
    }

    jbb_update_hawk() {
        let current_wind_direction = this.vars.wind_direction.value;
        if (this.jbb_avg_wind_direction == 0) {
            this.jbb_avg_wind_direction = current_wind_direction;
        } else {
            this.jbb_avg_wind_direction = ((0.99 * this.jbb_avg_wind_direction) + (0.01 * current_wind_direction));
        }

        let averageindicator = this.jbb_avg_wind_direction;

        if(this.map_rotation == 1) {
            current_wind_direction = current_wind_direction - this.vars.hdg.value;
            averageindicator = averageindicator - this.vars.hdg.value;
        }
        
        let current_wind_speed = this.vars.wind_spd.value;
        this.jbb_avg_wind_speed = ((0.99 * this.jbb_avg_wind_speed) + (0.01 * current_wind_speed));

        this.querySelector("#hawk #arrow_avg").style.transform = "rotate(" + averageindicator + "deg)";
        this.querySelector("#hawk #arrow_current").style.transform = "rotate(" + current_wind_direction + "deg)";

        let wv = Math.min(600, current_wind_speed * 10 + 150);
        this.querySelector("#hawk #arrow_current").style.height = wv +"px";
        this.querySelector("#hawk #arrow_current").style.top = -wv/2 +"px";

        let wvavg = Math.min(600, this.jbb_avg_wind_speed * 10 + 150);
        this.querySelector("#hawk #arrow_avg").style.height = wvavg +"px";
        this.querySelector("#hawk #arrow_avg").style.top = -wvavg/2 +"px";
        

        // Vertical wind indication

        if(this.vars.wind_vertical.value < 0) {
            this.querySelector("#hawkbar").classList.add("negative");
        } else {
            this.querySelector("#hawkbar").classList.remove("negative");
        }

        this.querySelector("#hawkbar").style.height =  Math.abs(this.vars.wind_vertical.value * 18) + "px";
    }

    addLiftdot() {
        let position = this.get_position();
        
        let svg_el = document.getElementById("lift_dots");

        let color = this.vars.current_netto.value > 0 ? "#14852c" : "#cc0000";
        let radius = Math.max(3, Math.min(Math.abs(this.vars.current_netto.value) * 6, 15));
        var newdot = this.svg_circle(position, radius, 1, color);
        newdot.setAttribute("fill", color);
    
        this.lift_dots.unshift({
            latlng: position,
            radius: radius,
            el: newdot
        });

        svg_el.prepend(newdot);
    }

    updateLiftdots() {
        let svg_el = document.getElementById("lift_dots");

        for(let i = 0; i < this.lift_dots.length; i++) {
            let dot = this.lift_dots[i];
            let xy = this.LL_to_XY(dot.latlng);
            dot.el.setAttribute("cx", "" + xy.x);
            dot.el.setAttribute("cy", "" + xy.y);
            dot.el.setAttribute("r", dot.radius);
            dot.el.setAttribute("opacity", (40-i)/40);

            if(i > this.lift_dots_max) {
                svg_el.removeChild(dot.el);
                this.lift_dots.length = this.lift_dots_max;
            }
        }
    }

    updateSelectedAirport() {
        let svg_el = document.querySelector("#lift_dots");
        if(svg_el.querySelector("#aptline") != null) {
            svg_el.removeChild(svg_el.querySelector("#aptline"));
        }

        if(this.pagepos_x != 0) { return; }  // don't update APT page, if not visible

        let selApt = this.airportlister.getSelectedAirport();
                
        if(selApt) {        
            this.vars.sel_apt_icao.value = selApt.ident;  
            this.vars.sel_apt_name.value = selApt.name;
            this.vars.sel_apt_alt.value = 0;
            this.vars.sel_apt_bearing.value = Geo.get_bearing_deg(this.PLANE_POSITION, selApt.latlng);
            this.vars.sel_apt_dist.value = Geo.get_distance_m(this.PLANE_POSITION, selApt.latlng) / 1852;
            this.vars.sel_apt_arr_agl.value = 0;
              
            let line = this.svg_line( this.PLANE_POSITION, selApt.latlng, 3,"#ffcc00",0,0); 
            line.setAttribute("id","aptline");
                    
            svg_el.appendChild(line);

            document.querySelector(".airportinfo .runwaylength").innerHTML = this.displayValue(selApt.longestRunwayLength,"ft","alt") + this.units.alt.pref;
            let opposite = selApt.longestRunwayDirection > 180 ? selApt.longestRunwayDirection - 180 : selApt.longestRunwayDirection + 180;
            document.querySelector(".airportinfo .runwayorientation").innerHTML = Math.min(opposite,selApt.longestRunwayDirection).toFixed(0) + "/" + Math.max(opposite,selApt.longestRunwayDirection).toFixed(0);
                
            

            /* arrivalheight - formula as used in waypoint class */
            /* redundant code, but better the reinventing a square wheel */
            
            // Delta is angle between wind and waypoint
            let delta_radians = Geo.DEG_TO_RAD(this.WIND_DIRECTION_DEG -  this.vars.sel_apt_bearing.value - 180);

            // wind_x_mps is wind speed along line to waypoint (+ve is a tailwind)
            let wind_x_ms = Math.cos(delta_radians) * this.WIND_SPEED_MS;

            // wind_y_ms is wind speed perpendicular to line to waypoint (the sign is irrelevant)
            let wind_y_ms = Math.sin(delta_radians) * this.WIND_SPEED_MS;

            // vmg also used for arrival height
            let velocity_made_good_ms;
            if (this.STF_SPEED_0_MS <= Math.abs(wind_y_ms)) {
                velocity_made_good_ms = 1;
            } else {
                velocity_made_good_ms = wind_x_ms + Math.sqrt(Math.pow(this.STF_SPEED_0_MS, 2) - Math.pow(wind_y_ms,
                    2));
            }

            selApt.tailwind_ms = velocity_made_good_ms - this.STF_SPEED_0_MS; // tailwind is +ve

            // *******************************************************************
            // Update wp.arrival_height_msl_m
            // *******************************************************************
            
            let time_to_wp_s;
            let height_needed_m;
            
            time_to_wp_s = (this.vars.sel_apt_dist.value * 1852) / velocity_made_good_ms;
            height_needed_m = time_to_wp_s * Math.abs(this.STF_SINK_0_MS); // Sink is negative
            selApt.arrival_height_msl_m = this.ALTITUDE_M - height_needed_m;

            this.vars.sel_apt_arr_msl.value = selApt.arrival_height_msl_m / 0.3048 ;
            this.vars.sel_apt_ete.value =  time_to_wp_s / 60;
        }
    }

    initKineticAssistant() {
        let instrument = this;
        this.ground_crew_menu = document.getElementById("ground_crew_menu");
		this.ground_crew_winch = document.getElementById("ground_crew_winch");
		this.ground_crew_winch.onclick = function(e) {	instrument.toggleKA(50);	};
		this.ground_crew_push = document.getElementById("ground_crew_push");
		this.ground_crew_push.onclick = function(e) {	instrument.toggleKA(75);	};
		this.ground_crew_tow = document.getElementById("ground_crew_tow");
		this.ground_crew_tow.onclick = function(e) {	instrument.toggleKA(100);	};
        this.KAisInit = true;
    }

    updateKineticAssistant() {
        if(!this.KAisInit) { this.initKineticAssistant(); return; }
        this.ground_crew_winch.style.borderColor = SimVar.GetSimVarValue("A:WATER RUDDER HANDLE POSITION", "percent") == 50 ? "red" : "green";
		this.ground_crew_winch.style.color = SimVar.GetSimVarValue("A:WATER RUDDER HANDLE POSITION", "percent") == 50 ? "red" : "green";
		this.ground_crew_push.style.borderColor = SimVar.GetSimVarValue("A:WATER RUDDER HANDLE POSITION", "percent") == 75 ? "red" : "green";
		this.ground_crew_push.style.color = SimVar.GetSimVarValue("A:WATER RUDDER HANDLE POSITION", "percent") == 75 ? "red" : "green";
		this.ground_crew_tow.style.borderColor = SimVar.GetSimVarValue("A:WATER RUDDER HANDLE POSITION", "percent") == 100 ? "red" : "green";
		this.ground_crew_tow.style.color = SimVar.GetSimVarValue("A:WATER RUDDER HANDLE POSITION", "percent") == 100 ? "red" : "green";
    }

    toggleKA(value) {
		let currValue = SimVar.GetSimVarValue("A:WATER RUDDER HANDLE POSITION", "percent");
		SimVar.SetSimVarValue("A:WATER RUDDER HANDLE POSITION", "percent", currValue == value ? 0 : value);
		SimVar.SetSimVarValue("Z:MIC_POSITION", "", 0);
	}


// ***********************************************************************
    // ********** Sim time - stops on pause when airborn        **************
    // **  Writes   this.SIM_TIME_S       --  absolute time (s) that pauses
    // ***********************************************************************

    init_sim_time() {
        this.SIM_TIME_S = this.TIME_S;
        this.SIM_TIME_PAUSED = false;
        this.SIM_TIME_NEGATIVE = false;
        this.SIM_TIME_SLEWED = false;
        this.SIM_TIME_ENGINE = false;
        this.SIM_TIME_ALERT = false;
        this.SIM_TIME_LOCAL_OFFSET = this.TIME_S - this.LOCAL_TIME_S; // So local time is SIM_TIME - SIM_TIME_LOCAL_OFFSET
        this.sim_time_delay_s = 0;
        this.sim_time_prev_time_s = this.TIME_S;
        this.sim_time_prev_update_s = (new Date())/1000;
    }

    update_sim_time() {
        this.ex="K1";
        if (this.SIM_TIME_S==null) {
            this.init_sim_time();
            return;
        }

        let update_s = (new Date())/1000;

        this.ex="K2";
        // Detect SLEWED, TIME_NEGATIVE
        if (this.task_active() &&
            this.task_started() &&
            ! this.task_finished()) {
            this.ex="K21";
            if (this.SLEW_MODE) {
                this.SIM_TIME_SLEWED = true;
            }
            // Detect time adjust backwards
            this.ex="K22";
            if (this.TIME_S < this.sim_time_prev_time_s) {
                this.SIM_TIME_NEGATIVE = true;
            }
            this.ex="K23";
            if (this.ENGINE_RUNNING) {
                this.SIM_TIME_ENGINE = true;
            }
            this.ex="K24";
            let delay_s = update_s - this.sim_time_prev_update_s;
            if (delay_s > 5) { // Paused for more than 5 seconds
                this.ex="K241";
                this.SIM_TIME_PAUSED = true;
                this.sim_time_delay_s += delay_s;
            }
        }

        this.ex="K4";
        this.sim_time_prev_time_s = this.TIME_S;
        this.SIM_TIME_S = this.TIME_S - this.sim_time_delay_s;
        this.sim_time_prev_update_s = update_s;
        this.ex="K9";
    }




   // ***********************************************************************
    // ********** MSFS Map Initialization from B21 ****************
    // **********************************************************************

    // load_map called from Update(), only executes once
    load_map() {
        // Map will be initialised on the 10th update cycle from aircraft load
        if (this.load_map_called == null || this.load_map_called < 10) {
            this.load_map_called = this.load_map_called == null ? 1 : this.load_map_called + 1;
            if (this.load_map_called == 10) { // this is experimental code to delay the
                // Map elements
                this.map_el = document.getElementById("Map");
                this.map_instrument = document.getElementById("MapInstrument"); // Asobo map
                if (this.map_instrument) {
                    this.ex=444; TemplateElement.call(this.map_instrument, this.onMapInstrumentLoaded.bind(this));
                } else {
                    console.log("map_instrument load error");
                }
            }
        }
    }

    onMapInstrumentLoaded() {
        this.ex=445;
        this.map_instrument.init(this);

        this.set_zoom(7);

        this.ex=447;
        this.map_instrument_loaded = true;
    }

    init_map() {
        if (this.init_map_completed==null) {

            this.init_map_completed=true;
        }
    }

    // Update contents of the Map div, i.e. the MapInstrument, bing-map and Task overlay
    // Called from Update() only if this.map_instrument_loaded is true.
    update_map() {
        this.init_map();

        this.update_map_center();

        this.ex=41;this.map_instrument.update(this.deltaTime);
        this.ex=42;
        // Before draw_task(), we need to check SvgMap (navMap) is ready after startup
        if (this.task_active() && this.map_instrument.navMap.centerCoordinates != null ) {
            this.draw_task();
         }
    }

    set_center(LL) {
        this.map_instrument.setCenter(LL);
    }

    set_map_rotation(rotation) {
        switch (rotation) {
            case EMapRotationMode.NorthUp:
                try {
                    this.map_rotation = EMapRotationMode.NorthUp;
                    this.map_instrument.setRotationMode(this.map_rotation);
                } catch (e) {
                    console.log("setRotationMode NorthUp error",e);
                }
                break;

            case EMapRotationMode.TrackUp:
                try {
                    this.map_rotation = EMapRotationMode.TrackUp;
                    this.map_instrument.setRotationMode(this.map_rotation);
                } catch (e) {
                    console.log("setRotationMode TrackUp error",e);
                }
                break;

            default:
                this.ex = "MapRot";
                throw "Map Rotation Error";
        }

        // this.change_map_center();
    }

    // Convert distance in meters to on-screen pixel distance
    meters_to_px(m) {
        return this.map_instrument.navMap.NMToPixels(m / 1852);
    }

    // Convert LatLong object to {"x":.. , "y":..} pixels
    LL_to_XY(LL) {
        let p;
        // The navMap may not be ready yet after load, if so return temp value 0,0
        try {
            p = this.map_instrument.navMap.coordinatesToXY(LL);
        } catch (e) {
            return { x: 0, y: 0};
        }
        return p;
    }

    follow_plane() {
        this.map_instrument.eBingMode = EBingMode.PLANE;
        this.map_instrument.centerOnPlane();
    }

    zoom_in() {
        this.map_instrument.zoomIn();
    }

    // Zoom map out (i.e. zoom index += 1)
    zoom_out() {
        this.map_instrument.zoomOut();
    }

    // Set current zoom index
    set_zoom(i) {
        this.map_instrument.setZoom(i);
    }

    // Return current zoom index
    get_zoom() {
        return this.map_instrument.getZoom();
    }

    update_map_center() {
       
    }

    draw_task() {
        this.ex="ut.1";
        let newSVG = document.createElementNS('http://www.w3.org/2000/svg','svg');
        newSVG.setAttribute("width","1000"); // note MapInstrument is hard-coded to 1000x1000px
        newSVG.setAttribute("height","1000");
        newSVG.setAttribute("id","lx_9050_task");

        this.ex="ut.3";

        for (let wp_index = 0; wp_index < this.task_length(); wp_index++) {
            this.ex="ut.4."+wp_index;

            this.ex="ut.4.1."+wp_index;
            // Draw line p1 -> p2 (solid for current leg, dashed for other legs)
            this.add_task_line(newSVG, wp_index);

            if (wp_index == this.task.start_index && this.task_index() <= this.task.start_index) {
                this.ex="ut.4.2."+wp_index;
                // Draw start line at this WP
                this.add_start_line(newSVG, wp_index);
            } else if (wp_index == this.task.finish_index) {
                this.ex="ut.4.3."+wp_index;
                this.add_finish_line(newSVG, wp_index);
            } else if (wp_index > this.task.start_index && wp_index < this.task.finish_index) {
                // Draw WP radius
                this.ex="ut.4.4."+wp_index;
                this.add_wp_radius(newSVG, wp_index);
            }

        }
        this.ex="ut.7";
        this.draw_range_circles(newSVG);

        this.ex="ut.8";
        this.map_overlay_el.removeChild(this.task_svg_el);
        this.task_svg_el = newSVG;
        this.map_overlay_el.appendChild(this.task_svg_el);
        this.ex="ut.9";
    }

    // Draw distance circles around next WP (between plane position and WP)
    draw_range_circles(svg_parent) {
        if (!this.task_active()) {
            return;
        }

        let wp_LL = this.current_wp().position;

        // Draw 5 range circles around current wp
        for (let i=0; i<5; i++) {
                let circle_distance_m = (i+1) * 10000; // 10 km range circles
                if (circle_distance_m > this.current_wp().distance_m) {
                    break;
                }
                let circle = this.svg_circle(wp_LL, (i+1) * 10000, 5, this.RANGE_COLOR) ;//, 30, 0) ;//this.RANGE_WIDTH, this.RANGE_COLOR, this.RANGE_DASH_SIZE, 0);
                svg_parent.appendChild(circle);
                /* circle = this.svg_circle(wp_LL, (i+1) * 10000, this.RANGE_WIDTH, this.RANGE_COLOR_ALT, this.RANGE_DASH_SIZE, this.RANGE_DASH_SIZE);
                svg_parent.appendChild(circle); */
        }
    }

    svg_circle(LL, radius_m, width, color) { //, dash_size=0, dash_offset=0) {
        let p1 = this.LL_to_XY(LL);
        // Draw circle around p1
        let circle = document.createElementNS('http://www.w3.org/2000/svg','circle');
        circle.setAttribute('cx',p1.x);
        circle.setAttribute('cy',p1.y);
        let r = this.meters_to_px(radius_m);
        circle.setAttribute('r',Math.max(2,r).toFixed(0)); // make min radius 2px
        circle.setAttribute("stroke", color);
        circle.setAttribute("stroke-width", width);
        circle.setAttribute("fill", "none");

        return circle;

        // stroke-dasharray does not seem to be implemented
        // if (dash_size != 0) {
        //    circle.setAttribute("stroke-dasharray", dash_size+" "+dash_size);
        //    if (dash_offset > 0) {
        //        circle.setAttribute("stroke-dashoffset",dash_offset);
        //    }
        // }
        // return circle;
    }

    svg_arc(LL1, LL2, width, color) {
        let p1 = this.LL_to_XY(LL1);
        let p2 = this.LL_to_XY(LL2);
        let arc =  document.createElementNS('http://www.w3.org/2000/svg','path');

        let d_str = "M "+p1.x.toFixed(0)+" "+p1.y.toFixed(0); // Move to p1
        d_str += " A 1 1 0 0 0 "+p2.x.toFixed(0)+" "+p2.y.toFixed(0); // Draw arc p1..p2

        arc.setAttribute('d',d_str);

        arc.setAttribute("stroke", color);
        arc.setAttribute("stroke-width", width);
        arc.setAttribute("fill", "none");

        return arc;
    }

    add_task_line(svg_el, wp_index) {
        // Cannot add a task line for the first waypoint in the task
        if (wp_index==0) { //B21_SOARING_ENGINE.task_length()-1) {
            return;
        }

        // Don't add a task line before the start
        if (this.task.start_index != null && wp_index <= this.task.start_index) {
            return;
        }

        // Don't add task line after the finish line
        if(this.task.finish_index != null && wp_index > this.task.finish_index) {
            return;
        }

        let wp = this.task.waypoints[wp_index];

        // Check if we want to HIGHLIGHT this task line,
        // i.e. the line to the current waypoint (will choose color) or current WP is start and this is NEXT leg
        const current_task_line = wp_index == this.task_index() ||
                                (wp_index - 1 == this.task_index() && this.task.start_index == this.task_index()) ;

        const line_color = current_task_line ? this.TASK_LINE_CURRENT_COLOR : this.TASK_LINE_COLOR;

        const initial_offset = current_task_line ? (this.TIME_S % 4) / 2 * this.TASK_LINE_DASH_SIZE : 0;

        const line = this.svg_line( wp["position"],
                                    this.task.waypoints[wp_index-1]["position"],
                                    this.TASK_LINE_WIDTH,
                                    line_color,
                                    this.TASK_LINE_DASH_SIZE,
                                    initial_offset); // dash_offset
        svg_el.appendChild(line);

        const alt_color = current_task_line ? this.TASK_LINE_CURRENT_COLOR_ALT : this.TASK_LINE_COLOR_ALT;

        let alt_line = this.svg_line(   wp["position"],
                                        this.task.waypoints[wp_index-1]["position"],
                                        this.TASK_LINE_WIDTH,
                                        alt_color,
                                        this.TASK_LINE_DASH_SIZE,
                                        initial_offset + this.TASK_LINE_DASH_SIZE); // dash_offset
        svg_el.appendChild(alt_line);
    }

    add_wp_radius(svg_el, wp_index) {
        //console.log("add_wp_radius",wp_index);
        let wp = this.task.waypoints[wp_index];
        let wp_LL = wp.position;
        let radius_m = wp.radius_m;

        let circle = this.svg_circle(wp_LL, radius_m, 5, this.TASK_LINE_COLOR);
        svg_el.appendChild(circle);
    }

    // Draw a line perpendicular to the leg to the NEXT waypoint
    add_start_line(svg_el, wp_index) {
        //console.log("add_start_line()");
        // Cannot draw a start line on last waypoint
        if (wp_index >= this.task_length() - 1) {
            return;
        }

        let wp = this.task.waypoints[wp_index];

        const line_color = wp_index==this.task_index() ? this.TASK_LINE_CURRENT_COLOR : this.TASK_LINE_COLOR;
        const line_color_alt = wp_index==this.task_index() ? this.TASK_LINE_CURRENT_COLOR_ALT : this.TASK_LINE_COLOR_ALT;

        //this.debug_log("add_start_line "+wp_index+" "+wp["leg_start_p1"].lat);
        const line = this.svg_line( wp["leg_start_p1"],
                                    wp["leg_start_p2"],
                                    this.TASK_LINE_WIDTH,
                                    line_color,
                                    this.TASK_LINE_DASH_SIZE,
                                    0); // dash_offset
        svg_el.appendChild(line);

        let alt_line = this.svg_line(   wp["leg_start_p1"],
                                        wp["leg_start_p2"],
                                        this.TASK_LINE_WIDTH,
                                        line_color_alt,
                                        this.TASK_LINE_DASH_SIZE,
                                        this.TASK_LINE_DASH_SIZE); // dash_offset
        svg_el.appendChild(alt_line);

        let arc_el = this.svg_arc(  wp["leg_start_p1"],
                                    wp["leg_start_p2"],
                                    this.TASK_LINE_WIDTH,
                                    this.TASK_LINE_COLOR);

        svg_el.appendChild(arc_el);
    }

    // Draw a line perpendicular to the leg from the PREVIOUS waypoint
    add_finish_line(svg_el, wp_index) {
        // Cannot draw a finish line on the first waypoint
        if (wp_index==0) {
            return;
        }

        let wp = this.task.waypoints[wp_index];

        const line_color = wp_index==this.task_index() ? this.TASK_LINE_CURRENT_COLOR : this.TASK_LINE_COLOR;
        const line_color_alt = wp_index==this.task_index() ? this.TASK_LINE_CURRENT_COLOR_ALT : this.TASK_LINE_COLOR_ALT;

        //this.debug_log("add_start_line "+wp_index+" "+B21_SOARING_ENGINE.task.waypoints[wp_index]["leg_start_p1"].lat);
        const line = this.svg_line( wp["leg_finish_p1"],
                                    wp["leg_finish_p2"],
                                    this.TASK_LINE_WIDTH,
                                    line_color,
                                    this.TASK_LINE_DASH_SIZE,
                                    0); // dash_offset
        svg_el.appendChild(line);

        let alt_line = this.svg_line(   wp["leg_finish_p1"],
                                        wp["leg_finish_p2"],
                                        this.TASK_LINE_WIDTH,
                                        line_color_alt,
                                        this.TASK_LINE_DASH_SIZE,
                                        this.TASK_LINE_DASH_SIZE); // dash_offset
        svg_el.appendChild(alt_line);

        let arc_el = this.svg_arc(  wp["leg_finish_p2"],
                                    wp["leg_finish_p1"],
                                    this.TASK_LINE_WIDTH,
                                    this.TASK_LINE_COLOR);

        svg_el.appendChild(arc_el);
    }

    svg_line(LL1, LL2, width, color, dash_size=0, dash_offset=0) {
        let p1 = this.LL_to_XY(LL1);
        let p2 = this.LL_to_XY(LL2);
        this.ex="ut.6";
        let line = document.createElementNS('http://www.w3.org/2000/svg','line');
        line.setAttribute('x1',p1.x);
        line.setAttribute('y1',p1.y);
        line.setAttribute('x2',p2.x);
        line.setAttribute('y2',p2.y);
        line.setAttribute("stroke", color)
        line.setAttribute("stroke-width", width);
        if (dash_size != 0) {
            line.setAttribute("stroke-dasharray", dash_size+" "+dash_size);
            if (dash_offset > 0) {
                line.setAttribute("stroke-dashoffset",dash_offset);
            }
        }

        return line;
    }





    update_task_page() {
        if(!this.taskpage_buildt) { this.build_taskpage(); }
        if(!this.task.finished) {
            document.querySelector(".task-state .task-timer").innerHTML = this.displayValue(this.task.task_time_s(),"s","time_of_day");
        } else {
            let completion_time = this.task.finish_time_s - this.task.start_time_s
            document.querySelector(".task-state .timer .number").innerHTML = this.displayValue(completion_time,"s","time_of_day");
            document.querySelector(".task-state .taskaverage .number").innerHTML = this.displayValue(this.task.finish_speed_ms,"ms","speed");
            document.querySelector(".task-state .taskaverage .unit").innerHTML = this.units.speed.pref;
        }

        document.querySelector(".task-state .distance .number").innerHTML = this.displayValue(this.task.distance_m(),"m","dist");
        document.querySelector(".task-state .distance .unit").innerHTML = this.units.dist.pref;
        document.querySelector(".task-state .arrivalheight .number").innerHTML = this.displayValue(this.task.finish_wp().arrival_height_msl_m,"m","alt");
        document.querySelector(".task-state .arrivalheight .unit").innerHTML = this.units.alt.pref;

        if(this.task_started()) {
            document.getElementById("tasklist").setAttribute("class","task_running hasScrollbars");
        } 
        
        if (this.task.finished) {
            document.getElementById("tasklist").setAttribute("class","task_finished hasScrollbars");
        }

        for (let wp_index=0; wp_index<this.task_length(); wp_index++) {
            let wp_el = document.getElementById("wp_" + wp_index);
            let wp = this.task.waypoints[wp_index];

            if (wp_index == this.task_index()) {
                wp_el.classList.add("iscurrentwp")
            } else {
                wp_el.classList.remove("iscurrentwp")
            }

            if (wp.leg_is_completed) {
                wp_el.classList.add("wp-ok");
                document.getElementById("tasklist").appendChild(wp_el);
            }
        
            wp_el.querySelector(".wp-name").innerHTML = wp.name + " (" + this.displayValue(wp.alt_m, "m", "alt") + this.units.alt.pref + ")"; 
            wp_el.querySelector(".bearing .number").innerHTML = wp.leg_bearing_deg.toFixed(0);
            wp_el.querySelector(".distance .number").innerHTML = this.displayValue(wp.leg_distance_m, "m", "dist");
            wp_el.querySelector(".distance .unit").innerHTML = this.units.dist.pref;
            wp_el.querySelector(".ete .number").innerHTML = (wp.ete / 60).toFixed(0);
            wp_el.querySelector(".ete .unit").innerHTML = "min";
            wp_el.querySelector(".wind .number").innerHTML = this.displayValue(wp.tailwind_ms, "ms", "windspeed");
            wp_el.querySelector(".wind .unit").innerHTML = this.units.windspeed.pref;
            wp_el.querySelector(".arrivalheight .number").innerHTML = this.displayValue(wp.arrival_height_msl_m, "m", "alt");
            wp_el.querySelector(".arrivalheight .unit").innerHTML = this.units.alt.pref;


            if(wp.radius_m != null || wp.min_alt_m != null || wp.max_alt_m != null) {
                wp_el.querySelector(".wp-min").innerHTML = wp.min_alt_m != null ? "Min: " + this.displayValue(wp.min_alt_m, "m", "alt") +  this.units.alt.pref : "";
                wp_el.querySelector(".wp-max").innerHTML = wp.min_alt_m != null ? "Max: " + this.displayValue(wp.max_alt_m, "m", "alt") +  this.units.alt.pref : "";
                wp_el.querySelector(".wp-radius").innerHTML = wp.radius_m != null ? "Radius: " + this.displayValue(wp.radius_m, "m", "alt") +  this.units.alt.pref : "";
            } else {
                wp_el.querySelector(".wp-minmax").innerHTML = "";
            }
        }       
    }

    build_taskpage() {
        let template = document.getElementById("wp-template");
        let templateContent = template.innerHTML;

        for (let wp_index=0; wp_index<this.task_length(); wp_index++) {
            let wp_el = template.cloneNode();
            wp_el.innerHTML = templateContent;
            wp_el.setAttribute("id","wp_" + wp_index);

            document.getElementById("tasklist").appendChild(wp_el);
        }

        this.taskpage_buildt = true;
    }

    popalert(headline,text,dur,col) {
        let d = dur != null ? dur : 5;
        let c = col != null ? col : "#ff0000";
        let pop = document.getElementById("alert");
        pop.querySelector("h2").innerHTML = headline;
        pop.querySelector("p").innerHTML = text;
        pop.style.backgroundColor = c;

        pop.style.display = "block";
        window.setTimeout(function() { pop.style.display = "none"; }, d * 1000);
        
    }




/************************************************************************/
/*   From B21 Soaring Engine                                            */
/************************************************************************/

    // Test function to confirm task is loaded
    task_active() {
        return (this.task != null && this.task.active);
    }

    // Return number of waypoints in current Task
    task_length() {
        if (this.task == null) {
            return 0;
        }
        return this.task.waypoints.length;
    }

    task_index() {
        if (this.task == null) {
            return 0;
        }
        return this.task.index;
    }

    task_started() {
        return this.task.started;
    }

    task_finished() {
        return this.task.finished;
    }

    task_time_s() {
        return this.task.task_time_s();
    }

    // Return WP object of CURRENT waypoint
    current_wp() {
        if (this.task != null) {
            return this.task.current_wp();
        } else {
            console.log("b21_soaring_engine current_wp() null task");
        }
        return null;
    }

    // Return WP object of NEXT waypoint
    next_wp() {
        if (this.task != null) {
            return this.task.next_wp();
        } else {
            console.log("b21_soaring_engine next_wp() null task");
        }
        return null;
    }

    // Return task finish speed m/s
    finish_speed_ms() {
        if (this.task == null) {
            return null;
        } else {
            return this.task.finish_speed_ms;
        }
    }

    // Return start local time
    start_local_time_s() {
        if (this.task == null) {
            return null;
        } else {
            return this.task.start_local_time_s;
        }
    }

    // Return task start height
    start_alt_m() {
        if (this.task == null) {
            return null;
        } else {
            return this.task.start_alt_m;
        }
    }


// ***********************************************************************
    // ********** Load task from flightplan       ****************************
    // ***********************************************************************

    init_task_load() {
        if (this.init_task_complete == null) {

            // Create the Task() object
            this.task = new Task(this);

            this.task_electricity = null;
            this.task_load_count = 0;

            this.init_task_complete = true;
        }
    }

    update_task_load() {
        this.init_task_load(); // Called once on startup

        if (this.task_electricity == null && this.ELECTRICAL_MASTER_BATTERY) {
            this.task_electricity = true;
            this.load_task();
            return;
        }

        if (!this.ELECTRICAL_MASTER_BATTERY) {
            this.task_electricity = null;
            return;
        }

        // Retry loading task after timeout
        const TIMEOUT = 10;
        if (this.ELECTRICAL_MASTER_BATTERY &&
            !this.task_active() &&
            this.task_load_time_s != null && this.TIME_S - this.task_load_time_s > TIMEOUT) {
            this.load_task();
        }
    }

    load_task() {
        // console.log('b21_soaring_engine.load_task() ' + (++this.task_load_count));
        this.task_load_time_s = this.TIME_S;
        this.task.load();
    }

    get_position() {
        return new LatLong(SimVar.GetSimVarValue("A:PLANE LATITUDE", "degrees latitude"),
            SimVar.GetSimVarValue("A:PLANE LONGITUDE", "degrees longitude"));
    }

    task_active() {
        return (this.task != null && this.task.active);
    }




// ***********************************************************************
    // ********** Auto-switch waypoints      *********************************
    // ***********************************************************************

    // We will switch to next waypoint if the distance to the current waypoint has
    // just changed from >wp.radius_m to <=wp.radius_m

    init_task_wp_switch() {

        this.task_start_before_prev = null; // used in update_task_auto_start

        this.wp_switch_prev_index = null;  // used in update_task_auto_wp
        this.wp_switch_inside_prev = true; // Assume already within TP radius so no auto-switch if so.

        this.task_after_finish_prev = null;

        this.init_task_wp_switch_completed = true; // run once;
    }

    update_task_wp_switch() {
        this.ex=91;
        // Run init once
        if (this.init_task_wp_switch_completed==null) {
            this.init_task_wp_switch();
        }

        // Do nothing if no task
        if (!this.task_active()) {
            return;
        }

        this.ex=92;
        // Test START
        let switched = this.update_task_auto_start();

        // Test switch on INTERMEDIATE WP
        if (!switched) {
            this.ex=94;
            switched = this.update_task_auto_wp();
        }

        // Test FINISH
        if (!switched) {
            this.ex=95;
            this.update_task_auto_finish();
        }
    }

    // Check for a start and if so handle it and return true
    update_task_auto_start() {
        // Calculate if we should trigger auto-start
        if ( this.task_active() &&                      // We must have a task loaded
             this.task.index==this.task.start_index &&  // and current WP is start WP
             this.task.index < this.task.count() - 1) { // and we have at least one more WP's in task.
            this.ex=931;
            let wp = this.task.current_wp();
            let next_wp = this.task.waypoints[this.task.index+1];
            let before_start_line = Geo.in_sector(next_wp.leg_bearing_deg, wp.bearing_deg, 180); // 180 is size of 'sector' degrees
            // Also check within length of start line.
            this.ex="933.";
            if (this.task_start_before_prev==null) {
                this.ex=934;
                this.task_start_before_prev = before_start_line;
            } else {
                this.ex=935;
                // See if we have just transitioned from being 'before start' to not, i.e. we've just crossed the start line
                if (this.task_start_before_prev && !before_start_line && wp.distance_m < wp.radius_m) {
                    this.ex=936;
                    // Check min/max altitudes
                    if (wp.min_alt_m != null && this.ALTITUDE_M < wp.min_alt_m) {
                        this.ex=9361;
                        this.call_callbacks("TASK_START_TOO_LOW", { "wp": wp });
                    } else if (wp.max_alt_m != null && this.ALTITUDE_M > wp.max_alt_m) {
                        this.ex=9362;
                        this.call_callbacks("TASK_START_TOO_HIGH", { "wp": wp });
                    } else {
                        this.ex=9363;
                        this.task.start(); // Tell task to start

                        let start_arg = {   "wp": wp,
                                            "start_local_time_s": this.vars.localtime.value,
                                            "start_alt_m": this.vars.alt.value
                        };

                        this.call_callbacks("TASK_START", start_arg);

                        this.ex=937;
                        this.change_wp(1); // Change to next waypoint (& will call TASK_CHANGE_WP callbacks)
                    }
                }
                this.task_start_before_prev = before_start_line;
            }
            this.ex=938;
            return true;
        }
        this.ex=939;
        return false;
    }

    // Auto-switch intermediate waypoints as we fly around the task
    update_task_auto_wp() {
        this.ex=81;
        // Disable if there is no task / current waypoint or if current waypoint is START
        if (!this.task_active() ||
            this.task.current_wp() == null ||
            this.task.index==this.task.start_index ||
            this.task.index==this.task.finish_index) {
            return false;
        }

        this.ex=82;
        // We need to detect when pilot manually changes waypoint
        if (this.wp_switch_prev_index == null) {
            this.wp_switch_prev_index = -1; // Treat start-up as new waypoint
            this.wp_switch_inside_prev = true; // Assume already within TP radius so no auto-switch if so.
        }

        const current_wp_index = this.task.index;
        const wp = this.task.current_wp();
        const current_wp_distance_m = wp.distance_m;

        this.ex=83;
        // Check if USER has changed waypoint
        if (current_wp_index != this.wp_switch_prev_index) {
            this.ex=831;
            this.wp_switch_prev_index = current_wp_index;
            this.wp_switch_inside_prev = true; // Treat as if already inside Wp so no switch
            return false;
        }

        this.ex=84;
        // If we're outside wp.radius_m, OR on the last waypoint do not auto-switch

        let inside = current_wp_distance_m < wp.radius_m &&
                        (wp.min_alt_m == null || this.ALTITUDE_M > wp.min_alt_m) &&
                        (wp.max_alt_m == null || this.ALTITUDE_M < wp.max_alt_m);

        if (!inside || this.task.on_last_waypoint() ) {
            this.wp_switch_inside_prev = false;
            return false;
        }

        // Here we must be INSIDE the WP radius (otherwise would have returned above).

        this.ex=87;
        // Check if PREVIOUSLY we were OUTSIDE the WP radius, if so AUTO-SWITCH to next WP.
        if (inside && !this.wp_switch_inside_prev) {
            this.wp_switch_inside_prev = true; //
            // Check that all prior waypoints from start have been completed
            if (this.task.completed_to(current_wp_index - 1)) {
                // Flag current leg as completed
                this.task.current_wp().leg_completed();
                this.call_callbacks("TASK_WP_COMPLETED", { "wp": this.task.current_wp() });
                this.change_wp(1);
            } else {
                // WP completed out-of-order so no auto-switch
                this.call_callbacks("TASK_WP_NOT_COMPLETED", { "wp": this.task.current_wp() });
            }
        }

        // Reset prior values
        this.wp_switch_prev_index = this.task.index;

        this.ex=89;
        return true;
    }

    // Handle task FINISH
    update_task_auto_finish() {
        // Calculate if we should trigger auto-finish
        // Don't flag a finish if no current task
        if ( !this.task_active() ) {
            return;
        }
        // Don't flag a finish if on first waypoint or start waypoint
        if (this.task.index==0 || this.task.index==this.task.start_index) {
            return;
        }
        // Don't flag a finish if current waypoint is not the finish waypoint
        if (this.task.index != this.task.finish_index) {
            return;
        }
        // Don't flag a finish if any prior waypoints are not completed
        for (let i=this.task.start_index; i<this.task.finish_index; i++) {
            if (!this.task.waypoints[i].leg_is_completed) {
                return;
            }
        }
        this.ex=951;
        let wp = this.task.current_wp();
        this.ex=952;
        let after_finish_line = !Geo.in_sector(wp.leg_bearing_deg, wp.bearing_deg, 180); // 180 is size of 'sector' degrees
        if (this.task_after_finish_prev==null) {
            this.ex=953;
            this.task_after_finish_prev = after_finish_line;
        } else {
            // See if we have just transitioned to 'after finish' , i.e. we've just crossed the start line
            if (!this.task_after_finish_prev && after_finish_line && this.task.started && !this.task.finished && wp.distance_m < wp.radius_m) {
                this.ex=954;
                // Check min/max altitudes
                if (wp.min_alt_m != null && this.ALTITUDE_M < wp.min_alt_m) {
                    this.ex=955;
                    this.call_callbacks("TASK_FINISH_TOO_LOW", { "wp": wp });
                } else if (wp.max_alt_m != null && this.ALTITUDE_M > wp.max_alt_m) {
                    this.ex=956;
                    this.call_callbacks("TASK_FINISH_TOO_HIGH", { "wp": wp });
                } else {
                    this.ex=957;
                    this.task.finish(); // Tell task to finish

                    this.ex=958;
                    let callback_args = { "wp": wp,
                                          "finish_speed_ms": this.task.finish_speed_ms,
                                          "completion_time_s": this.task.finish_time_s - this.task.start_time_s
                    };

                    this.ex=959;
                    this.call_callbacks("TASK_FINISH", callback_args );
                }
            }
            this.task_after_finish_prev = after_finish_line;
        }
    }


    call_callbacks(event_name, args) {
        /*
        for (let i = 0; i < this.event_callbacks.length; i++) {
            let caller = this.event_callbacks[i].caller;
            // We use the JS 'apply' method so we can set 'caller' as the context
            this.event_callbacks[i].fun.apply(caller, [event_name, arg]);
        }
        */
        let WP = args["wp"];

        switch (event_name) {
            case "TASK_WP_CHANGE":
                // this.update_task_page(); // { wp }
                break;

            case "TASK_WP_COMPLETED":
                this.message_task_wp_completed(WP); // { wp }
                break;

            case "TASK_WP_NOT_COMPLETED":
                this.message_task_wp_not_completed(WP); // { wp }
                break;

            case "TASK_START":
                this.message_task_start(WP, args["start_local_time_s"], args["start_alt_m"]); // { wp, start_local_time_s, start_alt_m }
                break;

            case "TASK_START_TOO_LOW":
                this.message_task_start_too_low(WP); // { wp }
                break;

            case "TASK_START_TOO_HIGH":
                this.message_task_start_too_high(WP); // { wp }
                break;

            case "TASK_FINISH":
                this.message_task_finish(WP, args["finish_speed_ms"], args["completion_time_s"]); // { wp }
                break;

            case "TASK_FINISH_TOO_LOW":
                this.message_task_finish_too_low(WP); // { wp }
                break;

            case "TASK_FINISH_TOO_HIGH":
                this.message_task_finish_too_high(WP); // { wp }
                break;

            default:
                console.log("lx9050 engine event unrecognized "+event_name, args);

        }
       // console.log(event_name);
    }

    change_wp(delta) {
        if (!this.task_active()) {
            return;
        }
        if (delta > 0) {
            this.task.next_waypoint();
        } else {
            this.task.prev_waypoint();
        }
        // console.log("b21_soaring_engine change_wp", delta);
        this.call_callbacks("TASK_WP_CHANGE", { "wp": this.current_wp() });
    }

    // ***********************************************************************************
    // *************** B21 Popup Messages                          *******************
    // ***********************************************************************************
    //  this.message_task_wp_completed(WP);
    //  this.message_task_wp_not_completed(WP);
    //  this.message_task_start(WP, start_local_time_s, start_alt_m);
    //  this.message_task_start_too_low(WP);
    //  this.message_task_start_too_high(WP);
    //  this.message_task_finish(WP, finish_speed_ms, completion_time_s);
    //  this.message_task_finish_too_low(WP);
    //  this.message_task_finish_too_high(WP);

    // Start the task
    message_task_start(wp, start_local_time_s, start_alt_m) {
        // Display "TASK START" message
        let hl = "TASK STARTED ";
        let t = this.displayValue(parseInt(start_local_time_s),"s","time_of_day")+"<br/>";
        t += wp.name+"<br/>";
        t += this.displayValue(start_alt_m,"m","alt") + this.units.alt.pref;
        // this.task_message(msg_str, 5); // Display start message for 5 seconds
        this.popalert(hl,t,5,"#26783c");
    }

    message_task_start_too_low(wp) {
        // Display started too low message
        let hl = "BAD START";
        let msg_str = "<br/>" + this.displayValue(this.vars.alt.value,"feet","alt") + this.units.alt.pref;
        msg_str += "<br/>&gt;&gt;&nbsp;TOO LOW&nbsp;&lt;&lt;";
        msg_str += "<br/>MIN HEIGHT: " + this.displayValue(wp.min_alt_m,"m","alt") + this.units.alt.pref;
        // this.task_message(msg_str, 6, true); // Display start message for 5 seconds
        this.popalert(hl,msg_str,5,"#ff0000");
    }

    message_task_start_too_high(wp) {
        // Display started too low message
        let hl = "BAD START";
        let msg_str = "<br/>" + this.displayValue(this.vars.alt.value,"feet","alt") + this.units.alt.pref;
        msg_str += "<br/>&gt;&gt;&nbsp;TOO HIGH&nbsp;&lt;&lt;";
        msg_str += "<br/>MAX HEIGHT: " + this.displayValue(wp.max_alt_m,"m","alt") + this.units.alt.pref;
        // this.task_message(msg_str, 6, true); // Display start message for 5 seconds
        this.popalert(hl,msg_str,5,"#ff0000");
    }

    message_task_wp_completed(wp) {
        // this.task_message(wp.name+" OK",2);
        this.popalert(wp.name+" OK","",3,"#26783c");
    }

    message_task_wp_not_completed(wp) {
        // this.task_message(wp.name+"<br/>NOT TASK",3,true);
        this.popalert(wp.name+" NOT TASK","",3,"#ff0000");
    }

    message_task_finish(wp, finish_speed_ms, completion_time_s) {
        // Display "TASK COMPLETED" message
        let hl = "TASK COMPLETED ";
        let msg_str = this.displayValue(finish_speed_ms,"ms","speed")  + this.units.speed.pref; + "<br/>";
        msg_str += this.displayValue(this.vars.localtime.value,"s","time_of_day")+"<br/>";
        msg_str += wp.name+"<br/>";
        msg_str += "SEE TASK PAGE.";
        // this.task_message(msg_str, 10); // Display start message for 3 seconds
        this.popalert(hl,msg_str,5,"#26783c");
    }

    message_task_finish_too_low(wp) {
        // Display finished too low message
        let hl = "BAD FINISH";
        let msg_str = this.displayValue(this.vars.alt.value,"feet","alt") + this.units.alt.pref;
        msg_str += "<br/>&gt;&gt;&nbsp;TOO LOW&nbsp;&lt;&lt;";
        msg_str += "<br/>MIN HEIGHT: " + this.displayValue(wp.min_alt_m,"m","alt") + this.units.alt.pref;
        // this.task_message(msg_str, 6, true); // Display start message for 5 seconds
        this.popalert(hl,msg_str,5,"#ff0000");
    }

    message_task_finish_too_high(wp) {
        // Display started too low message
        let hl = "BAD FINISH";
        let msg_str = this.displayValue(this.vars.alt.value,"feet","alt") + this.units.speed.pref;
        msg_str += "<br/>&gt;&gt;&nbsp;TOO HIGH&nbsp;&lt;&lt;";
        msg_str += "<br/>MAX HEIGHT: " + this.displayValue(wp.max_alt_m,"m","alt") + this.units.alt.pref;
        // this.task_message(msg_str, 6, true); // Display start message for 5 seconds
        this.popalert(hl,msg_str,5,"#ff0000");
    }


}



    





// ***********************************************************************************************************************
// ***********************************************************************************************************************
// *********                   Waypoint class WP                                                         *****************
// ***********************************************************************************************************************
// ***********************************************************************************************************************

class WP {
    constructor(task, index, name, latlong, alt_m) {
        this.task = task;

        // Fixed values from flightplan
        this.index = index;
        this.name = name;
        this.position = latlong;
        this.alt_m = alt_m; // Altitude (meters) intended at waypoint
        //DEBUG WP get radius from task
        this.radius_m = 500; // Default WP radius is 500 meters
        this.radius_updated = false; // Will be set to TRUE if flightplan includes radius
        this.min_alt_m = null; // No default min/max alt at waypoints
        this.max_alt_m = null;

        // Values from task
        // Note each 'leg_' value is TO this waypoint
        this.leg_bearing_deg = 0; // Bearing from previous WP to this WP
        this.leg_distance_m = 0; // Distance (meters) from previous WP to this WP
        // this.leg_start_p1        // Will contain the points at each end of the start line at this WP
        // this.leg_start_p2
        // this.leg_finish_p1        // Will contain the points at each end of the finish line at this WP
        // this.leg_finish_p2
        this.leg_is_completed = false; // Will be set to true when we pass through this waypoint.
        this.leg_speed_ms = 0;

        // Updating values relative to user plane
        this.bearing_deg = 0; // User plane to WP Bearing
        this.distance_m = 0; // User plane to WP Distance (meters)
        this.tailwind_ms = 0; // User plane to WP tailwind (ms)
        this.arrival_height_msl_m = 0; // Predicted arrival height at this WP (meters)

        // Updating values related to task
        this.task_distance_m = 0; // Distance (meters) from user plane, around task, to WP
    }

    prefix_name() {
        this.task.instrument.ex = "prefix_name.1." + this.index;
        const start_str = '[St] ';
        const finish_str = '[Fin] ';
        let prefix = this.index == this.task.start_index ? start_str : (this.index == this.task.finish_index ? finish_str : "");
        this.task.instrument.ex = "prefix_name.2." + this.index;
        return prefix + this.name;
    }

    update_bearing(p1) {
        this.bearing_deg = Geo.get_bearing_deg(p1, this.position);
    }

    update_distance(p1) {
        // Update wp.distance_m to this WP
        this.distance_m = Geo.get_distance_m(p1, this.position);
    }

    // Add .leg_distance_m property for distance (meters) from wp to this waypoint
    // Called when task is loaded
    update_leg_distance(prev_wp) {
        this.leg_distance_m = Geo.get_distance_m(this.position, prev_wp.position);
    }

    // Add .bearing property for INBOUND bearing FROM wp TO this waypoint
    // Called when task is loaded
    update_leg_bearing(prev_wp) {
        this.leg_bearing_deg = Geo.get_bearing_deg(prev_wp.position, this.position);
    }

    // Add .leg_start_p1/2 as ends of start line at this waypoint
    update_start_line(next_wp) {
        const p1_bearing = next_wp.leg_bearing_deg - 90;
        this.leg_start_p1 = Geo.distance_and_bearing(this.position, this.radius_m, p1_bearing);
        const p2_bearing = next_wp.leg_bearing_deg + 90;
        this.leg_start_p2 = Geo.distance_and_bearing(this.position, this.radius_m, p2_bearing);
    }

    // Add .leg_finish_p1/2 as ends of finish line at this waypoint
    update_finish_line() {
        const p1_bearing = this.leg_bearing_deg - 90;
        this.leg_finish_p1 = Geo.distance_and_bearing(this.position, this.radius_m, p1_bearing);
        const p2_bearing = this.leg_bearing_deg + 90;
        this.leg_finish_p2 = Geo.distance_and_bearing(this.position, this.radius_m, p2_bearing);
    }

    leg_completed() {
        this.leg_is_completed = true;
        this.leg_completed_time_s = this.task.instrument.SIM_TIME_S;
        if (this.index > this.task.start_index) {
            let prev_wp = this.task.waypoints[this.index - 1];
            this.leg_speed_ms = this.leg_distance_m / (this.leg_completed_time_s - prev_wp.leg_completed_time_s);
        } else {
            this.leg_speed_ms = 0;
        }
    }

    reset_leg_completed() {
        this.leg_is_completed = false;
    }
} // End WP class

// ***********************************************************************************************************************
// ***********************************************************************************************************************
// *********                   Task class                                                                *****************
// ***********************************************************************************************************************
// ***********************************************************************************************************************

class Task {
    constructor(instrument) {
        // console.log('b21_soaring_engine Task() constructor');
        this.instrument = instrument;
        this.init();
        this.registerListener();
    }

    init() {
        // console.log("b21_soaring_engine Task.init()");
        this.waypoints = []; // List of WP objects in order
        this.index = 0; // Current waypoint index (i.e. the one the pilot is flying TO)
        this.start_index = 0; // Index of waypoint deemed to be the TASK START
        this.active = false; // Set to TRUE if a flightplan is loaded
        this.reset_start();
    }

    // FLIGHTPLAN Listener code as in Asobo FlightManager.js
    onCurrentGameFlightLoaded(_callback) {
        if (this._isRegisteredAndLoaded) {
            _callback();
            return;
        }
        this._onCurrentGameFlightLoaded = _callback;
    }

    registerListener() {
        // console.log("b21_soaring_engine.Task.registerListener()");
        if (this._isRegistered) {
            return;
        }
        // console.log("b21_soaring_engine.Task.registerListener() RegisterViewListener");
        RegisterViewListener("JS_LISTENER_FLIGHTPLAN", () => {
            // console.log("b21_soaring_engine.Task.registerListener() RegisterViewListener callback");
            Coherent.call("LOAD_CURRENT_ATC_FLIGHTPLAN");
            this.instrument.requestCall(() => {
                // console.log("b21_soaring_engine.Task.registerListener() requestcall");
                this._isRegistered = true;
                this._isRegisteredAndLoaded = true;
                if (this._onCurrentGameFlightLoaded) {
                    this._onCurrentGameFlightLoaded();
                }
            }, 200);
        });
    }

    update() {
        this.instrument.ex = "Task.1";
        if (!this.active) {
            return;
        }

        let p1 =this.instrument.PLANE_POSITION;

        let task_distance_m = 0; // Accumulate distance for each waypoint task_distance_m

        for (let wp_index = 0; wp_index < this.count(); wp_index++) {
            this.instrument.ex = "Task.2." + wp_index;

            let wp = this.waypoints[wp_index];

            // *******************************************************************
            // Update bearing & distance to current WP
            // *******************************************************************

            wp.update_bearing(p1);

            this.instrument.ex = "Task.3." + wp_index;
            wp.update_distance(p1);

            // *******************************************************************
            // Update task_distance_m to this WP (distance around task)
            // *******************************************************************
            this.instrument.ex = "Task.5." + wp_index;
            if (wp_index == this.index) {
                task_distance_m = wp.distance_m;
            } else {
                task_distance_m = task_distance_m + wp.leg_distance_m;
            }
            wp.task_distance_m = task_distance_m;

            // *******************************************************************
            // Update wp.tailwind_ms to this WP
            // *******************************************************************
            this.instrument.ex = "Task.6." + wp_index;
            let bearing_deg;
            if (wp_index == this.index) {
                bearing_deg = wp.bearing_deg; // For current WP use bearing direct to WP
            } else {
                bearing_deg = wp.leg_bearing_deg; // Other waypoints use leg WP->WP bearing
            }
            // Slightly complicated crosswind calculation - this is NOT the classic on-the-runway calculation

            // Delta is angle between wind and waypoint
            let delta_radians = Geo.DEG_TO_RAD(this.instrument.WIND_DIRECTION_DEG - bearing_deg - 180);

            // wind_x_mps is wind speed along line to waypoint (+ve is a tailwind)
            let wind_x_ms = Math.cos(delta_radians) * this.instrument.WIND_SPEED_MS;

            // wind_y_ms is wind speed perpendicular to line to waypoint (the sign is irrelevant)
            let wind_y_ms = Math.sin(delta_radians) * this.instrument.WIND_SPEED_MS;

            // vmg also used for arrival height
            let velocity_made_good_ms;
            if (this.instrument.STF_SPEED_0_MS <= Math.abs(wind_y_ms)) {
                velocity_made_good_ms = 1;
            } else {
                velocity_made_good_ms = wind_x_ms + Math.sqrt(Math.pow(this.instrument.STF_SPEED_0_MS, 2) - Math.pow(wind_y_ms,
                    2));
            }

            wp.tailwind_ms = velocity_made_good_ms - this.instrument.STF_SPEED_0_MS; // tailwind is +ve

            // *******************************************************************
            // Update wp.arrival_height_msl_m
            // This will be DIRECT to the current WP
            // This will be AROUND TASK for later WP's
            // *******************************************************************
            this.instrument.ex = "Task.7." + wp_index;
            let time_to_wp_s;
            let height_needed_m;
            if (wp_index == this.index) {
                // Arrival height at current WP
                time_to_wp_s = wp.distance_m / velocity_made_good_ms;
                height_needed_m = time_to_wp_s * Math.abs(this.instrument.STF_SINK_0_MS); // Sink is negative
                wp.arrival_height_msl_m = this.instrument.ALTITUDE_M - height_needed_m;
            } else if (wp_index > this.index) {
                time_to_wp_s = wp.leg_distance_m / velocity_made_good_ms;
                height_needed_m = time_to_wp_s * Math.abs(this.instrument.STF_SINK_0_MS); // Sink is negative
                let previous_wp = this.waypoints[wp_index - 1];
                // The arrival height calculation for THIS waypoint assumes you start the leg from the arrival height at the PREVIOUS waypoint.
                wp.arrival_height_msl_m = previous_wp.arrival_height_msl_m - height_needed_m;
            }
            wp.ete = time_to_wp_s;
        }
        this.instrument.ex = "Task.9";
    }

    // Start the task.
    start() {
        this.start_time_s = this.instrument.SIM_TIME_S;
        this.start_local_time_s = this.instrument.LOCAL_TIME_S;
        this.start_alt_m = this.instrument.ALTITUDE_M;
        this.started = true;
        this.finished = false;
        this.finish_time_s = 0;
        // Flag start WP as 'completed'
        this.waypoints[this.start_index].leg_completed();
    }

    // Finish the task
    finish() {
        this.finish_wp().leg_completed();
        this.finished = true;
        this.finish_time_s = this.finish_wp().leg_completed_time_s;
        this.finish_local_time_s = this.instrument.LOCAL_TIME_S;
        this.finish_alt_m = this.instrument.ALTITUDE_M;
        this.finish_speed_ms = this.distance_m() / (this.finish_time_s - this.start_time_s);
    }

    // Return seconds elapsed since task was started.
    task_time_s() {
        if (!this.started || this.start_time_s > this.instrument.SIM_TIME_S) {
            return 0;
        }
        return this.instrument.SIM_TIME_S - this.start_time_s;
    }

    // Reset the task start, i.e. restore status to as if not started.
    reset_start() {
        this.start_time_s = 0; // ABSOLUTE TIME when task was started
        this.finish_time_s = 0;
        this.started = false; // TRUE indicates task is started (i.e. pilot has crossed start line)
        this.finished = false; // TRUE indicates task is finished
        // Reset all the 'completed' flags for the waypoints
        for (let i = 0; i < this.waypoints.length; i++) {
            this.waypoints[i].reset_leg_completed();
        }
    }

    // Return waypoints count for this task
    count() {
        return this.waypoints.length;
    }

    // Return total task distance from start WP to finish WP (meters)
    distance_m() {
        let total_distance_m = 0;
        for (let i = this.start_index + 1; i <= this.finish_index; i++) {
            total_distance_m += this.waypoints[i].leg_distance_m;
        }
        return total_distance_m;
    }

    // Return current waypoint object
    current_wp() {
        if (this.index < this.waypoints.length) {
            return this.waypoints[this.index];
        }
        return this.waypoints.length > 0 ? this.waypoints[0] : null;
    }

    // Return next waypoint object
    next_wp() {
        if (this.index + 1 < this.waypoints.length) {
            return this.waypoints[this.index + 1];
        }
        return this.waypoints.length > 1 ? this.waypoints[0] : null;
    }

    // Return start waypoint object
    start_wp() {
        if (this.start_index < this.waypoints.length) {
            return this.waypoints[this.start_index];
        }
        return this.waypoints[0];
    }

    // Return finish waypoint object
    finish_wp() {
        if (this.finish_index < this.waypoints.length) {
            return this.waypoints[this.finish_index];
        }
        return this.waypoints[0];
    }

    // Return true if current task index is for last waypoint
    on_last_waypoint() {
        return this.index == this.waypoints.length - 1;
    }

    // Return true if all legs are completed up to and including wp_index
    completed_to(wp_index) {
        for (let i = this.start_index; i <= wp_index; i++) {
            if (!this.waypoints[i].leg_is_completed) {
                return false;
            }
        }
        return true;
    }

    // Load task from flightplan
    // As \Official\Steam\asobo-vcockpits-instruments\html_ui\Pages\VCockpit\Instruments\Shared\FlightElements\FlightPlanManager.js
    load() {
        // console.log('b21_soaring_engine Task.load()');
        let parent = this;
        this.init(); // Reset the Task settings
        Coherent.call("GET_FLIGHTPLAN")
            .then((flightPlanData) => {
                //console.log("flightPlanIndex "+flightPlanData.flightPlanIndex);
                //console.log("activeWaypointIndex "+flightPlanData.activeWaypointIndex);
                //console.log("waypoints length "+flightPlanData.waypoints.length);
                //console.log("GET_FLIGHTPLAN returned:", flightPlanData);
                this.start_index_is_set = false; // Has this.start_index and this.finish_index been set ?
                this.finish_index_is_set = false;
                if (flightPlanData.waypoints.length > 1) {
                    for (let i = 0; i < flightPlanData.waypoints.length; i++) {
                        let fp_wp = flightPlanData.waypoints[i];
                        this.add_waypoint_from_flightplan(fp_wp);
                    }
                }

                if (this.waypoints.length > 0) {
                    this.active = true;
                    this.index = 0; //(this.waypoints.length > 1) ? 1 : 0;
                    // start_index and finish_index MAY have be set by a WP name starting with '*' so we should not overwrite
                    if (!this.start_index_is_set) {
                        this.start_index = this.waypoints.length < 4 ? 0 : 1;
                    }
                    if (!this.finish_index_is_set) {
                        this.finish_index = this.waypoints.length < 4 ? this.waypoints.length - 1 : this.waypoints.length -
                            2;
                    }
                    //console.log("Flightplan Active");
                } else { // No flightplan, so use current position
                    // console.log("No flightplan, using HOME");
                    this.waypoints = [new WP(this, // task
                        0,
                        "HOME",
                        this.instrument.PLANE_POSITION,
                        SimVar.GetSimVarValue("GROUND ALTITUDE", "meters")
                    )];
                    this.index = 0;
                    this.active = true;
                }
                //this.instrument.nav_display_refresh(0);
            })
            .catch((e) => {
                console.log("GET_FLIGHTPLAN exception", e);
                console.log("GET_FLIGHTPLAN rejected");
            }); // End Coherent.call()
    }

    // For each MSFS flightplan waypoint, add it to this.task.waypoints[ ]
    add_waypoint_from_flightplan(fp_wp) {
        //console.log("Task add WP "+fp_wp.ident);
        // console.log("add_waypoint_from_flightplan", fp_wp.ident, fp_wp);
        if (fp_wp.ident.startsWith("TIMECRUIS") || fp_wp.ident.startsWith("TIMEDSCNT") || fp_wp.ident.startsWith("TIMEVERT")) {
           //  console.log("add_waypoint_from_flightplan skipping", fp_wp.ident);
            return;
        }

        let index = this.waypoints.length;

        // Note MSFS **OVERLOADS** fp_wp.icao with additional (hack) info and AFAIK airports will be "A <icao>" e.g. "A KRVL"
        // this is because MSFS will use .facilityLoader.getFacility(fp_wp.icao) to get the data. We don't need that.
        // So here we generate our WP .name either from the .ident or the .icao
        let name;
        if (fp_wp.ident == null || fp_wp.ident == "") {
            if (fp_wp.icao != null && fp_wp.icao.startsWith("A ") && fp_wp.icao.length > 7) {
                //console.log("add_waypoint_from_flightplan",fp_wp.icao.replace(/ /g,"x")); // no replaceAll() in Coherent Debugger
                name = fp_wp.icao.slice(7);
                if (name.endsWith(" ")) {
                    name = name.slice(0, -1);
                }
            } else if (fp_wp.icao != null && fp_wp.icao.replace(/ /g, "") != "") { // Check icao not null or all spaces
                name = fp_wp.icao;
            } else {
                name = "TP" + index;
            }
        } else {
            name = fp_wp.ident;
        }

        // Get properties for each waypoint
        const wp = new WP(this, // task
            index,
            name,
            new LatLong(fp_wp.lla.lat, fp_wp.lla.long),
            fp_wp.lla.alt
        );

        let original_name = wp.name;
        this.decode_wp_name(wp, index);
            // console.log("Wp from '" + original_name + "' FP extra params: alt_m=" + wp.alt_m.toFixed(0) +
            // " radius_m=" + (wp.radius_m == null ? "null" : wp.radius_m.toFixed(0)) +
            //" min/max_alt_m=" + (wp.min_alt_m == null ? "null" : wp.min_alt_m.toFixed(0)) + "/" +
            // (wp.max_alt_m == null ? "null" : wp.max_alt_m.toFixed(0)));

        if (index > 0) {
            const prev_wp = this.waypoints[index - 1];
            wp.update_leg_distance(prev_wp);
            wp.update_leg_bearing(prev_wp);
            prev_wp.update_start_line(wp);
            wp.update_finish_line();
        }

        // We got a good waypoint, so add it to local flightplan
        // Add this waypoint to our internal this.task array
        this.waypoints.push(wp);
    }

    // Parse soaring-encoded WP name, e.g. *Mifflin+813|6000-1000x500 => Mifflin alt 613ft, max_alt=6000ft, min_alt=1000ft, radius=500m
    // The "x" (radius) must come after either "+" or "|", so +813x500 is ok.
    decode_wp_name(wp) {
        //console.log("decoding", wp.index, wp.name);
        if (wp.name == null) {
            return;
        }

        //console.log("decoding start/finish", wp.index, wp.name);
        // Recognise WP name includes "start" => Start, "finish" => Finish
        if (wp.name.toLowerCase().includes("start")) {
            this.start_index = wp.index;
            this.start_index_is_set = true;
            if (wp.name.startsWith("*")) { // Remove "*" if present
                wp.name = wp.name.slice(1);
            }
        } else if (wp.name.toLowerCase().includes("finish")) {
            this.finish_index = wp.index;
            this.finish_index_is_set = true;
            if (wp.name.startsWith("*")) { // Remove "*" if present
                wp.name = wp.name.slice(1);
            }
        } else if (wp.name.startsWith("*")) {
            if (!this.start_index_is_set) {
                this.start_index = wp.index;
                this.start_index_is_set = true;
            } else {
                this.finish_index = wp.index;
                this.finish_index_is_set = true;
            }
            wp.name = wp.name.slice(1); // Remove the '*' from the start of the WP name
        }

        //console.log("decoding alt_m", wp.index, wp.name);
        // Handle WP ELEVATION
        let wp_extra = "";
        let wp_plus = wp.name.split('+');
        if (wp_plus.length > 1) {
            //console.log("decoding + split length >1",wp.index, wp.name);
            wp_extra = wp_plus[wp_plus.length - 1];
            //console.log("decoding + wp_extra is ",wp_extra);
            let alt_feet = parseFloat(wp_extra);
            if (!isNaN(alt_feet)) {
                wp.alt_m = Geo.FEET_TO_M(alt_feet);
            }
        }

        //console.log("decoding max_alt_m", wp.index, wp.name);
        let wp_bar = wp.name.split("|");
        if (wp_bar.length > 1) {
            wp_extra = wp_bar[wp_bar.length - 1];
            let max_alt_feet = parseFloat(wp_extra);
            //console.log("parsed max_alt_feet from",wp_extra);
            if (!isNaN(max_alt_feet)) {
                //console.log("parse max_alt_feet",max_alt_feet);
                wp.max_alt_m = Geo.FEET_TO_M(max_alt_feet);
            }
        }
        //console.log("decoding min_alt_m "+ wp.index+" "+wp.name+" from '"+wp_extra");
        let wp_slash = wp_extra.split("/");
        if (wp_slash.length > 1) {
            let min_alt_feet = parseFloat(wp_slash[wp_slash.length - 1]);
            if (!isNaN(min_alt_feet)) {
                //console.log("parse min_alt_feet",min_alt_feet);
                wp.min_alt_m = Geo.FEET_TO_M(min_alt_feet);
            }
        }
        // Only look for an "x" in the wp_extra
        //console.log("wp_extra is", wp_extra);
        let wp_x = wp_extra.split("x");
        if (wp_x.length > 1) {
            let wp_width_m = parseFloat(wp_x[wp_x.length - 1]);
            if (!isNaN(wp_width_m)) {
                //console.log("parse wp_radius_m",wp_radius_m);
                wp.radius_m = wp_width_m / 2;
                wp.radius_updated = true; // Flag to confirm wp.radius_m is set in PLAN
            }
        }
        // Trim wp.name to shortest before "+" or "|"
        wp.name = wp.name.split("+")[0].split("|")[0];
    }

    next_waypoint() {
        if (!this.active) {
            return;
        }
        this.index += 1;
        if (this.index >= this.waypoints.length) {
            this.index = 0;
        }
    }

    prev_waypoint() {
        if (!this.active) {
            return;
        }
        this.index -= 1;
        if (this.index < 0) {
            this.index = this.waypoints.length - 1;
        }
    }

} // End Task class


// B21 geo utility functions e.g. distance between two points

// A point is {lat: long:} assumed WGS84
// Distances are in meters

class Geo {


    static EARTH_RADIUS() {
            return 6366710.0;
        } // Earth mean radius in meters (accurate at mid-latitudes)

    // Return distance in m between positions p1 and p2.
    // lat/longs in e.g. p1.lat etc
    static get_distance_m(p1, p2) {
        var dLat = this.DEG_TO_RAD(p2.lat - p1.lat);
        var dLong = this.DEG_TO_RAD(p2.long - p1.long);
        var a = Math.sin(dLat / 2) * Math.sin(dLat / 2) +
            Math.cos(this.DEG_TO_RAD(p1.lat)) * Math.cos(this.DEG_TO_RAD(p2.lat)) *
            Math.sin(dLong / 2) * Math.sin(dLong / 2);
        var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
        var d = this.EARTH_RADIUS() * c;
        return d; // returns the distance in meter
    }

    // Bearing in degrees from point p1 -> p2 (each as {lat: , long: })
    static get_bearing_deg(p1, p2) {
        // Convert p1,p2 degrees -> radians
        var a = {
            lat: this.DEG_TO_RAD(p1.lat),
            long: this.DEG_TO_RAD(p1.long)
        };
        var b = {
            lat: this.DEG_TO_RAD(p2.lat),
            long: this.DEG_TO_RAD(p2.long)
        };
        var y = Math.sin(b.long - a.long) * Math.cos(b.lat);
        var x = Math.cos(a.lat) * Math.sin(b.lat) -
            Math.sin(a.lat) * Math.cos(b.lat) * Math.cos(b.long - a.long);
        return (Math.atan2(y, x) * 180 / Math.PI + 360) % 360; // Converts back to degrees
    }

    // distance_and_bearing(...) returns a new lat/long a distance and bearing from lat1,lon1.
    // lat, longs and bearings in degrees, distance in meters
    static distance_and_bearing(p, distance, bearing) {
        const rlat1 = this.DEG_TO_RAD(p.lat);
        const rlong1 = this.DEG_TO_RAD(p.long);
        const rdistance = this.M_TO_RAD(distance);
        const rbearing = this.DEG_TO_RAD(bearing);
        const rlat2 = Math.asin(Math.sin(rlat1) * Math.cos(rdistance) + Math.cos(rlat1) * Math.sin(rdistance) * Math.cos(
            rbearing));
        let rlong2;
        if (Math.cos(rlat2) == 0) {
            rlong2 = rlong1; // endpoint a pole
        } else {
            rlong2 = ((rlong1 + Math.asin(Math.sin(rbearing) * Math.sin(rdistance) / Math.cos(rlat2)) + Math.PI) % (2 * Math.PI)) -
                Math.PI;
        }
        return {
            "lat": this.RAD_TO_DEG(rlat2),
            "long": this.RAD_TO_DEG(rlong2)
        };
    }

    // Return TRUE if wp_bearing is within +/- sector_size/2 degrees of leg_bearing
    // I.e. if aircraft has waypoint at wp_bearing_deg
    // and next leg from waypoint is in direction leg_bearing
    // and the sector opposite the leg to next waypoint is sector_size degrees wide.
    // E.g. sector_size could be 180 for a start line, or 90 for a turnpoint.
    static in_sector(leg_bearing, wp_bearing, sector_size) {
        let sector_deg = leg_bearing - sector_size / 2;
        if (sector_deg < 0) {
            sector_deg += 360;
        }
        // Delta is the angle +/- 180
        let delta = sector_deg - wp_bearing;
        if (delta < -180) {
            delta += 360;
        } else if (delta > 180) {
            delta -= 360;
        }

        return (delta < 0 && delta > -sector_size);
    }

    // Return the difference between two bearings a,b as +/- 180 degrees
    // where a +ve delta implies a clockwise rotation.
    // E.g. bearing_delta(10,45) = +35, bearing_delta(5,350) = -15
    static bearing_delta_deg(a,b) {
        // We ensure a & b are 0..360 and that positive_delta is 0..360
        let positive_delta = ( ((b+360) % 360) + 360 - ((a+360) % 360) ) % 360;
        // positive_delta is a 0..360 rotation from a to b, will convert that to +/- 180:
        return positive_delta <= 180 ? positive_delta : positive_delta - 360;
    }

    //*********************************************************************************************
    //*************** CONVERSION FUNCTIONS, E.G. meters to nautical miles *************************
    //*********************************************************************************************

    // convert distance meters on earths surface to radians subtended at the centre
    static M_TO_RAD(distance) {
        return distance / this.EARTH_RADIUS();
    }

    // degrees to radians
    static DEG_TO_RAD(x) {
        return x * Math.PI / 180;
    }

    // radians to degrees
    static RAD_TO_DEG(x) {
        return x * (180.0 / Math.PI);
    }

    // meters to nautical miles
    static M_TO_NM(x) {
        return x * 0.000539956803;
    }

    // meters to statute miles
    static M_TO_MILES(x) {
        return x * 0.000621371;
    }

    // meter to foot
    static M_TO_FEET(m) {
        return m * 3.28084;
    }

    static FEET_TO_M(feet) {
        return feet / 3.28084;
    }

    // meter per second to kilometer per hour
    static MS_TO_KPH(ms) {
        return ms * 3.6;
    }

    static KPH_TO_MS(kph) {
        return kph / 3.6;
    }

    static MS_TO_KNOTS(ms) {
        return ms * 1.94384;
    }

}




class lxn_Touch_PageGroup extends NavSystemPageGroup {
    constructor(_name, _gps, _pages, _additionalButtons = []) {
        super(_name, _gps, _pages);
        this.additionalMenuButtons = [];
        this.additionalMenuButtons = _additionalButtons;
    }
}

class lxn_Touch_NavSystemPage extends NavSystemPage {
    constructor(_name, _htmlElemId, _element, _shortName, _imagePath) {
        super(_name, _htmlElemId, _element);
        this.shortName = _shortName;
        this.imagePath = _imagePath;
    }
}

class lxn_Touch_NRST_Airport extends NavSystemTouch_NRST_Airport {
    init(root) {
        super.init(root);

        this.selectedElement = -1;
        this.selectedAirport = {};
        this.airportUserselected = false;
    }

    onUpdate(_deltaTime) {
        super.onUpdate(_deltaTime);     
        
    }

    directTo() {
        if (this.selectedElement != -1) {
            this.gps.lastRelevantICAOType = "A";
            this.gps.lastRelevantICAO = this.nearestAirports.airports[this.selectedElement].icao;
            diffAndSetAttribute(this.menu, "state", "Inactive");
            diffAndSetAttribute(this.airportLines[this.selectedElement].identButton, "state", "None");
            this.selectedElement = -1;
        }
        this.gps.computeEvent("DirectTo_Push");
    }

    clickOnElement(_index) {
        if(this.selectedAirport.ident == this.nearestAirports.airports[_index].ident) {
            // Re-clicked the selected airport. deselect and default to nearest Airport
            this.setselectedAirport(this.nearestAirports.airports[0]);
            this.airportUserselected = false;
        } else {
            this.setselectedAirport(this.nearestAirports.airports[_index]);
            this.airportUserselected = true;
        }

        this.updateSelectedEntry();
    }

    updateSelectedEntry() {
        let instrument = this;

        this.table.querySelectorAll(".mainValue").forEach((el)=> {
            let parent_tr = el.parentNode.parentNode.parentNode;
            if(el.innerText == instrument.selectedAirport.ident) {
                parent_tr.classList.add("selected");
            } else {
                parent_tr.classList.remove("selected");
            }
        })
    }

    getSelectedAirport() {
        if(!this.airportUserselected) {
            this.setselectedAirport(this.nearestAirports.airports[0]);
        } 
        this.updateSelectedEntry();
        return this.selectedAirport;
    }

    setselectedAirport(apt) {
        this.selectedAirport = {
            ident: apt.ident,
            name: apt.name,
            distance: apt.distance,
            bearing: apt.bearing,
            longestRunwayLength: apt.longestRunwayLength,
            longestRunwayDirection: apt.longestRunwayDirection,
            latlng: new LatLong(apt.coordinates.lat,apt.coordinates.long)
        }
    }
        
}



registerInstrument("lxn-nav", lxn);

