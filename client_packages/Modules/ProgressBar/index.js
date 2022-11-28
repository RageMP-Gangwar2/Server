let browser = null;

mp.events.add("ProgressBar:open", () => {
	if (browser == null) {
		browser = mp.browsers.new("package://Modules/ProgressBar/index.html");
	}
});

mp.events.add("ProgressBar:close", () => {
	if (browser != null) {
		browser.destroy();
		browser = null;
	}
});