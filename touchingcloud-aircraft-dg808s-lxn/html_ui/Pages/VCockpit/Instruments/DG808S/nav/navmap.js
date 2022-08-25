class navmap {
    constructor(instrument) {
        this.instrument = instrument; // Reference to main instrument
    
        // Colors for B21 Soaring Engine Task Management - task will be drawn in dashed lines of these colors
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

        this.map_overlay_el = document.getElementById("lx_9050_map_overlay");
        this.task_svg_el = document.getElementById("lx_9050_task");
            
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

                let navmap = this;
                document.querySelector("#map_orientation").addEventListener("click", function() {
                    if(navmap.map_rotation == 1) {
                        navmap.map_rotation = EMapRotationMode.NorthUp;
                        document.querySelector("#battery_required").setAttribute("class","map_northup");
                    } else {
                        navmap.map_rotation = EMapRotationMode.TrackUp;
                        document.querySelector("#battery_required").setAttribute("class","map_trackup");
                    }
            
                    navmap.set_map_rotation(navmap.map_rotation);
                });
            
                document.querySelector("#map_zoomin").addEventListener("click", function() {
                    navmap.zoom_in();
                })
            
                document.querySelector("#map_zoomout").addEventListener("click", function() {
                    navmap.zoom_out();
                })
            }
        }

        if (this.map_instrument_loaded) {
            // this.update_sim_time();
            this.update_map();

            if(this.map_rotation == EMapRotationMode.NorthUp) {
                document.getElementById("glidericon").style.transform = "rotate(" + this.instrument.vars.hdg.value + "deg)";
            } else {
                document.getElementById("glidericon").style.transform = "rotate(0deg)";
            }

            if(this.instrument.vars.ias.value > 20) {
                document.getElementById("ac_trk").style.transform = "rotate(" + (this.instrument.vars.trk.value - this.instrument.vars.hdg.value) + "deg)";
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
        if (B21_SOARING_ENGINE.task_active() && this.map_instrument.navMap.centerCoordinates != null ) {
            this.draw_task();
            this.draw_courseline();
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

        for (let wp_index = 0; wp_index < B21_SOARING_ENGINE.task_length(); wp_index++) {
            this.ex="ut.4."+wp_index;

            this.ex="ut.4.1."+wp_index;
            // Draw line p1 -> p2 (solid for current leg, dashed for other legs)
            this.add_task_line(newSVG, wp_index);

            if (wp_index == B21_SOARING_ENGINE.task.start_index && B21_SOARING_ENGINE.task_index() <= B21_SOARING_ENGINE.task.start_index) {
                this.ex="ut.4.2."+wp_index;
                // Draw start line at this WP
                this.add_start_line(newSVG, wp_index);
            } else if (wp_index == B21_SOARING_ENGINE.task.finish_index) {
                this.ex="ut.4.3."+wp_index;
                this.add_finish_line(newSVG, wp_index);
            } else if (wp_index > B21_SOARING_ENGINE.task.start_index && wp_index < B21_SOARING_ENGINE.task.finish_index) {
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
        if (!B21_SOARING_ENGINE.task_active()) {
            return;
        }

        let wp_LL = B21_SOARING_ENGINE.current_wp().position;

        // Draw 5 range circles around current wp
        for (let i=0; i<5; i++) {
                let circle_distance_m = (i+1) * 10000; // 10 km range circles
                if (circle_distance_m > B21_SOARING_ENGINE.current_wp().distance_m) {
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
        if (B21_SOARING_ENGINE.task.start_index != null && wp_index <= B21_SOARING_ENGINE.task.start_index) {
            return;
        }

        // Don't add task line after the finish line
        if(B21_SOARING_ENGINE.task.finish_index != null && wp_index > B21_SOARING_ENGINE.task.finish_index) {
            return;
        }

        let wp = B21_SOARING_ENGINE.task.waypoints[wp_index];

        // Check if we want to HIGHLIGHT this task line,
        // i.e. the line to the current waypoint (will choose color) or current WP is start and this is NEXT leg
        const current_task_line = wp_index == B21_SOARING_ENGINE.task_index() ||
                                (wp_index - 1 == B21_SOARING_ENGINE.task_index() && B21_SOARING_ENGINE.task.start_index == B21_SOARING_ENGINE.task_index()) ;

        const line_color = current_task_line ? this.TASK_LINE_CURRENT_COLOR : this.TASK_LINE_COLOR;

        const initial_offset = current_task_line ? (this.instrument.TIME_S % 4) / 2 * this.TASK_LINE_DASH_SIZE : 0;

        const line = this.svg_line( wp["position"],
                                    B21_SOARING_ENGINE.task.waypoints[wp_index-1]["position"],
                                    this.TASK_LINE_WIDTH,
                                    line_color,
                                    this.TASK_LINE_DASH_SIZE,
                                    initial_offset); // dash_offset
        svg_el.appendChild(line);

        const alt_color = current_task_line ? this.TASK_LINE_CURRENT_COLOR_ALT : this.TASK_LINE_COLOR_ALT;

        let alt_line = this.svg_line(   wp["position"],
                                        B21_SOARING_ENGINE.task.waypoints[wp_index-1]["position"],
                                        this.TASK_LINE_WIDTH,
                                        alt_color,
                                        this.TASK_LINE_DASH_SIZE,
                                        initial_offset + this.TASK_LINE_DASH_SIZE); // dash_offset
        svg_el.appendChild(alt_line);
    }

    add_wp_radius(svg_el, wp_index) {
        //console.log("add_wp_radius",wp_index);
        let wp = B21_SOARING_ENGINE.task.waypoints[wp_index];
        let wp_LL = wp.position;
        let radius_m = wp.radius_m;

        let circle = this.svg_circle(wp_LL, radius_m, 5, this.TASK_LINE_COLOR);
        svg_el.appendChild(circle);
    }

    // Draw a line perpendicular to the leg to the NEXT waypoint
    add_start_line(svg_el, wp_index) {
        //console.log("add_start_line()");
        // Cannot draw a start line on last waypoint
        if (wp_index >= B21_SOARING_ENGINE.task_length() - 1) {
            return;
        }

        let wp = B21_SOARING_ENGINE.task.waypoints[wp_index];

        const line_color = wp_index==B21_SOARING_ENGINE.task_index() ? this.TASK_LINE_CURRENT_COLOR : this.TASK_LINE_COLOR;
        const line_color_alt = wp_index==B21_SOARING_ENGINE.task_index() ? this.TASK_LINE_CURRENT_COLOR_ALT : this.TASK_LINE_COLOR_ALT;

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

        let wp = B21_SOARING_ENGINE.task.waypoints[wp_index];

        const line_color = wp_index==B21_SOARING_ENGINE.task_index() ? this.TASK_LINE_CURRENT_COLOR : this.TASK_LINE_COLOR;
        const line_color_alt = wp_index==B21_SOARING_ENGINE.task_index() ? this.TASK_LINE_CURRENT_COLOR_ALT : this.TASK_LINE_COLOR_ALT;

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

    draw_courseline() {
        let svg_el = document.querySelector("#lift_dots");
        let targetcoords;
        if(svg_el.querySelector("#courseline") != null) {
            svg_el.removeChild(svg_el.querySelector("#courseline"));
        }

        if(UI.pagepos_x == 0 && NAVPANEL.selectedAirport.coordinates.lat) { 
            targetcoords = {lat: NAVPANEL.selectedAirport.coordinates.lat, long: NAVPANEL.selectedAirport.coordinates.long};
        } else if(UI.pagepos_x == 1) {
            targetcoords = B21_SOARING_ENGINE.current_wp().position;
        } else {
            return;
        }

        let line = this.svg_line( this.instrument.PLANE_POSITION, targetcoords, 3,this.TASK_LINE_CURRENT_COLOR,0,0); 
        line.setAttribute("id","courseline");
                    
        svg_el.appendChild(line);
    }
}