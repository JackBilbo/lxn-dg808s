


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
