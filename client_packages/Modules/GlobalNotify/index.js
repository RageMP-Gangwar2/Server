const Browser = require('./Modules/GlobalNotify/js/browser.js');
let borwserntf = new Browser("Notify", "package://Modules/GlobalNotify/index.html");

mp.events.add("client:sendglobalnotify", (title, message, color, time) => {
	borwserntf.callFunction("sendGlobalMessage", title, message, color, time);
});