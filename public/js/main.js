(function() {
	if(window.require) {
		window.remote = require('remote');
		window.win = remote.getCurrentWindow();
		window.fs = require('fs');

		/** GLOBAL HOTKEYS **/
		window.addEventListener('keyup', function(e) {
			if (e.which === "R".charCodeAt(0) && (e.ctrlKey || e.metaKey)) {
				location.reload();
			} else if (e.keyCode === 123) {
				win.toggleDevTools();
			}
		});

		/** POLYMER **/
		// window.addEventListener('polymer-ready', function() {
		//   var drawer, drawerButton;
		//   drawerButton = document.getElementById('menu-toggle');
		//   drawer = document.getElementById('outer-drawer');
		//   drawerButton.addEventListener('click', function() {
		//     drawer.togglePanel();
		//   });
		// });

		/** TITLE BAR **/
		document.querySelector('#close-win').addEventListener('click', function(e) {
			win.close();
		});
		document.querySelector('#maximize-win').addEventListener('click', function(e) {
			if (win.isMaximized()) {
				win.unmaximize();
			} else {
				win.maximize();
			}
		});
		document.querySelector('#minimize-win').addEventListener('click', function(e) {
			win.minimize();
		});
	}
})();
