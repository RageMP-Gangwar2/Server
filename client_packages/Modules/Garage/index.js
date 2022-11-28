let garageBrowser = null;

mp.events.add("Client:garageBrowser:createBrowser", () => {
    if (garageBrowser == null) garageBrowser = mp.browsers.new("package://Modules/Garage/index.html");

    setTimeout(() => {
        mp.gui.cursor.show(true, true);
    }, 50);
});

mp.events.add("Client:garageBrowser:selectVehicle", (vehicleid) => {
    if (vehicleid <= 0 || vehicleid == undefined) return;
    mp.events.callRemote("Server:garageBrowser:selectVehicle", parseInt(vehicleid));
});

mp.events.add("Client:garageBrowser:destroyBrowser", () => {
    if (garageBrowser != null) {
        mp.gui.cursor.show(false, false);
        garageBrowser.destroy();
        garageBrowser = null;
    }
});