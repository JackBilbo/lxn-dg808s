let NAVMAP, NAVPANEL, CONFIGPANEL, UI, TOPOMAP;

class lxn extends NavSystemTouch {

    constructor() {
        super();

        this.TIMER_05 = 0;
        this.TIMER_1 = 0;

        this.ELECTRICAL_MASTER_BATTERY = true;

        // Temporary legacy values for Speedgauge and Hawk

        this.jbb_mccready = 0;
        this.jbb_mccready_ms = 0;
        this.jbb_refwt = 779;
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
            aoa: { value: 0, label: "AoA", longlabel: "Angle of Attack", category: "direction", baseunit: "deg"},
            wind_direction: { value: 0, label: "Wind", longlabel: "Wind Direction", category: "direction", baseunit: "deg" },
            wind_spd: { value: 0, label: "Wind", longlabel: "Windspeed", category: "windspeed", baseunit: "kts" },
            wind_vertical: { value: 0, label: "Wind Vert.", longlabel: "Vertical Windspeed", category: "windspeed", baseunit: "kts" },
            mccready: { value: 0, label: "MC", longlabel: "McCready Value", category: "verticalspeed", baseunit: "kts"},
            alt: { value: 13542, label: "ALT", longlabel: "Altitude", category: "alt", baseunit: "ft" },
            alt_gnd: { value: 3318, label: "ALT (GND)", longlabel: "Altitude above Ground", category: "alt", baseunit: "ft" },
            oat: { value: 1, label: "OAT", longlabel: "Outside Air Temperature",category:"temperature", baseunit: "F"},
            ballast: { value: 399, label: "Ballast", longlabel: "Current Ballast",category:"weight", baseunit: "lbs"},
            ballast_pct: { value: 100, label: "Ballast %", longlabel: "Current Ballast Percent",category:"percent", baseunit: "%"},
            localtime: { value: 0, label: "Local", longlabel: "Local Time", category: "time_of_day", baseunit: "s"},
            utctime: { value: 0, label: "RL UTC", longlabel: "Real Life UTC Time", category: "plaintext", baseunit: "none"},
            tasktime: { value: 0, label: "Task Time", longlabel: "Task Time", category: "time_of_day", baseunit: "s"},
            ltherm_gain: { value: 0, label: "LT GAIN", longlabel: "Last thermal altitude gain", category: "alt", baseunit: "ft" },
            ltherm_avg: { value: 0, label: "LT AVG", longlabel: "Last thermal true average", category: "verticalspeed", baseunit: "kts" },
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
            wp_arr_agl: { value: 0, label: "WP ARR (AGL)", longlabel: "Waypoint Arrival AGL (WP-Height)", category: "alt", baseunit: "ft" },
            wp_arr_wpmin: { value: 0, label: "WP &#916; MIN", longlabel: "Waypoint Arrival (WP) incl. min-height", category: "alt", baseunit: "ft" },
            wp_arr_msl: { value: 0, label: "WP ARR (MSL)", longlabel: "Waypoint Arrival (MSL)", category: "alt", baseunit: "ft" },
            wp_ete: { value: 0, label: "WP ETE", longlabel: "Waypoint Time Enroute", category: "time", baseunit: "min" },
            task_arr_agl: { value: 0, label: "TSK FIN (AGL)", longlabel: "Task Finish Altitude (AGL)", category: "alt", baseunit: "ft" },
            task_arr_msl: { value: 0, label: "TSK FIN (MSL)", longlabel: "Task Finish Altitude (MSL)", category: "alt", baseunit: "ft" },
            task_spd: { value: 0, label: "TSK SPD", longlabel: "Task Speed", category: "speed", baseunit: "kts"}
        }
        
        this.units = {
            speed: { pref: "kts", imperial: "kts", metric: "kmh", options: ["kts","kmh","ms","mph"], label: "Speed" },
            dist: { pref: "nm", imperial: "nm", metric: "km", options: ["nm","ml","km","m"], label: "Distance" },
            alt: { pref: "ft", imperial: "ft", metric: "m", options: ["ft","m"], label: "Altitude" },
            windspeed: { pref: "kts", imperial: "kts", metric: "ms", options: ["kts","kmh","ms","fs"], label: "Windspeed" },
            verticalspeed: { pref: "kts", imperial: "kts", metric: "ms", options: ["kts","kmh","ms","fs"], label: "Vert. Speed" },
            direction: { pref: "deg", imperial: "deg", metric: "deg", options: ["deg"], label: "Direction" },
            weight: {  pref: "lbs", imperial: "lbs", metric: "kg", options: ["lbs", "kg"], label: "Weight" },
            temperature: {  pref: "F", imperial: "F", metric: "C", options: ["F", "C"], label: "Temperature" },
            time: { pref: "min", imperial: "min", metric: "min", options: ["min","sec"], label: "Time" },
            time_of_day:  { pref: "hms24", imperial: "hms12", metric: "hms24", options: ["hms12","hms24"], label: "Time of Day" },
            plaintext:  { pref: "none", imperial: "none", metric: "none", options: ["none"], label: "Plain Text" },
            percent:  { pref: "%", imperial: "%", metric: "%", options: ["%"], label: "Percentage" }
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
                ms : 0.51444,
                fs: 1.68781
            },
            verticalspeed: {
                kts : 1,
                kmh : 1.852,
                mph : 1.15078,
                ms : 0.51444,
                fs: 1.68781
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
            },
            percent: {
                "%": 1
            }
        }
		
    }

    get templateID() {
        return "lxn";
    } // ID of <script> tag in nav.html
	
	

    connectedCallback() {
        super.connectedCallback();

        NAVMAP = new navmap(this);
        NAVPANEL = new navpanel(this); NAVPANEL.init();
        CONFIGPANEL = new configpanel(this); CONFIGPANEL.initSystemSettings();
        UI = new ui(this); UI.init();

        this.init_speedgauge();
        this.jbb_init_calc_polar();

        B21_SOARING_ENGINE.register_callback(this, this.engine_event_callback);

        this.thermalling_display = new ThermallingDisplay(this);
        
        this.stallwarner = document.querySelector("#stallwarner");
        this.gearposition = SimVar.GetSimVarValue("A:GEAR HANDLE POSITION", "bool");

        this.tick = 0;

        UI.resetPages();

        this._isConnected = true;
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

        this.global_power();
        if(this.power_switched) {
            if(!this.power_status) {
                document.getElementById("battery_required").style.display = "none";
                return;
            } else {
                document.getElementById("battery_required").style.display = "block";
            }
        }

        let LXNAV = this;
        this.TIME_S = SimVar.GetSimVarValue("E:SIMULATION TIME","seconds");
        this.SIM_TIME_S = this.TIME_S;

        if(this.tick == 0) {
            this.vars.ias.value = SimVar.GetSimVarValue("A:AIRSPEED INDICATED", "knots");
            this.vars.hdg.value = SimVar.GetSimVarValue("A:PLANE HEADING DEGREES TRUE","degrees");
            this.PLANE_HEADING_DEG = this.vars.hdg.value; 
            this.vars.tas.value = SimVar.GetSimVarValue("A:AIRSPEED TRUE", "knots");
            this.vars.gndspd.value = SimVar.GetSimVarValue("A:GPS GROUND SPEED","knots");
            this.vars.trk.value = this.vars.gndspd.value > 5 ? SimVar.GetSimVarValue("GPS GROUND TRUE TRACK","degrees") : this.vars.hdg.value;
            this.vars.alt.value = SimVar.GetSimVarValue("A:INDICATED ALTITUDE", "feet");
            // this.vars.alt_gnd.value = SimVar.GetSimVarValue("A:PLANE ALT ABOVE GROUND", "feet");
            this.vars.alt_gnd.value = this.vars.alt.value - SimVar.GetSimVarValue("GROUND ALTITUDE", "feet");

            this.AIRSPEED_MS = this.vars.ias.value * 0.51444;
            this.AIRSPEED_TRUE_MS = this.vars.tas.value * 0.51444;
            this.ALTITUDE_M = this.vars.alt.value * 0.3048;

            this.update_speedgauge();
            NAVMAP.load_map();
        }
        
        
        if(this.tick == 1) {
            this.vars.wind_spd.value = parseFloat(SimVar.GetSimVarValue("A:AMBIENT WIND VELOCITY", "knots"));
            this.vars.wind_direction.value = parseFloat(SimVar.GetSimVarValue("A:AMBIENT WIND DIRECTION", "degrees"));
            this.vars.wind_vertical.value = SimVar.GetSimVarValue("A:AMBIENT WIND Y", "knots");
            this.vars.current_netto.value = (this.vars.current_netto.value * 0.9) + (SimVar.GetSimVarValue("L:NETTO", "knots") * 0.1);
            if(this.vars.aoa.isUsed) {this.vars.aoa.value = SimVar.GetSimVarValue("INCIDENCE ALPHA", "radians") * (180/Math.PI);}

            this.ON_GROUND = SimVar.GetSimVarValue("SIM ON GROUND", "bool") ? true : false;
            this.TOTAL_WEIGHT_KG = SimVar.GetSimVarValue("A:TOTAL WEIGHT", "kilograms");
            this.PLANE_POSITION = this.get_position(); // returns a MSFS LatLong()
            this.WIND_DIRECTION_DEG = this.vars.wind_direction.value;
            // Get wind speed with gust filtering
            if (this.WIND_SPEED_MS==null) {
                this.WIND_SPEED_MS = this.vars.wind_spd.value * 0.51444;
            }
            this.WIND_SPEED_MS = 0.99 * this.WIND_SPEED_MS  + 0.01 * (this.vars.wind_spd.value * 0.51444);

            B21_SOARING_ENGINE.MACCREADY_MS = this.vars.mccready.value * 0.51444;
            B21_SOARING_ENGINE.STF_SPEED_0_MS = this.vars.stf.value * 0.5144;
            B21_SOARING_ENGINE.STF_SINK_0_MS = this.vars.sink_stf.value * 0.5144;

            // Additional vars used by thermalling_display
            this.NETTO_MS = SimVar.GetSimVarValue("L:NETTO","meters per second"); 
            // this.TE_MS = SimVar.GetSimVarValue("L:B21_TE_MS", "number"); // From model xml
            this.TE_MS = SimVar.GetSimVarValue("L:TOTAL ENERGY", "meters per second");
            this.MACCREADY_MS = B21_SOARING_ENGINE.MACCREADY_MS;
            this.WP_BEARING_DEG = B21_SOARING_ENGINE.current_wp() == null ? null : B21_SOARING_ENGINE.current_wp().bearing_deg;

            if(CONFIGPANEL.displayHawk ) { this.jbb_update_hawk(); }

            this.thermalling_display.update();
            
        }
        
        
        if(this.TIME_S - this.TIMER_05 > 0.5) {
            /* Stuff happening twice per second  */
            this.TIMER_05 = this.TIME_S;

            this.jbb_update_stf();

            if (B21_SOARING_ENGINE.task_active()) {

			    this.update_task_page();

                if(this.vars.wp_name.isUsed) {this.vars.wp_name.value = B21_SOARING_ENGINE.current_wp().name;}
                if(this.vars.wp_dist.isUsed) {this.vars.wp_dist.value = B21_SOARING_ENGINE.current_wp().distance_m / 1852;} // convert to baseunit
                if(this.vars.wp_bearing.isUsed) {this.vars.wp_bearing.value = B21_SOARING_ENGINE.current_wp().bearing_deg;}
                if(this.vars.wp_arr_msl.isUsed) {this.vars.wp_arr_msl.value = B21_SOARING_ENGINE.current_wp().arrival_height_msl_m / 0.3048;}
                if(this.vars.wp_ete.isUsed) {this.vars.wp_ete.value = B21_SOARING_ENGINE.current_wp().ete_s / 60;}
                if(this.vars.wp_alt.isUsed) {this.vars.wp_alt.value = B21_SOARING_ENGINE.current_wp().alt_m / 0.3048;}
                if(this.vars.wp_arr_agl.isUsed) {this.vars.wp_arr_agl.value = (B21_SOARING_ENGINE.current_wp().arrival_height_msl_m - B21_SOARING_ENGINE.current_wp().alt_m) / 0.3048;}
                if(this.vars.wp_arr_wpmin.isUsed) {this.vars.wp_arr_wpmin.value = (B21_SOARING_ENGINE.current_wp().arrival_height_msl_m - (B21_SOARING_ENGINE.current_wp().min_alt_m != null ? B21_SOARING_ENGINE.current_wp().min_alt_m : B21_SOARING_ENGINE.current_wp().alt_m)) / 0.3048;}
                if(this.vars.task_arr_msl.isUsed) {this.vars.task_arr_msl.value = B21_SOARING_ENGINE.task.finish_wp().arrival_height_msl_m / 0.3048;}
                if(this.vars.task_arr_agl.isUsed) {this.vars.task_arr_agl.value = (B21_SOARING_ENGINE.task.finish_wp().arrival_height_msl_m - (B21_SOARING_ENGINE.task.finish_wp().min_alt_m != null ? B21_SOARING_ENGINE.task.finish_wp().min_alt_m : B21_SOARING_ENGINE.task.finish_wp().alt_m)) / 0.3048;}
                if(this.vars.task_spd.isUsed) {this.vars.task_spd.value = B21_SOARING_ENGINE.task.avg_task_speed_kts();}
            }
            
            
            NAVPANEL.update()
            CONFIGPANEL.update();
            this.updateKineticAssistant();
        }

        if(this.TIME_S - this.TIMER_1 > 1) {
            /* Stuff happening every second ********************************************************* */
            this.TIMER_1 = this.TIME_S;

            if(this.vars.oat.isUsed) {this.vars.oat.value = parseFloat(SimVar.GetSimVarValue("A:AMBIENT TEMPERATURE", "fahrenheit"));}
            if(this.vars.localtime.isUsed) {this.vars.localtime.value = SimVar.GetSimVarValue("E:LOCAL TIME","seconds");}
            if(this.vars.utctime.isUsed) {this.vars.utctime.value = new Date().toUTCString().replace(/.*(\d\d:\d\d:\d\d).*/,"$1"); }

            this.updateLiftdots();
            
            if(this.gearposition != SimVar.GetSimVarValue("A:GEAR HANDLE POSITION", "bool")) {
                if(SimVar.GetSimVarValue("A:GEAR HANDLE POSITION", "bool") == true && this.vars.ballast.value > 150) {
                    this.popalert("Gear Down. Check Ballast","");
                }
                this.gearposition = SimVar.GetSimVarValue("A:GEAR HANDLE POSITION", "bool")
            }
    
            
            if(SimVar.GetSimVarValue("A:SPOILERS HANDLE POSITION","percent over 100") > 0.1 && this.gearposition != true && this.vars.alt_gnd.value < 800) {
                if(!this.gearwarnsilenced) {
                    this.popalert("CHECK GEAR","");
                    this.gearwarnsilenced = true; 
                }
                let instrument = this;
                window.setTimeout(function() { instrument.gearwarnsilenced = false }, 10000);
            }
        }

        if(this.lift_dots_timer_prev == null) {
            this.lift_dots_timer_prev = this.TIME_S;
        }

        if(this.TIME_S - this.lift_dots_timer_prev > this.jbb_lift_dot_delay && this.vars.ias.value > 40 && this.showLiftdots) {
            this.lift_dots_timer_prev = this.TIME_S;
            this.addLiftdot()
        }

        /* now update all visible datacells with their selected values */
        let datacells = document.querySelectorAll(".current .datacell");
        
        for(var i = this.tick; i < datacells.length; i = i + 2) {
            let cell = datacells[i];
            let currentconfigstr = cell.getAttribute("data-userconfig") != "" ? cell.getAttribute("data-userconfig") : cell.getAttribute("data-default");
            
            if(currentconfigstr != null) {
                let currentconfig = JSON.parse(currentconfigstr);
                if(currentconfig.value != "none") {

                    let forceunit = currentconfig.forceunit != null ? currentconfig.forceunit : "";

                    let displaynumber; 
                    if(LXNAV.vars[currentconfig.value].category != "plaintext") {
                        displaynumber = LXNAV.displayValue(LXNAV.vars[currentconfig.value].value, LXNAV.vars[currentconfig.value].baseunit, LXNAV.vars[currentconfig.value].category, forceunit);
                    } 
                    LXNAV.vars[currentconfig.value].isUsed = true; 
                    
                    cell.style.backgroundColor = displaynumber > 0 ? currentconfig.back + "BB" : currentconfig.backneg + "BB";
                    cell.style.color = currentconfig.text;
        
                    cell.querySelector(".label").innerHTML = LXNAV.vars[currentconfig.value].label;
                    
                    if(LXNAV.vars[currentconfig.value].category == "time_of_day" || LXNAV.vars[currentconfig.value].label == "RL UTC") {
                        cell.classList.add("smallfont");
                    } else {
                        cell.classList.remove("smallfont");
                    }

                    if(LXNAV.vars[currentconfig.value].category != "plaintext") {
                        cell.querySelector(".number").innerHTML = displaynumber;
                        cell.querySelector(".unit").innerHTML = forceunit != "" ? LXNAV.units[LXNAV.vars[currentconfig.value].category][forceunit] + "*" : LXNAV.units[LXNAV.vars[currentconfig.value].category].pref;
                    } else {
                        cell.querySelector(".number").innerHTML = LXNAV.vars[currentconfig.value].value;
                        cell.querySelector(".unit").innerHTML = "";
                    }
                } else {
                    cell.style.backgroundColor = "transparent";
                    cell.style.color = "transparent";
                }
            }
        }
    
        
        /* same for any "livedata"- fields, that might be present in a currently selected panel */
        let livefields = document.querySelectorAll(".current .livedata, .pageheader .livedata");
        for(var i = this.tick; i < livefields.length; i = i + 2) {
            let field = livefields[i];
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
            LXNAV.vars[requestedvalue].isUsed = true;   
        }

        this.tick = this.tick == 0 ? 1 : 0;

              /* keybindings */

            this.KNOBS_VAR = ("0000" + SimVar.GetSimVarValue("TRANSPONDER CODE:1", "number")).slice(-4); // knobs encoded in 4 digits of XPNDR
            if(this.prev_knobs_var == null ) { this.prev_knobs_var = this.KNOBS_VAR; }


              if (this.knob_delta(this.prev_knobs_var[2], this.KNOBS_VAR[2]) == -1) {
                this.prev_knobs_var = this.KNOBS_VAR;
                NAVMAP.zoom_out();
            }
    
            if (this.knob_delta(this.prev_knobs_var[2], this.KNOBS_VAR[2]) == 1) {
                this.prev_knobs_var = this.KNOBS_VAR;
                NAVMAP.zoom_in();
            }
    
            if (this.knob_delta(this.prev_knobs_var[0], this.KNOBS_VAR[0]) == -1) {
                this.prev_knobs_var = this.KNOBS_VAR;
                if(B21_SOARING_ENGINE.task_index() < B21_SOARING_ENGINE.task_length() -1 ) {
                    B21_SOARING_ENGINE.change_wp(1);
                }
             }
     
             if (this.knob_delta(this.prev_knobs_var[0], this.KNOBS_VAR[0]) == 1) {
                this.prev_knobs_var = this.KNOBS_VAR;
                if(B21_SOARING_ENGINE.task_index() > 0) {
                    B21_SOARING_ENGINE.change_wp(-1);
                }
             }
    
             if(this.prev_knobs_var[3] != this.KNOBS_VAR[3]) {
                this.prev_knobs_var = this.KNOBS_VAR;
                if(NAVMAP.map_rotation == "trackup") {
                    NAVMAP.map_rotation = "northup";
                } else {
                    NAVMAP.map_rotation = "trackup";
                }
                NAVMAP.set_map_rotation(NAVMAP.map_rotation);
             }
                       
             this.COMCODE = SimVar.GetSimVarValue("COM ACTIVE FREQUENCY:1","MHz").toFixed(3).toString().split(".");
             if(this.prevcomcode == null) { this.prevcomcode = this.COMCODE;}
    
             if(parseInt(this.prevcomcode[0]) < parseInt(this.COMCODE[0])) {
                this.prevcomcode[0] = this.COMCODE[0];
                UI.pageRight();
             }
    
             if(parseInt(this.prevcomcode[0]) > parseInt(this.COMCODE[0])) {
                this.prevcomcode[0] = this.COMCODE[0];
                UI.pageLeft();
             }
    
             if(parseInt(this.prevcomcode[1]) < parseInt(this.COMCODE[1])) {
                this.prevcomcode[1] = this.COMCODE[1];
                UI.pageDown();
             }
    
             if(parseInt(this.prevcomcode[1]) > parseInt(this.COMCODE[1])) {
                this.prevcomcode[1] = this.COMCODE[1];
                UI.pageUp();
             }
    	           
        /* Warnings and alerts */

        if(CONFIGPANEL.stallwarning && SimVar.GetSimVarValue("STALL WARNING", "bool") == "1") {
            if(!this.stallwarner.classList.contains("active")) {
                this.stallwarner.setAttribute("class", "active")
            }
        } else {
            this.stallwarner.setAttribute("class","");
        }
	
    }

    // Given a,b as digit 0..7, return -1, 0, +1 for delta of a -> b, modulo 7
    knob_delta(a,b) {
        //console.log("knob_delta a:"+a+" b:"+b);
        let delta = parseInt(b) - parseInt(a);
        if (delta == 0) {
            return delta;
        }
        return (delta < -4) || (delta > 0 && delta < 4) ? 1 : -1;
    }



    /* Utility Function to display Data converted to User Preference */
    /* Input any numerical Value, the current Unit and the Variable category (speed, distance, etc. as defined in the units-object) */
    /* Returns the Number converted to whatever preference the User has set. */
    /* Unit abbreviation (and Batteries) not included */
    /* Unit abbreviation can be easily retrieved: units.category.pref */

    displayValue(val,baseunit,category,forceunit) {
        val = parseFloat(val); // better make sure, it's a number
        let selected_unit;

        if(forceunit && this.units[category][forceunit]) {
            selected_unit = this.units[category][forceunit];
        } else {
            selected_unit = this.units[category].pref;
        }
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




    /* special Interface stuff like Speedtape & Hawk */

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
        let bugs = document.querySelector("#buginput").value;
              
        if(bugs != parseInt(bugs)) { bugs = 80; }
        if(bugs < 0 || bugs > 100) { bugs = 80; }
        
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

        this.setFlapSpeeds();
    }

    update_speedgauge() {
        if(this.slew_mode || document.querySelector(".speedgauge").style.display == "none") { return; }
        let units = SimVar.GetSimVarValue("L:UNITS_IMPERIAL", "percent") == 100;
        let IAS = SimVar.GetSimVarValue("A:AIRSPEED INDICATED", "kph");
        let speedbandoffset = -210;

        this.querySelector(".speedband").setAttribute("class", (units ? "speedband kts" : "speedband kmh"));
        this.querySelector(".currentspeed span").innerHTML = this.displayValue(this.vars.ias.value, "kts", "speed");

        if(IAS > 60 && IAS < 350) {
            document.querySelector(".speedladder.kmh").style.transform = "translate(0," + (speedbandoffset + (IAS - 60) * 10) +  "px)";
            document.querySelector(".speedladder.kts").style.transform = "translate(0," + (speedbandoffset + (IAS/1.852 - 30) * 10) +  "px)";

            this.querySelector(".speedladder.kmh .stfmarker").style.transform = "translate(0,-" + ((this.vars.stf.value * 1.852 - 60) * 10) +  "px)";
            this.querySelector(".speedladder.kts .stfmarker").style.transform = "translate(0,-" + ((this.vars.stf.value - 30) * 10) +  "px)";

        } else {
            document.querySelector(".speedladder.kmh").style.transform = "translate(0, " + speedbandoffset +  "px)";
            document.querySelector(".speedladder.kts").style.transform = "translate(0, " + speedbandoffset +  "px)";
        }

        // Update Flap-Indication
        let flapindex = SimVar.GetSimVarValue("A:FLAPS HANDLE INDEX", "number");
        if(this.lastBallastfactor != this.vars.ballast_pct.value) {
            this.setFlapSpeeds();
            this.lastBallastfactor = this.vars.ballast_pct.value;
        }

        for(var i = 5; i>=0; i--) {
            let flap_el_kmh = document.querySelector(".speedladder.kmh .flap_" + i);
            let flap_el_kts = document.querySelector(".speedladder.kts .flap_" + i);

            flap_el_kmh.style.backgroundColor = "rgba(0,0,0,0.3)";
            flap_el_kts.style.backgroundColor = "rgba(0,0,0,0.3)";

            if(i == flapindex) {
                flap_el_kmh.style.backgroundColor = "#ffcc00";
                flap_el_kts.style.backgroundColor = "#ffcc00";
            }
            
            if(i == flapindex && IAS > parseInt(flap_el_kmh.getAttribute("data-low")) && IAS <= parseInt(flap_el_kmh.getAttribute("data-high"))) {
                flap_el_kmh.style.backgroundColor = "#0d8b3c";
            } 

            if(i == flapindex && IAS/1.852 > parseInt(flap_el_kts.getAttribute("data-low")) && IAS/1.852 <= parseInt(flap_el_kts.getAttribute("data-high"))) {
                flap_el_kts.style.backgroundColor = "#0d8b3c";
            }
        }
    }

    setFlapSpeeds() {
        let weightfactor = this.vars.ballast_pct.value;
        let flapspeeds_kmh = [[300,300],[148,186],[125,157],[92,117],[83,104],[74,93] ]
        let flapspeeds_kts = [[160,160],[90,100],[67,85],[50,63],[45,56],[40,50] ]
        let lastspeed_kmh = 60;
        let lastspeed_kts = 30;

        for(var i = 5; i>=0; i--) {
     
            let speed_kmh = ((flapspeeds_kmh[i][1] - flapspeeds_kmh[i][0]) / 100 * weightfactor) + flapspeeds_kmh[i][0];
            let speed_kts = ((flapspeeds_kts[i][1] - flapspeeds_kts[i][0]) / 100 * weightfactor) + flapspeeds_kts[i][0];
            
            let flap_el_kmh = document.querySelector(".speedladder.kmh .flap_" + i);
            let flap_el_kts = document.querySelector(".speedladder.kts .flap_" + i);
            flap_el_kmh.style.lineHeight = (((speed_kmh - lastspeed_kmh) * 10) - 2) + "px";
            flap_el_kts.style.lineHeight = (((speed_kts - lastspeed_kts) * 10) - 2) + "px";

            flap_el_kmh.setAttribute("data-low",lastspeed_kmh);
            flap_el_kmh.setAttribute("data-high",speed_kmh);
            flap_el_kts.setAttribute("data-low",lastspeed_kts);
            flap_el_kts.setAttribute("data-high",speed_kts);

            lastspeed_kmh = speed_kmh;
            lastspeed_kts = speed_kts;
        }

    }

    jbb_update_hawk() {
        let current_wind_direction = this.vars.wind_direction.value;

        this.jbb_avg_wind_direction = this.jbb_avg_wind_direction != null ? ((0.99 * this.jbb_avg_wind_direction) + (0.01 * current_wind_direction)) : current_wind_direction;

        let averageindicator = this.jbb_avg_wind_direction;

        if(NAVMAP.map_rotation == "trackup") {
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
        
        let color = this.vars.current_netto.value > 0 ? "#14852c" : "#cc0000";
        let radius = Math.max(15, Math.min(Math.abs(this.vars.current_netto.value) * 20, 75));
    
        if(typeof(TOPOMAP.addLayer) == "function") {
            let newdot = L.circle([position.lat, position.long], radius, {
                color: color,
                stroke: 0,
                fillColor: color,
                fillOpacity: 1,
                type: "liftdot"
            }).addTo(TOPOMAP);

            this.lift_dots.unshift( newdot );
        }


    }

    updateLiftdots() {

        for(let i = 0; i < this.lift_dots.length; i++) {
            this.lift_dots[i].setStyle({
                fillOpacity: (40-i)/40
            })

            if(i > this.lift_dots_max) {
                TOPOMAP.removeLayer(this.lift_dots[i]);
                this.lift_dots.pop();
            }

            if(!this.showLiftdots) { TOPOMAP.removeLayer(this.lift_dots[i]); }
        }
        
        // Dot Trail deactivated, clear Dot-Array
        if(!this.showLiftdots) { this.lift_dots = []; }
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

        
    update_task_page() {
        if(!this.taskpage_built) { this.build_taskpage(); return; }
	
	    let taskheader = document.querySelector("#tasklist header");    
	    
        if(!B21_SOARING_ENGINE.task_finished()) {
            taskheader.querySelector(".task-state .task-timer .number").innerHTML = this.displayValue(B21_SOARING_ENGINE.task_time_s(),"s","time_of_day");
            this.vars.tasktime.value = B21_SOARING_ENGINE.task_time_s();
        } else {
            taskheader.querySelector(".task-state .task-timer .number").innerHTML = this.displayValue(B21_SOARING_ENGINE.task.finish_time_s - B21_SOARING_ENGINE.task.start_time_s,"s","time_of_day");
            taskheader.querySelector(".task-state .task-average .number").innerHTML = this.displayValue(B21_SOARING_ENGINE.finish_speed_ms(),"ms","speed");
            taskheader.querySelector(".task-state .task-average .unit").innerHTML = this.units.speed.pref;
            
            this.vars.tasktime.value = B21_SOARING_ENGINE.task.finish_time_s - B21_SOARING_ENGINE.task.start_time_s;
            
        }

        /* Cheat-Warnings */
        if (this.SIM_TIME_PAUSED || this.SIM_TIME_SLEWED || this.SIM_TIME_NEGATIVE || this.SIM_TIME_ENGINE) {
            let alert_msg = this.SIM_TIME_PAUSED ? "+PAUSED " : "";
            alert_msg += this.SIM_TIME_SLEWED ? "+SLEWED " : "";
            alert_msg += this.SIM_TIME_NEGATIVE ? "+TIME_SLIDE " : "";
            alert_msg += this.SIM_TIME_ENGINE ? "+MOTOR" : "";
		
	        document.querySelector(".task-alerts").innerHTML = alert_msg;
	        document.querySelector(".task-alerts").style.display = "block";    
        }
        
        if(UI.pagepos_x != 2) { return; }

        taskheader.querySelector(".task-state .task-totaldistance .number").innerHTML = this.displayValue(B21_SOARING_ENGINE.task.distance_m(),"m","dist");
        taskheader.querySelector(".task-state .task-totaldistance .unit").innerHTML = this.units.dist.pref;
	    taskheader.querySelector(".task-state .task-distanceleft .number").innerHTML = this.displayValue(B21_SOARING_ENGINE.task.remaining_distance_m(),"m","dist");;
        taskheader.querySelector(".task-state .task-distanceleft .unit").innerHTML = this.units.dist.pref;        
        taskheader.querySelector(".task-state .task-arrivalheight .number").innerHTML = this.displayValue(B21_SOARING_ENGINE.task.finish_wp().arrival_height_msl_m - B21_SOARING_ENGINE.task.finish_wp().alt_m - (B21_SOARING_ENGINE.task.finish_wp().min_alt_m != null? B21_SOARING_ENGINE.task.finish_wp().min_alt_m : 0),"m","alt"); 
        taskheader.querySelector(".task-state .task-arrivalheight .unit").innerHTML = this.units.alt.pref;

        if(B21_SOARING_ENGINE.task.finish_wp().arrival_height_msl_m - B21_SOARING_ENGINE.task.finish_wp().alt_m > 0) {
            taskheader.querySelector(".task-state .task-arrivalheight").classList.add("finishalt_ok");
        } else {
            taskheader.querySelector(".task-state .task-arrivalheight").classList.remove("finishalt_ok");
        }   
	    
        if(B21_SOARING_ENGINE.task_started()) {
            document.getElementById("tasklist").setAttribute("class","task_started hasScrollbars");
        } 
        
        if (B21_SOARING_ENGINE.task_finished()) {
            document.getElementById("tasklist").setAttribute("class","task_finished hasScrollbars");
        }

        for (let wp_index=0; wp_index<B21_SOARING_ENGINE.task_length(); wp_index++) {
            let wp_el = document.getElementById("wp_" + wp_index);
            let wp = B21_SOARING_ENGINE.task.waypoints[wp_index];

            if (wp_index == B21_SOARING_ENGINE.task_index()) {
                wp_el.classList.add("iscurrentwp")
            } else {
                wp_el.classList.remove("iscurrentwp")
            }

            if(wp_index >= B21_SOARING_ENGINE.task.start_index && wp_index <= B21_SOARING_ENGINE.task.finish_index) {
                if (wp.leg_is_completed) {
                    wp_el.classList.add("wp-ok");
                    document.getElementById("tasklist").appendChild(wp_el);
                }
            
                wp_el.querySelector(".wp-name").innerHTML = wp.name + " (" + this.displayValue(wp.alt_m, "m", "alt") + this.units.alt.pref + ")"; 
                wp_el.querySelector(".bearing .number").innerHTML = wp.leg_bearing_deg.toFixed(0);
                
                if(wp_index == B21_SOARING_ENGINE.task_index()) {
                    wp_el.querySelector(".dist .number").innerHTML = this.displayValue(B21_SOARING_ENGINE.current_wp().distance_m, "m", "dist");
                } else {
                    wp_el.querySelector(".dist .number").innerHTML = this.displayValue(wp.leg_distance_m, "m", "dist");
                }
                
                wp_el.querySelector(".dist .unit").innerHTML = this.units.dist.pref;
                wp_el.querySelector(".ete .number").innerHTML = (wp.ete_s / 60).toFixed(0);
                wp_el.querySelector(".ete .unit").innerHTML = "min";
                wp_el.querySelector(".wind .number").innerHTML = this.displayValue(wp.tailwind_ms, "ms", "windspeed");
                wp_el.querySelector(".wind .unit").innerHTML = this.units.windspeed.pref;
                wp_el.querySelector(".arr_msl .number").innerHTML = this.displayValue(wp.arrival_height_msl_m, "m", "alt");
                wp_el.querySelector(".arr_msl .unit").innerHTML = this.units.alt.pref;
		        wp_el.querySelector(".arr_agl .number").innerHTML = this.displayValue(wp.arrival_height_msl_m - wp.alt_m - (wp.min_alt_m != null? wp.min_alt_m : 0), "m", "alt");
                wp_el.querySelector(".arr_agl .unit").innerHTML = this.units.alt.pref;    

		        if( wp.arrival_height_msl_m - wp.alt_m - (wp.min_alt_m != null? wp.min_alt_m : 0) < 0 ) { 
                    wp_el.querySelector(".arr_agl").classList.add("alert") 
                } else { 
                    wp_el.querySelector(".arr_agl").classList.remove("alert")
                }   
		    
                if(wp.min_alt_m != null) {
                    wp_el.querySelector(".wp-min").innerHTML = "Min: " + this.displayValue(wp.min_alt_m, "m", "alt") +  this.units.alt.pref;
                        
                    if( wp.arrival_height_msl_m < wp.min_alt_m ) { 
                        wp_el.querySelector(".arr_msl").classList.add("alert");
                        wp_el.querySelector(".wp-min").classList.add("alert");
                    } else { 
                        wp_el.querySelector(".arr_msl").classList.remove("alert");	
                        wp_el.querySelector(".wp-min").classList.remove("alert");
                    }
                }
		
                if(wp.max_alt_m != null) {
                    wp_el.querySelector(".wp-max").innerHTML = "Max: " + this.displayValue(wp.max_alt_m, "m", "alt") +  this.units.alt.pref;
                        
                    if( wp.arrival_height_msl_m > wp.max_alt_m ) { 
                        wp_el.querySelector(".arr_msl").classList.add("alert");
                        wp_el.querySelector(".wp-max").classList.add("alert");
                    } else { 
                        wp_el.querySelector(".arr_msl").classList.remove("alert")
                        wp_el.querySelector(".wp-max").classList.remove("alert");
                    }
                }	    

            } else {
                wp_el.style.display = "none";
            } 
        }        
    }

    build_taskpage() {
        let template = document.getElementById("wp-template");
        let templateContent = template.innerHTML;
        let check = 1;
        
        for (let wp_index=0; wp_index<B21_SOARING_ENGINE.task_length(); wp_index++) {
            let wp_el = template.cloneNode();
            wp_el.innerHTML = templateContent;
            wp_el.setAttribute("id","wp_" + wp_index);
		
		wp_el.querySelector(".wp-link").addEventListener("click", (e)=> {
			e.target.parentNode.classList.toggle("expanded");
		})
		
            document.getElementById("tasklist").appendChild(wp_el);
            check++;
        }
        console.log("Task page built. Number of WP: " + check);
        this.taskpage_built = true;
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

    get_position() {
        return new LatLong(SimVar.GetSimVarValue("A:PLANE LATITUDE", "degrees latitude"),
            SimVar.GetSimVarValue("A:PLANE LONGITUDE", "degrees longitude"));
    }

    task_active() {
        return false;
    }



    /****************************************************************************************/

    // Task Management by B21 Soaring Engine  //


    engine_event_callback(event_name, args) {
        console.log("Soaring engine event "+event_name, args);
        let WP = args["wp"];

        switch (event_name) {
            case "TASK_WP_CHANGE":
                // this.update_task_page(); // { wp }
                NAVMAP.updateTaskline();
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
                console.log("engine event unrecognized "+event_name, args);

        }
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

    engine_task_wp_change(args) {

    }

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


    global_power() {
        this.power_switched = false;
	    const new_power_status = SimVar.GetSimVarValue("ELECTRICAL MASTER BATTERY", "boolean") != 0 ? true : false;
        if (typeof this.power_status === "undefined" ) {
            this.power_switched = true;
        } else if (new_power_status && !this.power_status) {
            this.power_switched = true;
        } else if (!new_power_status && this.power_status) {
            this.power_switched = true;
        }
        this.power_status = new_power_status;
    }

}


registerInstrument("lxn-nav", lxn);

