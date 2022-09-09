# lxn-dg808s
Replacement mod for the Touching Cloud DG808s Nav computer

<h2>New in this version</h2>

- New topographic map. Takes a few seconds to load initially. If map fails to load (i.e. no loading progress bar on startup), restart the flight (esc/restart).

- new and changed Keybindings (identical to bindings in the AS33 to make binding life easier): 
  - Next/previous waypoint: transponder(1000) inc/dec
  - Map Zoom +/-: transponder(10) inc/dec
  - Map toggle NorthUp/TrackUp: transponder(1) inc/dec 
  - Page switch left/right: COM1-Frequency whole inc/dec
  - Page switch up/down: COM1-Frequency farcture inc/dec
  
- New displayable variables: 
  - average task speed
  - Angle of attack
  - "Waypoint Delta Min". Shows estimated arrival height above minimum height is available, if no min height is set, arrival above waypoint height is shown.
  
- Visual stall warning
- Recommended flap speed calculation and display in speed tape: a colored bar is displayed on the left edge of the speed tape, indicating the recommended speed in grren when your speed is within this range, yellow, if you're outside. Recommended speeds depend on your carried ballast.
- Waypoint arrival height calculation on task page accounts for min height.
- Bugfix: Metric/Imperial-Setting is now persisted correctly. User setting in .flt-File is overridden
- Alert-Messages: Gear down with Ballast / Spoilers without gear extended below 600ft agl


<h2>Installation:</h2>
Simply drop the included folder "touchingcloud-aircraft-dg808s-lxn" into your community folder. No need to change anything in your existing installation. To uninstall delete the folder and you're "back to normal".

<h2>Basic Features:</h2>
All Information is organized in „pages“ (horizontally) and „sub-pages“ (vertically). Pages can be changed by „click and drag“ with the mouse or - more comfortably - through keybinding „transponder(100)“ for horizontal and transponder (1) for vertical scrolling. transponder(10) is used for map zoom.

Currently there are five main pages: „APT“ for navigation to the selected Airport, „WPT“ for navigating a task/flightplan, „TASK“ for the current state of the task, "Kinetic Assitant" for launching through KA and „CONFIG“ for Unit switching, ballast management and some system settings.

„APT“ Page automatically selects the nearest Airport as target. On the first subpage there's a bit of info abount that airport includung runway orientation and dimensions. The second subpage features a list of close airports where you can click any airport to select it for navigation. Click the selected airport again to return to "closest airport navigation". On the map a yellow line will be drawn from your glider to the selected airport to show the direction to fly.

"WPT" is similar, except the navigation target is the current waypoint of the loaded flightplan. Using the buttons in the headerbar waypoints can be selected. The map will also show a yellow course-line from your glider to the waypoint to indicate the direction to fly.

„APT“ and „WPT“ feature a maximum of 16 data fields each, that can be configured in game. The „tools“ button in the upper right hand corner of the map toggles „configuration mode“. Data fields are then marked with a light blue outline. Click any data field to bring up a popup, where you can set background color, text color and Information to be displayed. A second background color can be selected to be displayed when the displayed value <= 0 (e.g. switch background to red when arrival height is negative)

Data field Configurations are persistent between simulator sessions. Click „reset all“ in the configuration popup to reset all data fields to default. Configurations are also persitent with different versions of this mod, so if you used an oder version or install an update, your settings will be save. There is however a slight chance, that a variable name gets mixed up, so if you experience any erratic behaviour with the datafields, try "reset all" and see if that helps.

The task management system is Ian „B21“ Lewis’ Soaring Engine from the AS33. Some features like calculating glide ratios could not be recreated, as they are dependent of other instruments in the AS33. Others are still on the to do list.

The wind indicator in the center of the map is loosely based on the real world LX-„Hawk“ system displaying current (blue) and average (grey) wind-arrows and a green/red column indicator for the vertical wind component.

The Config-Page gives you access to various settings:

- Ballast: A light version of ballast loading system that can even be used in flight - which would be shameless cheating of course!
- Units: allows you to select the units of measurement to use for various categories or generally "metric" or "imperial" system. Only "metric" or "imperial" settings have an effect on other instruments in the cockpit. Detailled settings only work inside the nav computer.
- Interface Options: Settings for the Nav Interface. "Readability Mode" can be activated here to get some bigger readouts (and less data fields) and the liftdot-trail on the map can be deactivated
- Bugs: An experimental feature to control arrival height calculations. In real life gliders dead insects on the wing's leading edge will deteriorate glide perfomance. Therefore a "bug factor" can be used in arrival height calculations. While you won't kill any simulated insects on your simulated wings, you can still use this factor to account for inaccuracies in the flight model or inefficiencies of the pilot. If you find you are constantly arriving lower than the predicted altitude try flying with a lower "bugs" value. This value is not persistent between sessions, because we all know, that you are cleaning your wings after each flight. Values can range from 0 to 100, default for the DG808s is curently 80 - a value that produced acceptable results in na number of test flights. To point that out again: this setting does NOT affect your gliders performance in any way. ONLY the calculated arrival height.

All config settings apart from bugs and ballast are persistent between sessions. Just make sure to click "close" after making any changes.

<h2>Some more Details</h2>

The map view features a lot of information to help you optimize your flight:

- There are three thin lines pointing away from your glider:
  - the blue line is simply your plane's heading
  - the pink/magenta line is your gps ground track, the direction, your plane is travelling over the terrain. The stronger a crosswind, the more this will deviate from your heading.
  - the yellow line points to your current nav target. Depending on which page you are, this is the selected airport or the current waypoint. So as a rule of thumb: "put the pink on the yellow" and you're going where you are supposed to go ;-)

- Your loaded flightplan is diplayed as the current "task" in broader pink/magenta lines, circles and semi circles.
  - the active "leg" of the task is displayed in black/yellow stripes leading from the last waypoiont to the current one.
  - Semi circles indicate the start and finish lines of the task, where the task timer will start and stop automatically.
  - Small pink circles mark the turnpoints of the task. Entering the circle around the current waypoint will trigger the "waypoint ok" message and automatically switch to the next wp. But take a good look on the task page, if there are "Min/Max" values for the waypoint for altitude restrictions (usually for start and/or finish waypoints)
  - when flying towards a waypoint larger yellow circles will indicate certain distances from the waypoint to give a better orientation.

To make all this soaring task magic work, the flightplan needs to provide more information than usually present in MSFS generated flightplans. Easiest way to achieve that is to use B21's task planner to plan your flights: https://xp-soaring.github.io/tasks/b21_task_planner/index.html

MacCready setting can be changed by clicking the green "MC" button beneath the speed tape.

Why use that MacCready setting? There's a lot more theory around that than can be covered here, but on thing important: calculation of estimated arrival height and time enroute is based on the suggested speed to fly (indicated as STF under the speed tape instrument), which is in turn influenced by MacCready setting and carried ballast. In short: the more ballast and the higher MacCready, the higher the calculated speed to fly. The more your actual speed deviates from the calculated speed to fly, the less accurate your arrival height estimations will be. You can also turn that around: on final glide you can turn the MacCready value up and see the estimated arrival height go down (due to more sink at higher speeds) until you get a safe altitude estimation. Now your computer tells you the maximum speed to fly, that still gets you to finish safely.

<h2>Known Limitations:</h2>

Changing pages and subpages with "click and drag" in flight requires a lot of mouse handling skills :-) I recommend keybinding. Way up on the roadmap is using the rotary buttons aroud the screen for navigation as is in the real world device.

The map can not be panned. To avoid collision with „click and drag“ page changing another „mode switch“ would be needed. Considering the current quality of the ingame map, I don’t think it’s worth the added complexity.

„Thermalling help“ through the typical green and red dots is a very basic „quick and dirty“ implementation. So far it can not be toggled. As soon as you are in the air the dotted trail will show.

If you don't use a flightplan, the waypoint page uses the starting waypoint as "Home". This waypoint currently has no altitude, screwing up the estimation of arrival height above ground level in thie constellation.

<h2>Conflicts with other mods</h2>

Multiple mods changing the same aircraft are prone to conflict somehow. If you run into problems the first and easiest option is to decide, which modification is more important to you and remove the conflicting one. If you absolutely want to keep both, you can try to find out which files conflict. In the case of most livery modifications the conflicting file is the file panel.cfg, that is used to modify aircraft registration. This mod also changes panel.cfg. You can try to solve the conflict by either copying panel.cfg from this mod over to you livery completely, or only copy the section [VCockpit02] from this mod's panel.cfg and paste it to the same file in you livery mod. Sounds way more complicated than it is, but try it at your own risk, of course.

<h2>Developer Info:</h2>

If you have a basic understanding of what HTML, Javascript and CSS are, jump into the code and try your hand on it. There is no black magic involved :-)

The front end is intended to be easily extensible with new features. New pages and sub-pages can be added by simply copy/pasting the respective HTML-Structures.

All variables that are displayed in the frontend are stored in the „this.vars“-object. This object contains the value itself as well as unit- and label-information and make the variable user-selectable in the in game configuration popup. To add a new readout to your panel all you have to do is add a line to the „this.vars“-object with your own variable name and label/unit information. When you start the next flight, you can simply assign your variable value to a data field of your choice and if the variable value is manipulated somewhere in the javascript, the cockpit readout will be updated automatically.

If you need a variable displayed somewhere outside of the data fields, you can do so directly in the html using the attributes class=“livedata“ data-value=„VARIABLE“. See the total ballast readout in the "Ballast" configuration as an example.

Units: All variables are kept in a „base unit“, which is (currently) „imperial“ units. When displayed in a data field or as „livedata“ in the html the value is converted to the user preferred unit. So if you like to display a distance you should store nautical miles in the variable and conversion will be automatic.
