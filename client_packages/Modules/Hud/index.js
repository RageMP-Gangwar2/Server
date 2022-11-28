let browser = null;

mp.events.add("Hud:open", (kills, death, kd, level, money) => {
	if (browser == null) {
		browser = mp.browsers.new("package://Modules/Hud/index.html");
		browser.execute("showHud();");
		browser.execute("SetDataHud('" + kills + "', '" + death + "', '" + kd + "', '" + level + "', '" + money + "');");
	}
});

mp.events.add("Hud:close", () => {
	if (browser != null) {
		browser.destroy();
		browser.execute("hideHud();");
		browser = null;
	}
});

mp.events.add("Hud:RefreshDataHud", (kills, death, kd, level, money) => {
	if (browser != null) {
		browser.execute("RefreshDataHud('" + kills + "', '" + death + "', '" + kd + "', '" + level + "', '" + money + "');");
	}
});


let speedo = mp.browsers.new("package://Modules/Hud/index.html");
let showed = false;
let player = mp.players.local;

mp.events.add('render', () => {
	if (player.vehicle && player.vehicle.getPedInSeat(-1) === player.handle) // Check if player is in vehicle and is driver
	{
		if (showed === false) // Check if speedo is already showed
		{
			speedo.execute("showSpeedo();");
			showed = true;
		}

		let kmhrow = player.vehicle.getSpeed() * 3.6;
		let kmh = Math.floor(kmhrow)
		speedo.execute(`RefreshDataVehHud(${kmh});`); // Send data do CEF
	}
	else {
		if (showed) {
			speedo.execute("hideSpeedo();");
			showed = false;
		}
	}
});

mp.events.add("Client:Admin:setAdutyOn", () => {
    mp.game.player.setInvincible(true);
    mp.nametags.enabled = true;

	browser.execute("showAduty();");
});

mp.events.add("Client:Admin:setAdutyOff", () => {
    mp.game.player.setInvincible(false);
    mp.nametags.enabled = false;

	browser.execute("hideAduty();");
});