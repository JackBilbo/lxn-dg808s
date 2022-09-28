"use strict"

//DEBUG implement thermals view auto-switch

// VARS USED FROM Instrument
//        this.instrument.MS_TO_KNOTS
//
//        this.instrument.speed_units
//        this.instrument.climb_units
//
//        this.instrument.SIM_TIME_S
//        this.instrument.NETTO_MS
//        this.instrument.TE_MS
//        this.instrument.MACCREADY_MS
//
// PLANE
//        this.instrument.PLANE_HEADING_DEG
//        this.instrument.AIRSPEED_MS
//        this.instrument.ALTITUDE_M
//        this.instrument.PLANE_POSITION
//
//DEBUG handle low wind speed
// WIND
//        this.instrument.WIND_DIRECTION_DEG
//        this.instrument.WIND_SPEED_MS
//
//        this.instrument.WP_BEARING_DEG    // True bearing to next waypoint

//DEBUG link up to maccready adjusts
//DEBUG smooth 5-min TE GRAPH
//DEBUG handle pause properly (graph)
//DEBUG provide cruise/climb indicator (circular arrow?)
//DEBUG thicken course line

class ThermallingDisplay {
    constructor(instrument) {

        // Create reference to parent instrument that will provide the display div
        this.instrument = instrument;

    }

    thermals_init() {
        if (this.thermals_init_completed==null) {
            this.thermals_init_completed = true;
            console.log("thermals init");

            // Main panel (blobs, course direction)
            // THERMALS_UPDATE_PERIOD_S is the higher frequency update for the main thermal blobs display
            this.THERMALS_UPDATE_PERIOD_S = 0.07;
            // THERMALS_NEW_PERIOD_S is the time period between drawning new blobs, and updating number values.
            this.THERMALS_NEW_PERIOD_S = 3;
            this.THERMALS_MAX_BLOBS = 60; // max # of thermal blobs on main display
            this.THERMALS_MAIN_SCALE = 0.3; // pixels per meter

            this.THERMALS_SMOOTH_TIME_CONSTANT_S = 3; // smooth the TE and NETTO values over 3 seconds

            // Graph (bottom right) coordinates
            this.THERMALS_GRAPH_DURATION_S = 300; // width of graph area in seconds (5 mins)
            this.THERMALS_GRAPH_ORIGIN_T = 0
            this.THERMALS_GRAPH_ORIGIN_X = 433; // Set svg 0,0 point for graph
            this.THERMALS_GRAPH_ORIGIN_Y = 150;
            this.THERMALS_GRAPH_SCALE_X = 433 / this.THERMALS_GRAPH_DURATION_S; // pixels per s (5 min = 150px)
            this.THERMALS_GRAPH_SCALE_Y = -200 / 5; // pixels per ms (5 ms = 80px)

            // Bars (bottom left) coordinates
            this.THERMALS_BARS_DURATION_S = 2400; // width of bars area in seconds (40 mins)
            this.THERMALS_BARS_ORIGIN_T = 0;
            this.THERMALS_BARS_ORIGIN_X = 0; // Set svg 0,0 point for bars
            this.THERMALS_BARS_ORIGIN_Y = 150;
            this.THERMALS_BARS_SCALE_X = 433 / this.THERMALS_BARS_DURATION_S; // pixels per s (40 min = 315px)
            this.THERMALS_BARS_SCALE_Y = -200 / 5; // pixels per ms (5 ms = 80px)

            // Blobs - these are the red/green circles drawn on the thermalling display
            this.THERMALS_BLOBS_MIN_PX = 10;  // ensure all blobs have min radius 3px
            this.THERMALS_BLOBS_MAX_PX = 90; // cap blobs to max radius 25px
            this.THERMALS_BLOBS_SCALE_PX = 12; // pixel radius per m/s climb/sink

            // Wind - the wind arrow top left of thermalling display
            this.thermals_wind_line_el = document.getElementById("thermalling_display_wind_line");
            this.thermals_wind_speed_el = document.getElementById("thermalling_display_wind_speed");
            this.thermals_wind_units_el = document.getElementById("thermalling_display_wind_units");

            // Climb - the current climb average middle left of thermalling display
            this.thermals_climb_el = document.getElementById("thermalling_display_l_top_value");

            // Tru Avg - the TRUE average (i.e. timed climb since circling started, with adjustment for start/current airspeed)
            this.thermals_tru_avg_el = document.getElementById("thermalling_display_l_middle_value");

            // Maccready
            this.thermals_mc_value_el = document.getElementById("thermalling_display_l_bottom_value");
            this.thermals_mc_units_el = document.getElementById("thermalling_display_l_bottom_units");

            // Main
            this.thermals_glider_svg_el = document.getElementById("thermalling_display_glider_svg");
            this.thermals_blobs_svg_el = document.getElementById("thermalling_display_blobs_svg");
            this.thermals_wp_bearing_svg_el = document.getElementById("thermalling_display_wp_bearing");

            // Set  x/y position of glider icon
            let main_svg_rect = this.thermals_blobs_svg_el.getBoundingClientRect();
            this.MAIN_WIDTH = this.thermals_blobs_svg_el.width.baseVal.value;
            this.MAIN_HEIGHT = this.thermals_blobs_svg_el.height.baseVal.value;
            this.thermals_plane_xy = {
                "x": this.MAIN_WIDTH / 2,
                "y": this.MAIN_HEIGHT / 2
            };
            console.log("plane xy", this.thermals_plane_xy);

            this.thermals_blobs = [];

            // Bottom
            this.thermals_mc_line_el = document.getElementById("thermalling_display_bottom_mc"); //SVG g
            this.thermals_graph_svg_el = document.getElementById("thermalling_display_graph_svg"); // SVG path for setAttribute("d",...)
            this.thermals_bars_svg_el = document.getElementById("thermalling_display_bars_svg"); // SVG path for setAttribute("d",...)
            this.thermals_graph_history = [];
            this.thermals_bars_history = [];

            // local smoothed values for TE and NETTO
            this.thermals_smooth_te_ms = 0;
            this.thermals_smooth_netto_ms = 0;
            
        }
    }

    // Called from this.instrument.Update()
    update() {
        this.instrument.climb_units = this.instrument.units.verticalspeed.pref;
        let isDisplayed = (UI.pagepos_x == 1 && UI.pagepos_y == 1);

        this.thermals_init();

        this.thermals_smooth_te_netto();

        if (this.thermals_update_prev_time_s == null) {
            this.thermals_update_prev_time_s = this.instrument.SIM_TIME_S;
        }
        // THERMALS_UPDATE_PERIOD_S is the higher frequency update for the main thermal blobs display
        // THERMALS_NEW_PERIOD_S is the time period between drawning new blobs, and updating number values.
        if (this.instrument.SIM_TIME_S - this.thermals_update_prev_time_s > this.THERMALS_UPDATE_PERIOD_S && isDisplayed) {
            this.thermals_update_prev_time_s = this.instrument.SIM_TIME_S;

            this.thermals_update_main();
            this.thermals_update_mc();
        }

        if (this.thermals_new_prev_time_s == null) {
            this.thermals_new_prev_time_s = this.instrument.SIM_TIME_S;
        }
        let new_time_delta_s = this.instrument.SIM_TIME_S - this.thermals_new_prev_time_s;
        if (new_time_delta_s > this.THERMALS_NEW_PERIOD_S || new_time_delta_s < 0) {
            this.thermals_new_prev_time_s = this.instrument.SIM_TIME_S;

            if(isDisplayed) {
                this.thermals_add_blob({
                    "lat": this.instrument.PLANE_POSITION.lat,
                    "long": this.instrument.PLANE_POSITION.long
                }, this.thermals_smooth_netto_ms);
            
                this.thermals_update_wind();
                this.thermals_update_bottom();
            }           

            this.thermals_update_climb();
            this.thermals_update_tru_avg(); 
        }
    }

    show() {
        let el = document.getElementById("thermalling_display");
        if (el!=null) {
            el.style.display = "block";
        }
    }

    hide() {
        let el = document.getElementById("thermalling_display");
        if (el!=null) {
            el.style.display = "none";
        }
    }

    thermals_smooth_te_netto() {
        if (this.thermals_smooth_prev_time_s==null) {
            console.log("thermalling_display init thermals_smooth_prev_time_s");
            this.thermals_smooth_prev_time_s = this.instrument.SIM_TIME_S;
            return;
        }

        let delta_s = this.instrument.SIM_TIME_S - this.thermals_smooth_prev_time_s;
        this.thermals_smooth_prev_time_s = this.instrument.SIM_TIME_S;
        if (delta_s <= 0) {
            console.log("thermalling_display negative delta_s", delta_s, this.instrument.TE_MS);
            return;
        }
        let smooth_adj = delta_s / this.THERMALS_SMOOTH_TIME_CONSTANT_S;
        this.thermals_smooth_te_ms = this.thermals_smooth_te_ms * (1-smooth_adj) + this.instrument.TE_MS * smooth_adj;
        this.thermals_smooth_netto_ms = this.thermals_smooth_netto_ms * (1-smooth_adj) + this.instrument.NETTO_MS * smooth_adj;
        
    }

    thermals_update_main() {
        // Rotate the glider icon to correct heading
        this.thermals_update_glider();
        this.thermals_update_blobs();
        this.thermals_update_wp_bearing();
    }

    thermals_update_glider() {
        this.thermals_glider_svg_el.setAttribute("transform", "rotate(" + this.instrument.PLANE_HEADING_DEG.toFixed(1) + ",300,300)");
    }

    thermals_update_blobs() {
        //this.thermals_blobs_svg_el.innerHTML = "";
        for (let i = 0; i < this.thermals_blobs.length; i++) {
            let blob = this.thermals_blobs[i];
            //console.log("update blob", i, blob.latlong);
            let xy = this.latlong_to_xy(blob.latlong);
            blob.el.setAttribute("cx", "" + xy.x);
            blob.el.setAttribute("cy", "" + xy.y);
            //console.log("update blob", i, blob.latlong, " moved to ", xy);
        }
    }

    // Create a new lift blob and add to this.thermals_blobs, and update all previous blobs e.g. opacity.
    // each blob is { latlong: , el }
    thermals_add_blob(latlong, strength) {
        let xy = this.latlong_to_xy(latlong);
        //console.log("thermal_add xy = ", xy);
        let thermal_el = document.createElementNS('http://www.w3.org/2000/svg', 'circle');
        thermal_el.setAttribute("cx", "" + xy.x);
        thermal_el.setAttribute("cy", "" + xy.y);
        let thermal_radius_px = Math.max(this.THERMALS_BLOBS_MIN_PX,Math.min(this.THERMALS_BLOBS_MAX_PX, Math.abs(strength) * this.THERMALS_BLOBS_SCALE_PX));
        thermal_el.setAttribute("r", thermal_radius_px);
        thermal_el.setAttribute("fill", strength <
            0 ? "red" : "green");
        this.thermals_blobs_svg_el.appendChild(thermal_el);
        this.thermals_blobs.push({
            "latlong": latlong,
            "el": thermal_el,
            "time_s": this.instrument.SIM_TIME_S
        });
        // Truncate blobs list to max length
        while (this.thermals_blobs.length > this.THERMALS_MAX_BLOBS) {
            this.thermals_blobs_svg_el.removeChild(this.thermals_blobs[0].el);
            this.thermals_blobs.shift();
        }
        // Update opacity for all blobs so they fade with time
        for (let i = 0; i < this.thermals_blobs.length - 1; i++) {
            let blob = this.thermals_blobs[i];
            this.thermals_blob_update(blob,i);
            //console.log("update blob", i, blob.latlong, " moved to ", xy);
        }
        //console.log("added thermal");
    }

    thermals_blob_update(blob, i) {
        let blob_age_s = this.instrument.SIM_TIME_S - blob.time_s;
        let opacity = Math.min(1,Math.max(0.3, (60 - blob_age_s) / 40));
        blob.el.setAttribute("opacity", opacity.toFixed(2));
    }

    // Given position {lat, long} return {x,y} px
    // this.THERMALS_MAIN_SCALE is pixels per meter
    latlong_to_xy(latlong) {
        //console.log("latlong to xy from ", latlong, "plane:", this.instrument.PLANE_POSITION);
        let lng_diff = latlong.long - this.instrument.PLANE_POSITION.long;
        let meters_x = Geo.get_distance_m(this.instrument.PLANE_POSITION, {
            "lat": this.instrument.PLANE_POSITION.lat,
            "long": latlong.long
        }) * (lng_diff < 0 ? -1 : 1);
        let lat_diff = latlong.lat - this.instrument.PLANE_POSITION.lat;
        let meters_y = Geo.get_distance_m(this.instrument.PLANE_POSITION, {
            "lat": latlong.lat,
            "long": this.instrument.PLANE_POSITION.long
        }) * (lat_diff < 0 ? -1 : 1);
        //console.log("meters x,y = ", meters_x, meters_y);
        return {
            "x": this.thermals_plane_xy.x + meters_x * this.THERMALS_MAIN_SCALE,
            "y": this.thermals_plane_xy.y - meters_y * this.THERMALS_MAIN_SCALE
        };
    }

    thermals_update_wp_bearing() {
        if (this.instrument.WP_BEARING_DEG != null) {
            //DEBUG use class vars for  main width/height
            this.thermals_wp_bearing_svg_el.setAttribute(
                "transform",
                "rotate(" + this.instrument.WP_BEARING_DEG.toFixed(0) + "," +
                    (this.MAIN_WIDTH/2).toFixed(0) +"," +
                    (this.MAIN_HEIGHT/2).toFixed(0)+ ")");
        }
    }

    // ******************************************
    // ** Left panel numbers               ******
    // ******************************************

    thermals_update_wind() {
        // Speed (only if display value changed)
        // let speed_str = (this.instrument.WIND_SPEED_MS * (this.instrument.speed_units == "kph" ? 3.6 : this.instrument.MS_TO_KNOTS)).toFixed(0);
        // if (this.thermals_speed_str_prev == null || this.thermals_speed_str_prev != speed_str) {
        //    this.thermals_speed_str_prev = speed_str;
        //    this.thermals_wind_speed_el.innerHTML = (this.instrument.WIND_SPEED_MS * (this.instrument.speed_units == "kph" ? 3.6 : this.instrument.MS_TO_KNOTS))
        //        .toFixed(
        //            0);
        // }


        // Direction arrow
        this.thermals_wind_line_el.setAttribute("transform", "rotate(" + this.instrument.WIND_DIRECTION_DEG.toFixed(1) + ",50,50)");
        if (this.instrument.WIND_DIRECTION_DEG > 270 && this.instrument.WIND_DIRECTION_DEG < 360 || this.instrument.WIND_DIRECTION_DEG > 90 && this.instrument.WIND_DIRECTION_DEG < 180) {
            this.thermals_wind_speed_el.style.textAlign = "right";
        } else {
            this.thermals_wind_speed_el.style.textAlign = "left";
        }
        // Units (only update if changed)
        if (this.thermals_wind_units_prev == null || this.thermals_wind_units_prev != this.instrument.speed_units) {
            this.thermals_wind_units_prev = this.instrument.speed_units;
            this.thermals_wind_units_el.innerHTML = this.instrument.units.windspeed.pref;
        }

    }

    thermals_update_climb() {
        let climb_value = this.thermals_smooth_te_ms / (this.instrument.units.pref == "ms" ? 1 : 0.51444);
        let climb_str = climb_value.toFixed(1);
        this.thermals_climb_el.className = climb_value <= -10 || climb_value >= 10 ? "thermalling_display_l_value_small" : "thermalling_display_l_value";
        this.thermals_climb_el.innerHTML = climb_str;
        this.thermals_graph_history.push({
            "time_s": this.instrument.SIM_TIME_S,
            "ms": this.thermals_smooth_te_ms
        });
    }

    thermals_update_tru_avg() {
        // These numbers are used to calculate average turn rate in degrees/second
        if (this.thermals_tru_avg_time_prev == null) {
            this.thermals_tru_avg_time_prev = this.instrument.SIM_TIME_S; // note current time, this also ensures block only runs once on startup.
            this.thermals_tru_avg_turn_rate = 0; // We will accumulate turn rate to decide when thermalling
            this.thermals_tru_avg_heading_prev = this.instrument.PLANE_HEADING_DEG;
            this.thermals_thermalling_mode = false; // We will count climb avg while in 'thermallling_mode'
            this.thermals_thermalling_mode_prev = false;
            this.thermals_entry_alt_m = 0; // Thermal entry altitude
            this.thermals_entry_airspeed_ms = 0; // Thermal entry airspeed (for TE entry/exit adjust)
        }
        let time_delta_s = this.instrument.SIM_TIME_S - this.thermals_tru_avg_time_prev;
        this.thermals_tru_avg_time_prev = this.instrument.SIM_TIME_S;
        let turn_delta_deg = Math.abs(this.instrument.PLANE_HEADING_DEG - this.thermals_tru_avg_heading_prev);
        if (turn_delta_deg > 180) {
            turn_delta_deg = 360 - turn_delta_deg;
        }
        this.thermals_tru_avg_heading_prev = this.instrument.PLANE_HEADING_DEG;
        const TURN_RATE_AVG_PERIOD_S = 6; // Rolling average time constant
        let avg_const = Math.min(1, time_delta_s / TURN_RATE_AVG_PERIOD_S);
        // Calculate turn rate rolling avg with 6s time constant
        this.thermals_tru_avg_turn_rate = this.thermals_tru_avg_turn_rate * (1 - avg_const) + turn_delta_deg * avg_const;
        // Here we have calculated the average turn rate. 18 degrees/sec = tight thermal (20 second turn).

        // Decide if we are currently thermalling or not.
        const THERMALLING_TURN_RATE = 7; // 'Thermalling' is if avg turn rate is > 7 degrees/sec
        if (this.thermals_tru_avg_turn_rate > THERMALLING_TURN_RATE) {
            this.thermals_thermalling_mode = true;
        } else {
            this.thermals_thermalling_mode = false;
        }

        // Are we entering/leaving thermal?
        if (this.thermals_thermalling_mode && !this.thermals_thermalling_mode_prev) {
            // We are entering thermal
            this.thermals_thermalling_mode_prev = true;

            this.thermals_entry_alt_m = this.instrument.ALTITUDE_M; // Thermal entry altitude
            this.thermals_entry_airspeed_ms = this.instrument.AIRSPEED_MS; // Thermal entry airspeed (for TE entry/exit adjust)
            this.thermals_entry_time_s = this.instrument.SIM_TIME_S; // Thermal entry time

            this.thermals_bars_history.push({
                "entry_time_s": this.instrument.SIM_TIME_S,
                "tru_avg_ms": 0
            });

            console.log("Thermal entry at " + this.thermals_entry_alt_m.toFixed(0) + "m, " + this.thermals_entry_airspeed_ms.toFixed(
                1) + "m/s")

        } else if (!this.thermals_thermalling_mode && this.thermals_thermalling_mode_prev) {
            // We are leaving thermal
            this.thermals_thermalling_mode_prev = false;

            let thermalling_duration = this.instrument.SIM_TIME_S - this.thermals_entry_time_s;
            if (thermalling_duration > 25) {
                // Update tru avg for latest bar in history
                this.thermals_bars_history[this.thermals_bars_history.length - 1].exit_time_s = this.instrument.SIM_TIME_S;

                console.log("Thermal exit at " + this.instrument.ALTITUDE_M.toFixed(0) + "m, " + this.instrument.AIRSPEED_MS.toFixed(1) +
                    "m/s for " + thermalling_duration.toFixed(0) + "s");

                if(CONFIGPANEL.autoMC) { this.thermals_calc_autoMC(); }   

            } else {
                // Short thermal
                this.thermals_bars_history.pop(); // Discard this thermal record
                console.log("Thermal exit at " + this.instrument.ALTITUDE_M.toFixed(0) + "m, " + this.instrument.AIRSPEED_MS.toFixed(1) +
                    "m/s for " + thermalling_duration.toFixed(0) + "s -- SHORT THERMAL");
            }
        }

        if (this.thermals_thermalling_mode) {
            this.thermals_calc_tru_avg();
        }
        //console.log("TRU AVG",time_delta_s,turn_delta_deg.toFixed(0),this.thermals_tru_avg_turn_rate.toFixed(0));
    }

    thermals_calc_tru_avg() {

        let exit_alt_m = this.instrument.ALTITUDE_M; // Thermal exit altitude
        let exit_airspeed_ms = this.instrument.AIRSPEED_MS; // Thermal exit airspeed (for TE entry/exit adjust)
        let exit_time_s = this.instrument.SIM_TIME_S; // Thermal exit time
        let thermalling_time_s = exit_time_s - this.thermals_entry_time_s;
        if (thermalling_time_s == 0) return; // No tru avg when first enter thermal

        // Calculate alt gain due to entry/exit speed difference (to discount that)
        let alt_gain_speed_m = (Math.pow(exit_airspeed_ms, 2) - Math.pow(this.thermals_entry_airspeed_ms, 2)) / 2 / 9.81;
        let te_gain_m = exit_alt_m - this.thermals_entry_alt_m + alt_gain_speed_m;
        this.thermals_tru_avg_ms = te_gain_m / thermalling_time_s;

        this.instrument.vars.ltherm_gain.value = te_gain_m / 0.3048;
        this.instrument.vars.ltherm_avg.value = this.thermals_tru_avg_ms / 0.51444;

        let avg_value = this.thermals_tru_avg_ms / (this.instrument.units.verticalspeed.pref == "ms" ? 1 : 0.51444) ;
        let avg_str = avg_value.toFixed(1);
        this.thermals_tru_avg_el.className = avg_value <= -10 || avg_value >= 10 ? "thermalling_display_l_value_small" : "thermalling_display_l_value";
        this.thermals_tru_avg_el.innerHTML = avg_str;

        // Update tru avg for latest bar in history
        this.thermals_bars_history[this.thermals_bars_history.length - 1].tru_avg_ms = this.thermals_tru_avg_ms;

    }

    thermals_calc_autoMC() {
        let lastavg = this.thermals_tru_avg_ms / 0.51444;
        this.instrument.vars.mccready.value = this.instrument.vars.mccready.value + (( lastavg - this.instrument.vars.mccready.value) / 2);
        this.instrument.vars.mccready.value = this.instrument.vars.mccready.value >= 0 ? this.instrument.vars.mccready.value : 0;
    }

    // Update the Maccready value displayed in left box, and the "MC" line on the bottom chart
    thermals_update_mc() {
        let mc_str = (this.instrument.MACCREADY_MS * (this.instrument.climb_units == "ms" ? 1 : this.instrument.MS_TO_KNOTS)).toFixed(1);
        // MC value (only update if changed)
        if (this.thermals_mc_str_prev == null || this.thermals_mc_str_prev != mc_str) {
           this.thermals_mc_str_prev = mc_str;
        //    this.thermals_mc_value_el.innerHTML = mc_str;
           this.thermals_update_bottom_mc();
        }
        // Units (only update if changed)
        if (this.thermals_mc_units_prev == null || this.thermals_mc_units_prev != this.instrument.climb_units) {
            this.thermals_mc_units_prev = this.instrument.climb_units;
            this.thermals_mc_units_el.innerHTML = this.instrument.units.verticalspeed.pref;
        }
    }

    // initialize the bottom chart area (runs once on startup)
    thermals_init_bottom() {
        if (this.thermals_init_bottom_completed == null) {
            this.thermals_history = []; // We will accumulate list of thermals during flight, for bottom display
            //this.thermals_graph_history = [];              // time_s,ms datapoints for bottom graph

            this.thermals_init_bottom_completed = true;
        }
    }

    // Update the bottom chart area
    thermals_update_bottom() {
        this.thermals_init_bottom();

        this.thermals_update_graph();
        this.thermals_update_bars();
    }

    // BARS CHART
    thermals_bars_t_to_x(t) {
        return this.THERMALS_BARS_ORIGIN_X + (t - this.THERMALS_BARS_ORIGIN_T) * this.THERMALS_BARS_SCALE_X;
    }

    thermals_bars_ms_to_y(ms) {
        return this.THERMALS_BARS_ORIGIN_Y + ms * this.THERMALS_BARS_SCALE_Y; // Note Y scale is negative (svg)
    }

    thermals_update_bars() {
        this.THERMALS_BARS_ORIGIN_T = this.instrument.SIM_TIME_S - this.THERMALS_BARS_DURATION_S;
        while (this.thermals_bars_history.length > 0 && this.thermals_bars_history[0].time_s < this.THERMALS_BARS_ORIGIN_T) {
            this.thermals_bars_history.shift();
        }
        let path = "M" + this.THERMALS_BARS_ORIGIN_X + "," + this.THERMALS_BARS_ORIGIN_Y;
        for (let i = 0; i < this.thermals_bars_history.length; i++) {
            let bar = this.thermals_bars_history[i];
            let x = (this.thermals_bars_t_to_x(bar.entry_time_s)).toFixed(0);
            let y0 = (this.thermals_bars_ms_to_y(0)).toFixed(0);
            path += " L" + x + "," + y0;
            let y1 = (this.thermals_bars_ms_to_y(bar.tru_avg_ms)).toFixed(0);
            path += " L" + x + "," + y1;
            let time_s = bar.exit_time_s == null ? this.instrument.SIM_TIME_S : bar.exit_time_s;
            x = (this.thermals_bars_t_to_x(time_s)).toFixed(0);
            path += " L" + x + "," + y1;
            path += " L" + x + "," + y0;
        }
        path += "z";
        this.thermals_bars_svg_el.setAttribute("d", path)
    }

    thermals_graph_t_to_x(t) {
        return this.THERMALS_GRAPH_ORIGIN_X + (t - this.THERMALS_GRAPH_ORIGIN_T) * this.THERMALS_GRAPH_SCALE_X;
    }

    thermals_graph_ms_to_y(ms) {
        return this.THERMALS_GRAPH_ORIGIN_Y + ms * this.THERMALS_GRAPH_SCALE_Y; // Note Y scale is negative (svg)
    }

    thermals_update_graph() {
        this.THERMALS_GRAPH_ORIGIN_T = this.instrument.SIM_TIME_S - this.THERMALS_GRAPH_DURATION_S;
        while (this.thermals_graph_history.length > 0 && this.thermals_graph_history[0].time_s < this.THERMALS_GRAPH_ORIGIN_T) {
            this.thermals_graph_history.shift();
        }
        let path = "M"; //"M" + this.THERMALS_GRAPH_ORIGIN_X + "," + this.THERMALS_GRAPH_ORIGIN_Y;
        for (let i = 0; i < this.thermals_graph_history.length; i++) {
            let point = this.thermals_graph_history[i];
            let x = (this.thermals_graph_t_to_x(point.time_s)).toFixed(0);
            let y = (this.thermals_graph_ms_to_y(point.ms)).toFixed(0);
            path += (path == "M" ? "" : " L") + x + "," + y;
        }
        this.thermals_graph_svg_el.setAttribute("d", path)
    }

    // Update the horizontal line showing the Maccready setting in the bottom area
    thermals_update_bottom_mc() {
        console.log("update bottom mc", this.instrument.MACCREADY_MS.toFixed(1));
        let line_offset = this.thermals_graph_ms_to_y(this.instrument.MACCREADY_MS);
        this.thermals_mc_line_el.setAttribute("transform", "translate(0," + line_offset.toFixed(0) + ")");
    }

}
