// b21_soaring_engine

var b21_soaring_engine_version = "1.13";

/*
    Local vars:
    "Z:B21_TE_MS"                               - READ - From model .xml - vario total energy in meters per second (sink -ve)
    "Z:B21_MACCREADY_MS", "meters per second"   - READ - From lx_s100.js - Current maccready setting meters per second

    "Z:B21_NETTO_MS"                            - WRITE - netto vario reading in meters per second
    "Z:B21_STF_SPEED_0_MS","meters per second"  - WRITE - Current maccready speed for zero sink meters per second
    "Z:B21_STF_SINK_0_MS","meters per second"   - WRITE - Glider polar sink rate at current zero-sink speed-to-fly meters per second
    "Z:B21_STF_SPEED_MS","meters per second"    - WRITE - Current maccready speed
    "Z:B21_STF_CLIMB_MS", "meters per second"   - WRITE - STF climb equivalent based on airspeed - stf delta
    "Z:B21_VARIO_AVG_MS", "meters per second"   - WRITE - vario averager reading (ms)
*/

/* Client methods e.g. called by basic_nav / lx_9050

    this.task_active()  // Whether a Task is currently loaded
    this.task_length()  // number of waypoints in Task
    this.task_index()   // index of current WP in task ( == this.current_wp().index)
    this.task_started() // Pilot has successfully flown through 'start' WP
    this.task_finished() // Pilot has successfully completed all WP's to finish
    this.task_time_s()  // task time in seconds
    this.current_wp()   // WP object for current WP (or null if no Task)
    this.next_wp()      // WPP object for next WP (or null if no Task)
    this.change_wp(delta)
    this.finish_speed_ms() // task finish speed
    this.start_local_time_s() // task start time
    this.start_alt_m()  // task start height

    this.register_callback(event_name, caller_object, callback_function)
        // TASK_WP_CHANGE        { wp }     -- waypoint has changed
        // TASK_START            { wp, start_local_time_s, start_alt_m } -- success
        // TASK_START_TOO_LOW    { wp }     -- fail
        // TASK_START_TOO_HIGH   { wp }     -- fail
        // TASK_WP_COMPLETED     { wp }     -- success
        // TASK_WP_NOT_COMPLETED { wp }     -- fail: out of order
        // TASK_FINISH           { wp, finish_speed_ms, completion_time_s } -- success
        // TASK_FINISH_TOO_LOW   { wp }     -- fail
        // TASK_FINISH_TOO_HIGH  { wp }     -- fail

    // Task

    this.task.waypoints

    this.task.start_index
    this.task.start_time_s
    this.task.start_local_time_s
    this.task.start_alt_m

    this.task.finish_index
    this.task.finish_time_s
    this.task.finish_local_time_s
    this.task.finish_alt_m
    this.task.finish_speed_ms

    this.task.distance_m()
    this.task.reset_start()

    // WP
    wp.name                 - decoded name of WP
    wp.alt_m                - height of WP in meters
    wp.distance_m           - distance to WP around task
    wp.arrival_height_msl_m - predicted arrival height at WP in meters
    wp.bearing_deg          - bearing to WP in degrees true

*/

/* This file also defines classes Waypoint and Task:

    class Task {
        // From instrument, uses:
        //  this.instrument.ex
        //  this.instrument.WIND_DIRECTION_DEG
        //  this.instrument.WIND_SPEED_MS
        //  this.instrument.STF_SPEED_0_MS
        //  this.instrument.STF_SINK_0_MS
        //  this.instrument.ALTITUDE_M
        //  this.instrument.SIM_TIME_S
        //  this.instrument.LOCAL_TIME_S
    }

    class Waypoint {
        // From Task uses:
        //  this.task.instrument.ex
        //  this.task.instrument.SIM_TIME_S
        //  this.task.start_index
        //  this.task.finish_index
        //  this.task.waypoints[]
        //
    }

*/

class b21_soaring_engine_class extends BaseInstrument {

    constructor() {
        super();
        this._isConnected = false;
        this.version = b21_soaring_engine_version;
    }

    get templateID() {
            return "b21_soaring_engine_script";
        } // ID of <script> tag in b21_soaring_engine.html

    //get isInteractive() { return true;} // Allow clicks on gauge

    // ********************************************************************
    // ********** CONNECTED CALLBACK         ******************************
    // ********************************************************************
    connectedCallback() {
        super.connectedCallback();
        this._isConnected = true;

        this.ex = 0;
        try {
            this.ex = 1;

            // Add this gauge object to the global JS var "B21_SOARING_ENGINE" defined in b21_soaring_engine.html.
            // This allows other gauges in the same VCockpit to access this object directly
            B21_SOARING_ENGINE = this;

            this.TE_MS = 0;
            this.STF_SPEED_0_MS = 0;
            this.STF_SINK_0_MS = 0;

            // Nav instruments can register callbacks for these events via
            // this.register_callback(event_name, callback)
            this.event_callbacks = new Array();

            this.ex = 9;
            this.init_polar(); // Loads aircraft polar data from B21_SETTINGS.js

        } catch (e) {
            console.log("Ex.init."+this.ex, e);
            this.init_fail = true;
        }
    }

    // ********************************************************************
    // ********** DISCONNECTED CALLBACK         ***************************
    // ********************************************************************
    disconnectedCallback() {
        super.disconnectedCallback();
    }

    // ********************************************************************
    // ********** GAUGE UPDATE CALLED ON SIM UPDATE CYCLE      ************
    // ********************************************************************
    Update() {
        if (!this._isConnected || this.init_fail) { // It seems possible MSFS will call Update() before connectedCallback(), so deal with that.
            return;
        }

        this.ex = "0";
        try {
            this.ex = "ST";  this.update_sim_time();
            this.ex = "GV";  this.update_global_vars();
            this.ex = "TE";  this.update_total_energy();
            this.ex = "NET"; this.update_netto();
            this.ex = "STF"; this.update_stf();
            this.ex = "VA";  this.update_vario_avg();
            this.ex = "TL";  this.update_task_load();
            this.ex = "TA";  this.update_task();
            this.ex = "AU";  this.update_task_wp_switch(); // Auto switch WP if enabled
        } catch (e) {
            console.log("Ex.U." + this.ex, e);
        }
    }

    // ********************************************************************
    // ********** GAUGE UPDATE CALLED ON SIM UPDATE CYCLE      ************
    // ********************************************************************

    // **********************************************************************************************************************
    // **********************************************************************************************************************
    // ******* SOME UTILITY FUNCTIONS     ***********************************************************************************
    // **********************************************************************************************************************
    // **********************************************************************************************************************

    // ************************************************************
    // init_polar()
    // ************************************************************
    init_polar() {
        console.log("init_polar() with polar weight: " + B21_POLAR_WEIGHT_KG + " Kg");
        // We input polar in km/h : m/s (which will be converted to m/s : m/s)
        //
        // AS33 @ 40 kg/m^2
        this.POLAR_WEIGHT_KG = B21_POLAR_WEIGHT_KG; // weight the curves are directly valid for
        //
        //            speed km/h -> sink m/s (sink NEGATIVE)
        this.polar_curve = B21_POLAR_CURVE;

        // Speed to fly @ 40 kg/m^2  sink m/s (negative) -> speed kph
        this.stf_curve = B21_STF_CURVE;

        // Convert speeds KPH -> M/S
        for (let i = 0; i < this.polar_curve.length; i++) {
            this.polar_curve[i][0] = Geo.KPH_TO_MS(this.polar_curve[i][0]); // polar speeds in m/s
        }
        // same for STF
        for (let i = 0; i < this.stf_curve.length; i++) {
            this.stf_curve[i][1] = Geo.KPH_TO_MS(this.stf_curve[i][1]); // stf speeds in m/s
        }
    }

    // ************************************************************
    // polar_sink(airspeed m/s) returns sink m/s
    // ************************************************************
    polar_sink(airspeed_ms) {
        this.ex = "polar.1";
        // Adjust for ballast - the base formula is the polar shifts down and to the right with the ~ square root of the weight ratio
        let weight_factor = Math.pow(this.TOTAL_WEIGHT_KG / this.POLAR_WEIGHT_KG, 0.55);
        let curve_value = this.interpolate(this.polar_curve, airspeed_ms / weight_factor, "ps"); // "ps" to help debug later
        return curve_value * weight_factor;
    }

    // ************************************************************
    // stf_airspeed(sink m/s) returns airspeed m/s
    // Adjusts for this.TOTAL_WEIGHT.
    // Typical use is to call with NETTO_MS
    // ************************************************************
    stf_airspeed(sink_ms) {
        this.ex = "stf_a.1";
        const total_sink_ms = sink_ms - this.MACCREADY_MS;
        const stf_weight_factor = Math.pow(this.TOTAL_WEIGHT_KG / this.POLAR_WEIGHT_KG, 0.36);
        const curve_value = this.interpolate(this.stf_curve, total_sink_ms, "stf"); // "stf" to help debug later
        this.ex = "stf_a.9";
        return curve_value * stf_weight_factor;
    }

    // Return interpolated result for 'value' using array 'lookup_table'
    // Where 'lookup_table' is array of [ value, result ] pairs (e.g. this.polar_curve)
    interpolate(lookup_table, input_value, caller) {
        //this.ex=caller+"."+632;
        // Convenience consts for the INPUT and RESULT fields of the interpolation array entry
        const INPUT = 0;
        const RESULT = 1;
        let lookup_count = lookup_table.length;
        this.ex = caller + "." + 633;
        // Don't interpolate off the ends of the lookup table, just return the min or max result.
        if (input_value < lookup_table[0][INPUT]) {
            return lookup_table[0][RESULT];
        }
        this.ex = caller + "." + 634;
        if (input_value > lookup_table[lookup_count - 1][INPUT]) {
            return lookup_table[lookup_count - 1][RESULT];
        }
        let i = 0;
        this.ex = caller + "." + 636;
        // Iterate through 'polar_speed_ref' array until airspeed between [i-1]th and [i]th
        while (i < lookup_count && input_value > lookup_table[i][INPUT]) {
            i++;
        }
        // Check value < lowest value in lookup
        if (i == 0) {
            return lookup_table[0][RESULT];
        }
        let value_diff = lookup_table[i][INPUT] - lookup_table[i - 1][INPUT];
        let result_diff = lookup_table[i][RESULT] - lookup_table[i - 1][RESULT];
        let value_ratio = (input_value - lookup_table[i - 1][INPUT]) / value_diff;
        this.ex = caller + "." + 639
        return lookup_table[i - 1][RESULT] + result_diff * value_ratio;
    }

    // **********************************************************************************************************************
    // **********************************************************************************************************************
    // ******* SOARING FUNCTIONS         ***********************************************************************************
    // **********************************************************************************************************************
    // **********************************************************************************************************************

    // ************************************************************
    // Update 'global' values from Simvars
    // ************************************************************
    update_global_vars() {
        this.slew_mode = SimVar.GetSimVarValue("IS SLEW ACTIVE", "bool") ? true : false; // Convert number to JS boolean
        // this.pause_mode
        this.global_vars_pause(); // Set this.pause_mode:

        // We read the sim variables into local vars for efficiency if multiple use.
        this.TIME_S = SimVar.GetSimVarValue("E:ABSOLUTE TIME", "seconds");
        this.LOCAL_TIME_S = SimVar.GetSimVarValue("E:LOCAL TIME", "seconds");
        this.ELECTRICAL_MASTER_BATTERY = SimVar.GetSimVarValue("A:ELECTRICAL MASTER BATTERY", "boolean") ? true : false;
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

        // Total Energy from model.xml
        this.TE_MS = SimVar.GetSimVarValue("Z:B21_TE_MS", "number"); //te_ms;
        // Macccready setting from pilot input
        this.MACCREADY_MS = SimVar.GetSimVarValue("Z:B21_MACCREADY_MS", "meters per second");
    }

    // update this.pause_mode
    global_vars_pause() {
        // Initialize previous speed
        if (this.pause_mode_previous_speed2 == null) {
            this.pause_mode_previous_speed2 = -99;
        }
        // These VELOCITY vars freeze during pause
        let speed2 = SimVar.GetSimVarValue("VELOCITY WORLD Z", "feet per second") ** 2 +
            SimVar.GetSimVarValue("VELOCITY WORLD X", "feet per second") ** 2;

        this.pause_mode = !this.ON_GROUND && (speed2 == this.pause_mode_previous_speed2); // in air and speed EXACTLY fixed
        this.pause_mode_previous_speed2 = speed2;
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
        this.sim_time_prev_update_s = (new Date()) / 1000;
    }

    update_sim_time() {
        this.ex = "K1";
        if (this.SIM_TIME_S == null) {
            this.init_sim_time();
            return;
        }

        let update_s = (new Date()) / 1000;

        this.ex = "K2";
        // Detect SLEWED, TIME_NEGATIVE
        if (this.task_active() && this.task.started && !this.task.finished) {
            this.ex = "K21";
            if (this.SLEW_MODE) {
                this.SIM_TIME_SLEWED = true;
            }
            // Detect time adjust backwards
            this.ex = "K22";
            if (this.TIME_S < this.sim_time_prev_time_s) {
                this.SIM_TIME_NEGATIVE = true;
            }
            this.ex = "K23";
            if (this.ENGINE_RUNNING) {
                this.SIM_TIME_ENGINE = true;
            }
            this.ex = "K24";
            let delay_s = update_s - this.sim_time_prev_update_s;
            if (delay_s > 5) { // Paused for more than 5 seconds
                this.ex = "K241";
                this.SIM_TIME_PAUSED = true;
                this.sim_time_delay_s += delay_s;
            }
        }

        this.ex = "K4";
        this.sim_time_prev_time_s = this.TIME_S;
        this.SIM_TIME_S = this.TIME_S - this.sim_time_delay_s;
        this.sim_time_prev_update_s = update_s;
        this.ex = "K9";
    }


    // ************************************************************
    // We get TOTAL ENERGY from the XML BEHAVIOUR "Z:B21_TE_MS"
    // ************************************************************

    update_total_energy() {
        // Adjust for low airspeed
        if (this.ON_GROUND && this.AIRSPEED_MS < 10) { // Zero TE below 10 m/s.
            this.TE_MS = 0;
        } else if (this.AIRSPEED_MS < 20) { // Between 10..20 m/s taper in the TE
            this.TE_MS = this.TE_MS * (this.AIRSPEED_MS - 10) / 10;
        }

    }

    // **************************************************************************************************
    // Set "Z:B21_NETTO_MS, meters per second"  climb rate
    // Netto is simple the TE climb rate with the natural sink of the aircraft (from the polar) removed
    // **************************************************************************************************

    update_netto() {
        // Uses this.TE_MS
        // Uses this.AIRSPEED_MS
        // Uses this.NETTO_MS
        this.ex = 61;
        // In SLEW mode, do not update NETTO
        if (this.slew_mode || this.pause_mode) {
            return;
        }
        this.ex = 62 + ":" + this.AIRSPEED_MS;
        // Note polar_sink is NEGATIVE
        //Set the local var and SimVar
        let polar_sink_ms = this.polar_sink(this.AIRSPEED_MS);
        this.ex = 63;
        this.NETTO_MS = this.TE_MS - polar_sink_ms;
        this.ex = 64;
        //document.getElementById("b21_soaring_engine_debug").innerHTML = this.AIRSPEED_MS.toFixed(2);

        // At low airspeed (e.g. on runway) then reduce netto reading
        // A real instrument will read 0 at an airspeed of 0
        if (this.AIRSPEED_MS < 15) {
            // effective speed is 0..10 for airspeeds of 5..15
            let effective_speed_ms = Math.max(0, this.AIRSPEED_MS - 5);
            // We gradually 'feed in' the correct netto between 5..15 m/s airspeed
            this.NETTO_MS = this.NETTO_MS * effective_speed_ms / 10;
        }
        this.ex = 66;
        SimVar.SetSimVarValue("Z:B21_NETTO_MS", "meters per second", this.NETTO_MS);
    }

    // ********************************************************************
    // ********** GAUGE UPDATE CALLED ON SIM UPDATE CYCLE      ************
    // ********************************************************************

    // *********************************************
    //          Update vario average
    // *********************************************

    // Runs once on startup
    init_vario_avg() {
        if (this.init_vario_avg_complete == null) {
            // Vario avg startup code goes here
            this.vario_avg_te_ms = 0; // rolling average (m/s) for TE
            this.prev_vario_avg_ms = 0; // previous average (m/s) for up/down arrows
            this.vario_avg_update_time_s = this.TIME_S;

            this.init_vario_avg_complete = true;
        }
    }

    update_vario_avg() {
        this.init_vario_avg(); // Runs once on startup

        // Calculate time since last update - note this can jump forwards or go BACKWARDS if pilot adjusts the time-of-day.
        let time_delta_s = this.TIME_S - this.vario_avg_update_time_s;

        // Check if pilot slid the time slider in settings (time went backwards or jumped forwards)
        if (time_delta_s < 0 || time_delta_s > 5) {
            this.vario_avg_update_time_s = this.TIME_S;
            return;
        }

        // Update basic rolling average of TE climb/sink
        this.vario_avg_te_ms = 0.99 * this.vario_avg_te_ms + 0.01 * this.TE_MS;
        this.ex = "va.1";

        //DEBUG we can initialize this after netto goes positive for a better climb avg
        SimVar.SetSimVarValue("Z:B21_VARIO_AVG_MS", "meters per second", this.vario_avg_te_ms);
    }

    // *********************************************
    //              Speed to Fly
    // Reads:
    //      this.TIME_S
    //      this.TE_MS
    //      this.NETTO_MS
    //      this.MACCREADY_MS
    // Writes:
    //      Z:B21_STF_SPEED_MS : Recommended speed-to-fly (meters per second)
    //      Z:B21_STF_SPEED_0_MS : the speed-to-fly if ZERO sink
    //      Z:B21_STF_SINK_0_MS  : the polar sink rate at (ZERO SINK speed-to-fly)

    // *********************************************

    init_stf() {
        this.ex = "stf.i.1";
        if (this.init_stf_complete == null) {

            this.stf_smoothed_ms = 25;

            this.prev_stf_update_time_s = this.TIME_S;

            this.init_stf_complete = true;
        }
        this.ex = "stf.i.9";
    }

    update_stf() {
        this.init_stf();
        this.ex = "stf.0";

        // Calculate time since last update - note this can jump forwards or go BACKWARDS if pilot adjusts the time-of-day.
        let time_delta_s = this.TIME_S - this.prev_stf_update_time_s;

        // Check if pilot slid the time slider in settings (time went backwards or jumped forwards)
        if (time_delta_s < 0 || time_delta_s > 5) {
            this.prev_stf_update_time_s = this.TIME_S;
            return;
        }

        // Get speed-to-fly (ms) for current netto (sink is -ve)
        let stf_ms = this.stf_airspeed(this.NETTO_MS);

        // On a change in the pilot Maccready Setting we immediately update stf_smoothed_ms
        let force_update = false;
        if (this.prev_stf_maccready_ms == null || this.prev_stf_maccready_ms != this.MACCREADY_MS) {
            this.prev_stf_maccready_ms = this.MACCREADY_MS;
            this.stf_smoothed_ms = stf_ms;
            force_update = true;
        } else {
            this.stf_smoothed_ms = this.stf_smoothed_ms * 0.98 + stf_ms * 0.02;
        }

        SimVar.SetSimVarValue("Z:B21_STF_SPEED_MS", "meters per second", this.stf_smoothed_ms);

        let stf_climb_ms = (this.AIRSPEED_MS - stf_ms) / 5; // so 25m/s airspeed delta ~= 5 m/s climb
        SimVar.SetSimVarValue("Z:B21_STF_CLIMB_MS", "meters per second", stf_climb_ms);


        // Only update number every 2 seconds
        if (force_update || this.prev_stf_update_time_s == null || this.TIME_S - this.prev_stf_update_time_s > 2) {
            this.prev_stf_update_time_s = this.TIME_S;

            // Now update the 'local vars' to share data with other gauges (in particular LX_9050 computing arrival height)
            // Speed-to-fly (ms) at zero sink.
            this.ex = "stf.60";
            this.STF_SPEED_0_MS = this.stf_airspeed(0);

            // Z:B21_STF_SPEED_0_MS : the speed-to-fly if ZERO sink
            // Z:B21_STF_SINK_0_MS  : the polar sink rate at (ZERO SINK speed-to-fly)
            SimVar.SetSimVarValue("Z:B21_STF_SPEED_0_MS", "meters per second", this.STF_SPEED_0_MS);
            this.ex = "stf.62";
            this.STF_SINK_0_MS = this.polar_sink(this.STF_SPEED_0_MS);
            SimVar.SetSimVarValue("Z:B21_STF_SINK_0_MS", "meters per second", this.STF_SINK_0_MS);
            this.ex = "stf.64";
        }

        this.ex = "stf.9";
    }

    // ***********************************************************************
    // ********** Update task calculated values   ****************************
    // ***********************************************************************

    update_task() {
        if (this.task != null && this.task_active()) {
            this.task.update();
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
        console.log('b21_soaring_engine.load_task() ' + (++this.task_load_count));
        this.task_load_time_s = this.TIME_S;
        this.task.load();
    }

    get_position() {
        return new LatLong(SimVar.GetSimVarValue("A:PLANE LATITUDE", "degrees latitude"),
            SimVar.GetSimVarValue("A:PLANE LONGITUDE", "degrees longitude"));
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
                                            "start_local_time_s": this.task.start_local_time_s,
                                            "start_alt_m": this.task.start_alt_m
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

    // ***********************************************************************
    // ********** Gauge calls                     ****************************
    // ***********************************************************************

    // ********************************************************************
    // *********** CLIENT EVENT CALLBACKS        **************************
    // ********************************************************************

    // Call the callbacks for a given event_name
    call_callbacks(event_name, arg) {
        for (let i = 0; i < this.event_callbacks.length; i++) {
            let caller = this.event_callbacks[i].caller;
            // We use the JS 'apply' method so we can set 'caller' as the context
            this.event_callbacks[i].fun.apply(caller, [event_name, arg]);
        }
    }

    // ********************************************************************
    // *********** CLIENT API                    **************************
    // ********************************************************************

    // Called by the client gauge, to register a callback for an event
    register_callback(caller_object, callback_function) {
        this.event_callbacks.push({
            "caller": caller_object,
            "fun": callback_function
        });
    }

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

    // Called by gauge or engine auto WP code to change to next or previous waypoint
    change_wp(delta) {
        if (!this.task_active()) {
            return;
        }
        if (delta > 0) {
            this.task.next_waypoint();
        } else {
            this.task.prev_waypoint();
        }
        console.log("b21_soaring_engine change_wp", delta);
        this.call_callbacks("TASK_WP_CHANGE", { "wp": this.current_wp() });
    }

} // end b21_soaring_engine_class

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
        this.ete_s = 0 // Estimated time to waypoint 

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
        console.log('b21_soaring_engine Task() constructor');
        this.instrument = instrument;
        this.init();
        this.registerListener();
    }

    init() {
        console.log("b21_soaring_engine Task.init()");
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
        console.log("b21_soaring_engine.Task.registerListener()");
        if (this._isRegistered) {
            return;
        }
        console.log("b21_soaring_engine.Task.registerListener() RegisterViewListener");
        RegisterViewListener("JS_LISTENER_FLIGHTPLAN", () => {
            console.log("b21_soaring_engine.Task.registerListener() RegisterViewListener callback");
            Coherent.call("LOAD_CURRENT_ATC_FLIGHTPLAN");
            this.instrument.requestCall(() => {
                console.log("b21_soaring_engine.Task.registerListener() requestcall");
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

        let p1 = this.instrument.PLANE_POSITION;

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
            wp.ete_s = time_to_wp_s;
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

    remaining_distance_m() {
        let remaining_distance_m = 0;
        for (let i = this.index + 1; i <= this.finish_index; i++) {
            remaining_distance_m += this.waypoints[i].leg_distance_m;
        }
        remaining_distance_m += this.waypoints[this.index].distance_m;
        return remaining_distance_m
    }

    avg_task_speed_kts() {
        let task_speed_ms = 0;      // Speed around task in m/s
        let task_distance_m = 0;    // Distance around task in meters
        if (this.started && this.task_time_s() > 5) {
            task_speed_ms = (this.distance_m() - this.remaining_distance_m()) / this.task_time_s();
        }

        return task_speed_ms / 0.51444;
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
        console.log('b21_soaring_engine Task.load()');
        let parent = this;
        this.init(); // Reset the Task settings
        Coherent.call("GET_FLIGHTPLAN")
            .then((flightPlanData) => {
                //console.log("flightPlanIndex "+flightPlanData.flightPlanIndex);
                //console.log("activeWaypointIndex "+flightPlanData.activeWaypointIndex);
                //console.log("waypoints length "+flightPlanData.waypoints.length);
                console.log("GET_FLIGHTPLAN returned:", flightPlanData);
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
                    console.log("No flightplan, using HOME");
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
        console.log("add_waypoint_from_flightplan", fp_wp.ident, fp_wp);
        if (fp_wp.ident.startsWith("TIMECRUIS") || fp_wp.ident.startsWith("TIMEDSCNT") || fp_wp.ident.startsWith("TIMEVERT")) {
            console.log("add_waypoint_from_flightplan skipping", fp_wp.ident);
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
        console.log("Wp from '" + original_name + "' FP extra params: alt_m=" + wp.alt_m.toFixed(0) +
            " radius_m=" + (wp.radius_m == null ? "null" : wp.radius_m.toFixed(0)) +
            " min/max_alt_m=" + (wp.min_alt_m == null ? "null" : wp.min_alt_m.toFixed(0)) + "/" +
            (wp.max_alt_m == null ? "null" : wp.max_alt_m.toFixed(0)));

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

registerInstrument("b21_soaring_engine-element", b21_soaring_engine_class);
