let teamBrowser = null;
let teamInfo = [];

mp.events.add("Client:TeamBrowser:createBrowser", () => {
    if (teamBrowser == null) teamBrowser = mp.browsers.new("package://Modules/Fraktionsauswahl/index.html");

    setTimeout(() => {
        mp.gui.cursor.show(true, true);
    }, 50);
});

mp.events.add("Client:TeamBrowser:selectTeam", (teamId) => {
    if (teamId <= 0 || teamId == undefined) return;
    mp.events.callRemote("Server:TeamBrowser:selectTeam", parseInt(teamId));
});

mp.events.add("Client:TeamBrowser:destroyBrowser", () => {
    if (teamBrowser != null) {
        mp.gui.cursor.show(false, false);
        teamBrowser.destroy();
        teamBrowser = null;
    }
});

mp.keys.bind(0x71, true, function() {
    if (teamBrowser == null) teamBrowser = mp.browsers.new("package://Modules/Fraktionsauswahl/index.html");

    setTimeout(() => {
        mp.gui.cursor.show(true, true);
    }, 50);
});