var CSS = {
	setCSS: function(e, settings) {
		for(var key in settings) {
			if (settings.hasOwnProperty(key)) {
				e.style[key] = settings[key];
			}
		}
	}
};