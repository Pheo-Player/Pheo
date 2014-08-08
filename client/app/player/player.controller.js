angular.module('pheoApp')
	.controller('playerController', ['playerService', function(playerService) {
		this.filePath = '/home/chipf0rk/Music/Wildest Dreams/Wildest Dreams/1. Wildest Dreams - Rollerskates.mp3';

		this.loadFile = function() {
			playerService.loadFile(this.filePath);
		}
	}]);