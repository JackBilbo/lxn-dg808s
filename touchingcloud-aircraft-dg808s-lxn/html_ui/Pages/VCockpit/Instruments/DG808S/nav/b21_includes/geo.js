"use strict"

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
