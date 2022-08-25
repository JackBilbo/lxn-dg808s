# B21 Soaring Engine

This is the component that provides common soaring functionality to multiple glider gauges.

## Interface available to client gauges

```
    B21_SOARING_ENGINE.task_active()
        -- Returns true/false: whether a MSFS flightplan or 'HOME' waypoint is loaded.

    B21_SOARING_ENGINE.register_callback(event_name, caller_object, callback_function)
        -- Client gauge can register callback function for events:
            WP_CHANGE
            TASK_START
            TASk_FINISH

    B21_SOARING_ENGINE.current_wp()
        -- Returns WP object for current waypoint

    B21_SOARING_ENGINE.next_wp()
        -- Returns WP object for next waypoint

    B21_SOARING_ENGINE.change_wp(delta)
        -- change the current WP to be next (delta +ve) or previous (delta -ve)

    B21_SOARING_ENGINE.task
        -- Returns current task object
```

Waypoints provide the following interface:
```
    wp.name                 - decoded name of WP
    wp.alt_m                - height of WP in meters
    wp.distance_m           - distance to WP around task
    wp.arrival_height_msl_m - predicted arrival height at WP in meters
    wp.bearing_deg          - bearing to WP in degrees true

```
