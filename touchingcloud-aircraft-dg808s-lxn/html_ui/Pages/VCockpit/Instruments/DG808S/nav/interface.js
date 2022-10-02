

class ui {
    constructor(instrument) {

        this.instrument = instrument; // Reference to main instrument
        this.mainframe = document.querySelector("#mainframe");
        this.panelframe = document.querySelector("#panelframe");
        this.pages = [];
        this.panels = [];
        this.pagepos_x = 0;
        this.pagepos_y = 0;
        this.pagewidth = 867;
        this.pageheight = 1319;
        this.isswipeinteractive = true;
    }

    init() {
        let LXNAV = this
        let instrument = this.instrument;
    
        document.getElementById("nav_debug").innerHTML += "System init<br />";
        /* Collect available panels and pages */
        document.querySelectorAll(".panel").forEach( function(p,i) {
            LXNAV.panels.push(p);
            LXNAV.pages[i] = [];
            p.querySelectorAll(".page").forEach( function(page) {
                LXNAV.pages[i].push(page);
            })
            document.getElementById("nav_debug").innerHTML += i + "/" + LXNAV.pages[i].length + " Pages<br />";
        });
    
        this.pages[this.pagepos_x][this.pagepos_y].classList.add("current");
    
        /* Make pages swipable */
    
        let mousedownpos;
    
        this.panelframe.addEventListener("mousedown", (e)=> {
            mousedownpos = e;
        })
    
        this.panelframe.addEventListener("mouseup", (e)=> {
            if(typeof(mousedownpos) == "object" && this.isswipeinteractive) {
                if(e.offsetX - mousedownpos.offsetX < -300) { this.pageRight() }
                else if(e.offsetX - mousedownpos.offsetX > 300) { this.pageLeft() }
                else if(e.offsetY - mousedownpos.offsetY < -300) { this.pageDown() }
                else if(e.offsetY - mousedownpos.offsetY > 300) { this.pageUp() }
            } 
        })
    
    
        /* Editable Datacells */
    
        document.querySelector("#toggle_config").addEventListener("click", function() {
            document.querySelector("#panelframe").classList.toggle("configmode");
        });
    
               
        /* make all datacells clickable */
        document.querySelectorAll(".datacell").forEach((el)=>{
            let myid = el.getAttribute("id");
            if(GetStoredData("discus_" + myid)) {
                el.setAttribute("data-userconfig", GetStoredData("discus_" + myid))
            }
    
            // Retrieve JSON-String containing possible user settings
            // and set el.setAttribute("user", JSONSTRING);
    
            el.addEventListener("click", function() {
                if( document.getElementById("panelframe").classList.contains("configmode")) {
                    LXNAV.editConfig(this);
                }
            })
        })
    
        /* Form Action in config-Panel - prepare and set userconfig to data-attribute */
        document.querySelector("#cellconfig").addEventListener("submit", function(e) {
            e.preventDefault();

            let currentconfig = {
                "back": document.querySelector("#cell-background").value,
                "backneg": document.querySelector("#cell-backgroundneg").value,
                "text": document.querySelector("#cell-text").value,
                "value": document.querySelector("#cell-value").value,
                "forceunit": document.querySelector("#forceunit input:checked").value
            }
    
            let cellid = this.getAttribute("data-cellrelation");
    
            if(currentconfig.value == "none") {
                /* Nothing to display, so clear the cell */
                document.getElementById(cellid).querySelector(".label").innerHTML = "";
                document.getElementById(cellid).querySelector(".number").innerHTML = "";
                document.getElementById(cellid).querySelector(".unit").innerHTML = "";
            }
    
            if( cellid != "" ) {
                document.getElementById(cellid).setAttribute("data-userconfig", JSON.stringify(currentconfig));
                SetStoredData("discus_" + cellid, JSON.stringify(currentconfig));
            }
    
            document.querySelector("#cellconfigpanel").style.display = "none";
        })
    
        document.querySelector("#configreset").addEventListener("click", function(e) {
            e.preventDefault();
            document.querySelector("#cellconfigpanel").style.display = "none";
        })
    
        document.querySelector("#resetall").addEventListener("click", function(e) {
            console.log("resetting all datafields");
            document.querySelectorAll(".datacells_top .datacell, .datacells_bottom .datacell").forEach((el)=>{
                let cellid = el.getAttribute("id");
                console.log(cellid);
                el.setAttribute("data-userconfig","");
                SetStoredData("discus_" + cellid, "");
            })
        })
    
        /* Simulate colorpickers, since webview doesnt support html5 input types */
    
        const rgba2hex = (rgba) => `#${rgba.match(/^rgba?\((\d+),\s*(\d+),\s*(\d+)(?:,\s*(\d+\.{0,1}\d*))?\)$/).slice(1).map((n, i) => (i === 3 ? Math.round(parseFloat(n) * 255) : parseFloat(n)).toString(16).padStart(2, '0').replace('NaN', '')).join('')}`
    
        document.querySelectorAll(".colorpatch").forEach((el) => {
            el.addEventListener("click", (e)=> {
                let thiscolor = rgba2hex(e.target.style.backgroundColor);
                e.target.parentNode.parentNode.querySelector("input").value = thiscolor;
                e.target.parentNode.parentNode.querySelector("input").dispatchEvent(new Event('change'));
            })
        })
    
        document.querySelectorAll(".colorpicker input").forEach((picker) => {
            picker.addEventListener("change", (e) => {
                e.target.parentNode.querySelector(".colorpatches").style.backgroundColor = e.target.value;
            })
        })
    
        /* Populate config-form with all available Variables. Maybe later grouped with optgroup or even split into different selects */
    
        for(var variable in this.instrument.vars) {
            let thisvar = this.instrument.vars[variable];
            let thisentry = document.createElement("option");
            thisentry.setAttribute("value", variable);
            thisentry.text = thisvar.longlabel;
    
            document.querySelector("#cell-value").appendChild(thisentry);
        }
    
        
        
        document.getElementById("wp_back").addEventListener("click", function() {
            if(B21_SOARING_ENGINE.task_index() > 0) {
                B21_SOARING_ENGINE.change_wp(-1);
            }
        })
    
        document.getElementById("wp_next").addEventListener("click", function() {
            if(B21_SOARING_ENGINE.task_index() < B21_SOARING_ENGINE.task_length() -1 ) {
                B21_SOARING_ENGINE.change_wp(1);
            }
        })
        
    }

    editConfig(el) {
        /* read current cell confiuguration and prepare config-panel */
        let currentconfigstr = el.getAttribute("data-userconfig") != "" ? el.getAttribute("data-userconfig") : el.getAttribute("data-default");
        
        let currentconfig = currentconfigstr != null ? JSON.parse(currentconfigstr) : {"back": "#000000", "backneg": "#000000","text": "#ffffff", "value": "none"};
        
        document.querySelector("#cell-background").value = currentconfig.back;
        document.querySelector("#cell-backgroundneg").value = currentconfig.backneg;
        document.querySelector("#cell-text").value = currentconfig.text;

        if(currentconfig.forceunit == "metric") {
            document.querySelector("#forceunit-metric").setAttribute("checked", "checked");
        } else if (currentconfig.forceunit == "imperial") {
            document.querySelector("#forceunit-imperial").setAttribute("checked", "checked");
        } else {
            document.querySelector("#forceunit-none").setAttribute("checked", "checked");
        }
        
        let options = document.querySelectorAll("#cell-value option");
        let selectedoption = 0;

        for(var i = 0; i < options.length; i++) {
            if(options[i].value == currentconfig.value) { selectedoption = i}
        }

        document.querySelector("#cell-value").selectedIndex = selectedoption;

        document.querySelector("#cellconfigpanel").style.display = "block";
        document.querySelector("#cellconfig").setAttribute("data-cellrelation", el.getAttribute("id"));
    }

    resetPages() {
        this.panelframe.style.transform = "translate(0,0)";
        this.panels[0].querySelector(".pageframe").style.transform = "translate(0px, 0px)";
    }

    pageRight() {
        this.pages[this.pagepos_x][this.pagepos_y].classList.remove("current");
        this.panels[this.pagepos_x].querySelector(".pageframe").style.transform = "translate(0px, 0px)";
        this.pagepos_y = 0;
        this.pagepos_x = this.pagepos_x >= this.pages.length-1 ? 0 : this.pagepos_x + 1;
        this.panelframe.style.transform = "translate(-" + (this.pagepos_x * this.pagewidth) +"px,0)";
        this.updatePageClasses(this.pagepos_x,this.pagepos_y);
    }

    pageLeft() {
        this.pages[this.pagepos_x][this.pagepos_y].classList.remove("current");
        this.panels[this.pagepos_x].querySelector(".pageframe").style.transform = "translate(0px, 0px)";
        this.pagepos_y = 0;
        this.pagepos_x = this.pagepos_x <= 0 ? this.pages.length-1 : this.pagepos_x - 1;
        this.panelframe.style.transform = "translate(-" + (this.pagepos_x * this.pagewidth) +"px,0)";
        this.updatePageClasses(this.pagepos_x,this.pagepos_y);
    }

    pageDown() {
        if(this.pagepos_y >= this.pages[this.pagepos_x].length -1) { return }
        this.pages[this.pagepos_x][this.pagepos_y].classList.remove("current");
        this.pagepos_y++;
        this.panels[this.pagepos_x].querySelector(".pageframe").style.transform = "translate(0px, -" + (this.pagepos_y * this.pageheight) + "px)";
        this.updatePageClasses(this.pagepos_x,this.pagepos_y);
    }

    pageUp() {
        if(this.pagepos_y <= 0) { return }
        this.pages[this.pagepos_x][this.pagepos_y].classList.remove("current");
        this.pagepos_y--;
        this.panels[this.pagepos_x].querySelector(".pageframe").style.transform = "translate(0px, -" + (this.pagepos_y * this.pageheight) + "px)";
        this.updatePageClasses(this.pagepos_x,this.pagepos_y);
    }

    updatePageClasses(x,y) {
        this.pages[this.pagepos_x][this.pagepos_y].classList.add("current");
        if(this.pages[this.pagepos_x][this.pagepos_y].querySelector(".datacells_top") != null) {
            document.querySelectorAll(".mapbutton").forEach((e) => {
                e.style.display = "block";
            })
            document.querySelector("#hawk").style.display = document.querySelector("#hawk").classList.contains("active") ? "block" : "none";
            document.querySelector(".speedgauge").style.display = "block";
        } else {
            document.querySelectorAll(".mapbutton").forEach((e) => {
                e.style.display = "none";
            })
            document.querySelector("#hawk").style.display = "none";
            document.querySelector(".speedgauge").style.display = "none";
        }
    }

}













