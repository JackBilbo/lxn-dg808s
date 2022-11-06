class soarnet {
    constructor(instrument) {
        this.instrument = instrument; // Reference to main instrument
        this.isActive = false;
        this.currentEvent = "test";
    }

    init() {
        document.getElementById("username").value = SimVar.GetSimVarValue("ATC ID", "string"); 

        document.getElementById("mpformsubmit").addEventListener("click", function(e) {
            e.preventDefault();
            if(document.getElementById("username").value == "") {
                document.querySelector(".mainmessage").innerHTML = "Please enter a username";
                return false; 
            }

            SN.mpUsername = document.getElementById("username").value;
            SOARNET.initConnection();
            document.querySelector(".mainmessage").innerText = "connecting...";

            window.setTimeout(function() {
                if(SOARNET.checkvalue.masterkey == "isActive" && SOARNET.checkvalue.ssckey == "isActive") { 
                    document.querySelector(".mainmessage").innerText = "";
                    document.querySelector(".mp").classList.remove("notConnected");
                } else {
                    document.querySelector(".mainmessage").innerText = "Sorry, System currently not available.";
                }
            }, 500)
            
        })

        document.getElementById("addEventLink").addEventListener("click", function(e) {
            e.preventDefault();
            document.getElementById("addEvent").classList.toggle("on");
        })

        document.getElementById("addEvent").addEventListener("submit", function(e) {
            e.preventDefault();
            if(document.getElementById("utchours").value > 23 || document.getElementById("utcmin").value > 59 || document.getElementById("eventtitle").value == "") {
                return false;
            }

            SN.currentEvent = SOARNET.createEvent({
                "title": document.getElementById("eventtitle").value,
                "time": SOARNET.creatUTCstarttime_s(document.getElementById("utchours").value, document.getElementById("utcmin").value),
                "wpstart": B21_SOARING_ENGINE.task.start_wp().position,
                "wpfinish": B21_SOARING_ENGINE.task.finish_wp().position
            })
            
            document.getElementById("addEvent").classList.remove("on");
        })

        document.getElementById("eventlist").addEventListener("click", function(e) {
            e.preventDefault();
            let el = e.target;
            SN.currentEvent = el.getAttribute("data-id");

            SOARNET.joinEvent();
        })

        document.getElementById("leave_event").addEventListener("click",function(e) {
            e.preventDefault();
            try {
                SOARNET.writeUserData(SN.currentEvent, SOARNET.userId, null);
                SOARNET.detachlistener();
                NAVMAP.wipeMultiplayers();
            } catch(e) {
                console.log(e);
            }
            
            SN.currentEvent = "";
            SN.isActive = false;
            document.querySelector(".mp").classList.add("noEvent");
            document.querySelector("#userlist tbody").innerHTML = "";
        })

        document.getElementById("disconnect").addEventListener("click", function(e) {
            e.preventDefault();
            document.querySelector(".mp").classList.add("notConnected");
        })

        SOARNET.updateEventInfo();
    }

    disconnectedCallback() {
        SOARNET.deleteEventUser(this.currentEvent, this.userId);
    }

    update() {
        if(!B21_SOARING_ENGINE.task_active()) { return; }

        if(this.isActive) {
             
            if(!SOARNET.isSolo) {
                this.updateUserdata();
                document.querySelector("#mp_info").innerHTML = (SOARNET.eventDetails && SOARNET.eventDetails[this.currentEvent]) ? SOARNET.eventDetails[this.currentEvent].title : "";
            } else {
                document.querySelector("#mp_info").innerHTML = "Waiting for pilots to connect";
            }

            SOARNET.displayUserList();
            
            let time_to_start = (SOARNET.eventDetails && SOARNET.eventDetails[this.currentEvent]) ? SOARNET.getTimetostart_s(SOARNET.eventDetails[this.currentEvent].time) : 1; 
            if (time_to_start <= 0 && !B21_SOARING_ENGINE.task_started()) {
                this.instrument.vars.tasktime.value = time_to_start;
                if(time_to_start >= -10) {
                    if(time_to_start <= -1) { 
                        SOARNET.countdown(Math.abs(time_to_start),400) 
                    } else {
                        SOARNET.countdown("GO",400);
                        window.setTimeout(SOARNET.countdown_off,3000);
                    }
                    
                }
            } else if (!B21_SOARING_ENGINE.task_started()) {
                this.instrument.vars.tasktime.value = 0;
            }
        }
    }

    updateUserdata() {
        document.querySelector("#mp_info").innerHTML = "";
        let taskstate = "not started";
        let avg_speed = 0;
        if(B21_SOARING_ENGINE.task_started()) { taskstate = "started"; avg_speed = B21_SOARING_ENGINE.task.avg_task_speed_kts(); }
        if(B21_SOARING_ENGINE.task_finished()) { taskstate = "finished"; avg_speed = B21_SOARING_ENGINE.finish_speed_ms() / 0.51444; }

        SOARNET.writeUserData(
            this.currentEvent, SOARNET.userId, {
                "username": this.mpUsername,
                "lat":      parseFloat(SimVar.GetSimVarValue("A:PLANE LATITUDE", "degrees latitude")),
                "long":     parseFloat(SimVar.GetSimVarValue("A:PLANE LONGITUDE", "degrees longitude")),
                "hdg":      Math.round(this.instrument.vars.hdg.value),
                "alt":      Math.round(this.instrument.vars.alt.value),
                "dist":     B21_SOARING_ENGINE.task.distance_m() - B21_SOARING_ENGINE.task.remaining_distance_m(),
                "avg":      avg_speed,
                "tasktime": this.instrument.vars.tasktime.value,
                "taskstate":taskstate,
                "time":     Math.floor(Date.now() / 1000)
            }
        )
    }

}

SOARNET.displayUserList = function(){
    let list = document.querySelector("#userlist tbody");
    let userList = [];
    let finisherlist = [];
    let now = Math.floor(Date.now() / 1000);
    list.innerHTML = "";
    
    for (user in SOARNET.eventusers) {
        
        if(SOARNET.eventusers[user].taskstate == "finished") {
            finisherlist.push(SOARNET.eventusers[user]);
        } else {
            if (SOARNET.eventusers[user].taskstate == "not started") { SOARNET.eventusers[user].dist = -1; }
            userList.push(SOARNET.eventusers[user]);
        }
            
        if(typeof(TOPOMAP.addLayer) == "function" && user != this.userId) {
            try {
                NAVMAP.paintMultiplayers(user, SOARNET.eventusers[user]);
            } catch(e) {
                console.log(e);
                NAVMAP.wipeMultiplayers();
            } 
        }
             
    }

    finisherlist.sort((a,b) => {
        return parseInt(a.tasktime) - parseInt(b.tasktime);
      })

    userList.sort((a,b) => {
        return parseInt(b.dist) - parseInt(a.dist);
    })

    let i = 1;

    finisherlist.forEach((el) => {
        list.innerHTML += "<tr><td class='alignright'>" + i + "</td><td class='mpusername'>" + el.username + "</td><td>" + LXN.displayValue(el.alt, "ft", "alt") + "</td><td class='alignright'>" + LXN.displayValue(el.avg, "kts", "speed") + "</td><td class='alignright'>" + LXN.displayValue(el.tasktime,"s","time_of_day") + "</td></tr>";
        i++;
    })

    userList.forEach((el) => {
      list.innerHTML += "<tr><td class='alignright'>" + (el.taskstate == "not started" ? "--" : i) + "</td><td class='mpusername'>" + el.username + "</td><td>" + LXN.displayValue(el.alt, "ft", "alt") + "</td><td class='alignright'>" + (el.taskstate == "not started" ? "-" : LXN.displayValue(el.avg, "kts", "speed")) + "</td><td class='alignright'>" + (el.taskstate == "not started" ? "0" : LXN.displayValue(el.dist, "m", "dist")) + "</td></tr>";
      i++;  
    })

    SOARNET.isSolo = i == 2 ? true : false;
  }

SOARNET.updateEventInfo = function() {
    if( document.getElementById("eventlist") == null) { return; }
    let list = document.getElementById("eventlist");
    list.innerHTML = "";

    for(var event in SOARNET.eventDetails) {
        if(SOARNET.eventDetails[event].wpstart.lat == B21_SOARING_ENGINE.task.start_wp().position.lat && SOARNET.eventDetails[event].wpfinish.long == B21_SOARING_ENGINE.task.finish_wp().position.long) {
            let starttime =  new Date(SOARNET.eventDetails[event].time * 1000).toUTCString().replace(/.*(\d\d:\d\d:\d\d).*/,"$1");
            list.innerHTML += '<li><h3>' + SOARNET.eventDetails[event].title + '</h3><p>Task starts: ' +starttime + ' UTC</p><a href="#" class="eventClickhandler" data-id="' + event + '"></a></li>';
        }
    }
}

SOARNET.joinEvent = function() {
    SOARNET.createListener(SN.currentEvent);
    SOARNET.userId = SOARNET.userId == "" ? SOARNET.getUserId(SN.currentEvent) : SOARNET.userId ;           
    SN.isActive = true;
    document.querySelector(".mp").classList.remove("noEvent");
}

SOARNET.creatUTCstarttime_s = function(eventHours,eventMinutes) {
    let now = new Date();
    return Date.UTC(now.getFullYear(),now.getMonth(),now.getDate(),parseInt(eventHours),parseInt(eventMinutes)) / 1000;
}

SOARNET.getTimetostart_s = function(eventStart_s) {
    let now = new Date();
    return Date.UTC(now.getFullYear(),now.getMonth(),now.getDate(),(now.getHours() + (now.getTimezoneOffset() / 60)),now.getMinutes(),now.getSeconds()) / 1000 - eventStart_s;
}

SOARNET.countdown = function(number,size) {
    let cd = document.getElementById("countdown");
    cd.style.fontSize = size + "px";
    cd.innerText = number;
    cd.style.display = "block";
} 

SOARNET.countdown_off = function() {
    console.log("countdown off!!");
    document.getElementById("countdown").style.display = "none";
}
