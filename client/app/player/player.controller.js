angular.module('pheoApp')
	.controller('PlayerController', ['PlayerSvc', function(PlayerSvc) {
		this.filePath = '/home/chipf0rk/Music/ppp.mp3';

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