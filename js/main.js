var file = require('file.js');
var gui = require('nw.gui');

// MENU


// HELPER
function clickInput (id) {
	var event = document.createEvent('MouseEvents');
	event.initMouseEvent('click');
	document.getElementById(id).dispatchEvent(event);
}

// KEY COMBINATION LISTENER
document.addEventListener('keyup', function onKeyUp(e) {
	if (e.ctrlKey) {
		if (e.keyCode == 'O'.charCodeAt(0)) {
			clickInput('open');
		}
		else if (e.keyCode == 'S'.charCodeAt(0)) {
			clickInput('save');
		}
	}
});


document.getElementById('open').addEventListener('change', function onOpenChange(e) {
	file.open(this.value, document);
});
document.getElementById('save').addEventListener('change', function onSaveChange(e) {
	file.save(this.value, document);
});