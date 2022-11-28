const Browser = require('./Modules/PlayerNotify/js/browser.js');
let borwserntf = new Browser("Notify", "package://Modules/PlayerNotify/index.html");

mp.events.add("client:sendplayernotify", (title, message, color, time) => {
	borwserntf.callFunction("sendMessage", title, message, color, time);
});