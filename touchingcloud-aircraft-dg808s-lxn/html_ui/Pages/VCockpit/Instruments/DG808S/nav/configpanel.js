class configpanel {
    constructor(instrument) {
        this.instrument = instrument;

        this.settings = {
            brightness: 100,
            glareshiledLight: 0,
            ballast: 50,
            tint: false,
            cover: false,
            navlights: false
        }

        this.ballastIsInit = false;

        this.unitstore = SimVar.GetSimVarValue("L:UNITS_IMPERIAL","percent");
    }

    initSystemSettings() {
        let instrument = this.instrument;
        document.querySelectorAll(".lxconfigbtn").forEach((el)=> {
            el.addEventListener("click", function(e) {
                e.stopPropagation();
                let target = this.getAttribute("aria-controls");
                document.getElementById(target).classList.add("active");
                UI.isswipeinteractive = false;
            })
        });
    
        document.querySelectorAll(".configpanel_close").forEach((el)=> {
            el.addEventListener("click", function(e) {
                document.querySelectorAll(".configpanel").forEach((el)=>{
                    el.classList.remove("active");
                    UI.isswipeinteractive = true;
                    CONFIGPANEL.savePersistentData();
                })
            })
        });
            
        /* Unitswitching on systemspanel - simple buttons, while we don't have anything more sophisticated */
    
        if(GetStoredData("Discus_unitsetting")) {
            this.setUnitPrefs(GetStoredData("Discus_unitsetting"));           
        } else {
            this.setUnitPrefs("metric");
        }

        document.getElementById("conf_units_imperial").addEventListener("click", function(e) {
            CONFIGPANEL.setUnitPrefs("imperial");
        })
    
        document.getElementById("conf_units_metric").addEventListener("click", function(e) {
            CONFIGPANEL.setUnitPrefs("metric");
        })
    
        
        
        
        document.querySelectorAll(".config_toggle .handle").forEach((el)=> {
            el.addEventListener("click", (e)=> {
                let el = e.target.parentNode;
                let callback = el.getAttribute("data-callback");
                let state = el.getAttribute("state") == "on" ? "off" : "on";
                el.setAttribute("state", state );

                CONFIGPANEL[callback](state);
            })
        })

        this.rangesliders = []

        let isFES = SimVar.GetSimVarValue("L:IsFES","bool");
       
        this.maxballast = {
                left: 125,
                right: 125,
                center: 123,
                back: 26,
                total: 399
         }

        this.ballastslider = new rangeinput(document.querySelector("#ballastslider"), function(val) {
            instrument.vars.ballast_pct.value = val;

            SimVar.SetSimVarValue("PAYLOAD STATION WEIGHT:3", "lbs", CONFIGPANEL.maxballast.center / 100 * val);
            SimVar.SetSimVarValue("PAYLOAD STATION WEIGHT:4", "lbs", CONFIGPANEL.maxballast.back / 100 * val)
            SimVar.SetSimVarValue("PAYLOAD STATION WEIGHT:5", "lbs", CONFIGPANEL.maxballast.right / 100 * val);
            SimVar.SetSimVarValue("PAYLOAD STATION WEIGHT:6", "lbs", CONFIGPANEL.maxballast.left / 100 * val);
        })

        this.loadPersistentData();

        this.systeminitReady = true;
    }

    update() {
        if(!this.systeminitReady) { this.initSystemSettings(); return; }

        let masterunits = SimVar.GetSimVarValue("L:UNITS_IMPERIAL","percent");
        if(this.unitstore != masterunits) {
            if(masterunits == 100) { this.setUnitPrefs("imperial") } else { this.setUnitPrefs("metric") }
            this.unitstore = masterunits;
        }

        this.instrument.vars.ballast.value = parseFloat(SimVar.GetSimVarValue("PAYLOAD STATION WEIGHT:3", "pounds") + SimVar.GetSimVarValue("PAYLOAD STATION WEIGHT:4", "pounds") + SimVar.GetSimVarValue("PAYLOAD STATION WEIGHT:6", "pounds") + SimVar.GetSimVarValue("PAYLOAD STATION WEIGHT:5", "pounds"));
        this.instrument.vars.ballast_pct.value = this.instrument.vars.ballast.value / this.maxballast.total * 100;
        
        if(UI.pageposX = 4) {
            this.updateBallastDisplay();
        }
        
    }

    setUnitPrefs(sys) {
        // security. We currently only support imp & metric
        sys = sys == "imperial" ? "imperial" : "metric";
        document.getElementById("nav_debug").innerHTML += "Setting: " + sys;
        for(var cat in this.instrument.units) {
            this.instrument.units[cat].pref = this.instrument.units[cat][sys];
            document.getElementById("nav_debug").innerHTML += cat + ": " + this.instrument.units[cat].pref + "<br />";
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

    updateBallastDisplay() {
        this.ballastslider.setValue(this.instrument.vars.ballast_pct.value);
        document. querySelectorAll(".ballasttank").forEach((el) => {
            el.querySelector(".level").style.height = this.instrument.vars.ballast_pct.value + "%";
            el.querySelector(".number").innerHTML = this.instrument.displayValue((this.maxballast[el.getAttribute("data-tank")] / 100) * this.instrument.vars.ballast_pct.value,"lbs","weight") + this.instrument.units.weight.pref;
        })

    }

    toggleDatafieldSize(val) {
        if (val == "on") {  document.querySelector("#panelframe").classList.add("bigdatafields") } else { document.querySelector("#panelframe").classList.remove("bigdatafields") }
    }

    
    savePersistentData() {
        let toggledata = {}
        let sliderdata = {}

        document.querySelectorAll(".configpanel .config_toggle").forEach((el)=> {
            toggledata[el.getAttribute("data-callback")] = el.getAttribute("state")
        })

        this.rangesliders.forEach((el) => {
            sliderdata[el.id] = el.getValue();
        })

        SetStoredData("Discus_configtoggle", JSON.stringify(toggledata));
        SetStoredData("Discus_sliderdata", JSON.stringify(sliderdata));

    }

    loadPersistentData() {
        console.log("GET DATA FROM STORAGE....");

        let togglerawdata = GetStoredData("Discus_configtoggle");
        let sliderrawdata = GetStoredData("Discus_sliderdata");

        if(togglerawdata != "") {
            try {
                let toggledata = JSON.parse(togglerawdata);
                for (var toggle in toggledata) {
                    document.querySelector("[data-callback=" + toggle + "]").setAttribute("state", toggledata[toggle]);
                    CONFIGPANEL[toggle](toggledata[toggle]);
                  }
            } catch(e) { console.log( "Could not load togglesettings: " + e )  }
        }
        
        if(sliderrawdata != "") {
            try {
                let sliderdata = JSON.parse(sliderrawdata);
                console.log(sliderdata);
                this.rangesliders.forEach((el) => {
                    if(sliderdata[el.id]) {
                        el.setValue(sliderdata[el.id]);
                        el.callback(sliderdata[el.id]);
                    }
                })
            } catch(e) { console.log( "Could not load slidersettings: " + e )  }
        }
    }

}


class rangeinput {
    constructor(el, callback) {
        this.rangebg = el;
        this.id = el.getAttribute("id");
        
        this.marker = document.createElement("div");
        this.marker.setAttribute("class","marker");
        el.appendChild(this.marker);
        
        this.rail = document.createElement("div");
        this.rail.setAttribute("class","rail");

        this.handle = document.createElement("div");
        this.handle.setAttribute("class", "handle");

        this.interact = document.createElement("div");
        this.interact.setAttribute("class", "interact");

        this.rail.appendChild(this.handle);
        this.rail.appendChild(this.interact);
        el.appendChild(this.rail);

        this.isActive = false;
        this.clickposition = 0;
        this.maxvalue = parseFloat(el.getAttribute("data-max"));
        this.minvalue = parseFloat(el.getAttribute("data-min"));

        this.callback = callback;

        this.initvalue = parseFloat(el.getAttribute("data-value"));
        this.outputvalue = this.initvalue;

        this.init();
        
    }

    init() {
        let thisinput = this;
        thisinput.rail.addEventListener("mousedown", (e)=> {
            thisinput.handle.style.backgroundColor = "#888";
            thisinput.clickposition = e.offsetX;
            thisinput.isActive = true;
        })

        thisinput.rail.addEventListener("mouseup", (e)=> {
            thisinput.handle.style.backgroundColor = "#ccc";
            thisinput.isActive = false;
        })

        thisinput.rail.addEventListener("mouseleave", (e)=> {
            thisinput.handle.style.backgroundColor = "#ccc";
            thisinput.isActive = false;
        })

        thisinput.rail.addEventListener("mousemove", (e) => {
            if(thisinput.isActive) {
                let pos = e.offsetX - thisinput.handle.clientWidth / 2;
                let max = thisinput.rail.clientWidth - thisinput.handle.clientWidth;
                pos = pos < 0 ? 0 : pos;
                pos = pos < max - thisinput.handle.clientWidth / 2 ? pos : max ;

                thisinput.marker.style.width = (pos + thisinput.handle.clientWidth / 2)  + "px";
                thisinput.handle.style.left = pos + "px";

                let diff = thisinput.maxvalue - thisinput.minvalue;
                let value = (( pos / max ) * diff) + thisinput.minvalue;
                thisinput.outputvalue = value;

                thisinput.callback(thisinput.outputvalue);
            }
        })
        
        this.setValue(this.initvalue);
    }

    setValue(val) {
        if(val < this.minvalue || val > this.maxvalue) { return; }
        let diff = this.maxvalue - this.minvalue;
        let max = this.rail.clientWidth - this.handle.clientWidth;
        let pos = (max / diff) * (val - this.minvalue);
        this.handle.style.left = pos + "px";
        this.marker.style.width = (pos + this.handle.clientWidth / 2)  + "px";
    }

    getValue() { return this.outputvalue; }
}
