var remote = require('remote');
var win = remote.getCurrentWindow();

// Global key event listener, we will trigger things like playback control through media keys from here
document.addEventListener('keyup', function(e) {
	if(e.keyCode == "R".charCodeAt(0) && (e.ctrlKey || e.metaKey)) // reload on Ctrl+R / Cmd+R
		location.reload();
	else if(e.keyCode == 123) // Open Dev Tools on F12
		win.toggleDevTools();
});

// Prevent default drag&drop behaviour of changing location to dropped file
window.ondragover = function(e) { e.preventDefault(); return false };
window.ondrop = function(e) { e.preventDefault(); return false };

// Global listener to drag&drop events, we will trigger library imports from here
document.addEventListener('drop', function(e) {
	e.preventDefault();

	// Get the list of files that were dropped on the application
	var droppedFiles = e.dataTransfer.files;
	for(var i = 0; i < droppedFiles.length; i++) {
		// do something with each file
	}

	return false;
});


// --- should be extracted
document.querySelector('#closeWin').addEventListener('click', function(e) {
	console.log(e);
	win.close();
});
document.querySelector('#maximizeWin').addEventListener('click', function(e) {
	if(win.isMaximized())
		win.unmaximize();
	else
		win.maximize();
});
document.querySelector('#minimizeWin').addEventListener('click', function(e) {
	win.minimize();
});