class configpanel {
    constructor(instrument) {
        this.instrument = instrument;

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
                })
                UI.isswipeinteractive = true;
                CONFIGPANEL.savePersistentData();
            })
        });
            
        /* Unitswitching on systemspanel - simple buttons, while we don't have anything more sophisticated */
    
        if(GetStoredData("Discus_unitsetting")) {
            let unitsettings = GetStoredData("Discus_unitsetting");
            if (unitsettings == "metric" || unitsettings == "imperial") {
                this.setUnitPrefs(unitsettings);
            } else {
                this.setUnitPrefs("metric");
            }   
        }
        
        if(GetStoredData("Discus_unitsetting_detail")) {
                let unitsettings = GetStoredData("Discus_unitsetting_detail");
                try {
                    let unitobject = JSON.parse(unitsettings);
                    for(var unit in unitobject) {
                        this.instrument.units[unit].pref = unitobject[unit];
                    }
                    this.buildUnitDetailSetting();
                } catch(e) { console.log("couldn't restore unit-detailsettings : " + e)}             
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
        this.buildUnitDetailSetting();

        this.systeminitReady = true;
    }

    update() {
        if(!this.systeminitReady) { this.initSystemSettings(); return; }

        this.instrument.vars.ballast.value = parseFloat(SimVar.GetSimVarValue("PAYLOAD STATION WEIGHT:3", "pounds") + SimVar.GetSimVarValue("PAYLOAD STATION WEIGHT:4", "pounds") + SimVar.GetSimVarValue("PAYLOAD STATION WEIGHT:6", "pounds") + SimVar.GetSimVarValue("PAYLOAD STATION WEIGHT:5", "pounds"));
        this.instrument.vars.ballast_pct.value = this.instrument.vars.ballast.value / this.maxballast.total * 100;
        
        if(UI.pagepos_x == 4) {
            this.updateBallastDisplay();
        }
        
    }

    setUnitPrefs(sys) {
        for(var cat in this.instrument.units) {
            this.instrument.units[cat].pref = this.instrument.units[cat][sys];
        }

        SetStoredData("Discus_unitsetting", sys);
        this.buildUnitDetailSetting();
        
        if(sys == "imperial") {
            document.getElementById("conf_units_imperial").classList.add("highlighted");
            document.getElementById("conf_units_metric").classList.remove("highlighted");
            SimVar.SetSimVarValue("L:UNITS_IMPERIAL", "percent", 100);
            this.unitstore = 100;
        } else {
            document.getElementById("conf_units_metric").classList.add("highlighted");
            document.getElementById("conf_units_imperial").classList.remove("highlighted");
            SimVar.SetSimVarValue("L:UNITS_IMPERIAL", "percent", 0);
            this.unitstore = 0;
        }

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

    toggleLiftdots(val) {
        if (val == "on") {  this.instrument.showLiftdots = true; } else { this.instrument.showLiftdots = false; }
    }

    toggleStallwarning(val) {
        if (val == "on") {  this.stallwarning = true } else {  this.stallwarning = false }
    }

    toggleAutoMC(val) {
        if (val == "on") {  this.autoMC = true } else {  this.autoMC = false }
    }

    toggleAipLayer(val) {
        if (val == "on") { NAVMAP.hasAipLayer = true; if(typeof(TOPOMAP.addLayer) == "function") { NAVMAP.addAipLayer() } } else { NAVMAP.removeAipLayer(); NAVMAP.hasAipLayer = false; }
    }

    toggleHawkdisplay(val) {
        if (val == "on") {  
            this.displayHawk = true; 
            document.querySelector("#hawk").classList.add("active") 
        } else {  
            this.displayHawk = false; 
            document.querySelector("#hawk").classList.remove("active") 
        }
    }

    toggleCoursePointer(val) {
        if (val == "on") {  
            this.displayCoursePointer = true; 
            document.querySelector("#coursepointer").classList.add("active") 
        } else {  
            this.displayCoursePointer = false; 
            document.querySelector("#coursepointer").classList.remove("active") 
        }
    }
    
    savePersistentData() {
        let toggledata = {}
        let sliderdata = {}
        let unitprefs = {}

        document.querySelectorAll(".configpanel .config_toggle").forEach((el)=> {
            toggledata[el.getAttribute("data-callback")] = el.getAttribute("state")
        })

        this.rangesliders.forEach((el) => {
            sliderdata[el.id] = el.getValue();
        })

        for(var unit in this.instrument.units) {
            unitprefs[unit] = this.instrument.units[unit].pref;
        }

        SetStoredData("Discus_unitsetting_detail", JSON.stringify(unitprefs));
        SetStoredData("Discus_configtoggle", JSON.stringify(toggledata));
        SetStoredData("Discus_sliderdata", JSON.stringify(sliderdata));

    }

    loadPersistentData() {

        let togglerawdata = GetStoredData("Discus_configtoggle");
        let sliderrawdata = GetStoredData("Discus_sliderdata");

        if(togglerawdata != "") {
            try {
                let toggledata = JSON.parse(togglerawdata);
                for (var toggle in toggledata) {
                    if(document.querySelector("[data-callback=" + toggle + "]")) {
                        document.querySelector("[data-callback=" + toggle + "]").setAttribute("state", toggledata[toggle]);
                        CONFIGPANEL[toggle](toggledata[toggle]);
                    }
                  }
            } catch(e) { console.log( "Could not load togglesettings: " + e )  }
        }
        
        if(sliderrawdata != "") {
            try {
                let sliderdata = JSON.parse(sliderrawdata);
                this.rangesliders.forEach((el) => {
                    if(sliderdata[el.id]) {
                        el.setValue(sliderdata[el.id]);
                        el.callback(sliderdata[el.id]);
                    }
                })
            } catch(e) { console.log( "Could not load slidersettings: " + e )  }
        }
    }

    buildUnitDetailSetting() {
        let wrapper = document.querySelector("#unitdetailsetting");
        wrapper.innerHTML = "";

        for(var unit in this.instrument.units) {
            if(this.instrument.units[unit].options.length > 1 && unit != "time" && unit != "time_of_day" ) {
                let inputwrapper = document.createElement("div");
                inputwrapper.classList.add("inputwrapper");

                let label = document.createElement("label");
                label.innerHTML = this.instrument.units[unit].label + ":";
                inputwrapper.appendChild(label);
                inputwrapper.setAttribute("data-unit",unit);

                for(var i = 0; i<this.instrument.units[unit].options.length; i++) {
                    let option = document.createElement("span");
                    option.classList.add("unitselect");
                    option.setAttribute("data-value", this.instrument.units[unit].options[i])
                    if(this.instrument.units[unit].options[i] == this.instrument.units[unit].pref) { option.classList.add("selected"); }
                    option.innerHTML = this.instrument.units[unit].options[i];
                    option.addEventListener("click", (e) => { 
                        console.log(e.target);
                        let unit = e.target.parentNode.getAttribute("data-unit");
                        CONFIGPANEL.instrument.units[unit].pref = e.target.getAttribute("data-value");
                        inputwrapper.querySelector(".selected").classList.remove("selected");
                        e.target.classList.add("selected");                       
                    })
                    inputwrapper.appendChild(option);
                }

                wrapper.appendChild(inputwrapper);
            }
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

        this.label = document.createElement("div");
        this.label.setAttribute("class","label");

        this.handle = document.createElement("div");
        this.handle.setAttribute("class", "handle");

        this.interact = document.createElement("div");
        this.interact.setAttribute("class", "interact");

        this.rail.appendChild(this.label);
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
                thisinput.addLabel();

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
        this.outputvalue = val;
        this.addLabel();
    }

    getValue() { return this.outputvalue; }

    addLabel() {
        let labelvalue = this.maxvalue == 1 ? (this.outputvalue * 100).toFixed(0) : this.outputvalue.toFixed(0);
        this.label.innerText = labelvalue;
        if(parseInt(this.handle.style.left) < 100) {
            this.label.classList.add("placeright");
        } else {
            this.label.classList.remove("placeright"); 
        }
    }
}