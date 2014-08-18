angular.module('pheoApp')
.controller('PlayerController', ['PlayerSvc', function(PlayerSvc) {
	this.filePath = '';

	this.loadFile = function() {
		PlayerSvc.loadFile(this.filePath);
	};

	this.playPause = function() {
		PlayerSvc.playPause();
	};
	
	this.stop = function() {
		PlayerSvc.stop();
	};
}]);