angular.module('pheoApp')
	.service('playerService', [function () {
		var player, asset, buffer;

		this.loadFile = function(path) {
			asset = AV.Asset.fromFile(File(path));
			player = new AV.Player(asset);

			asset.on('metadata', function(data) {
				console.log(data);
			});
			asset.start();
			// fs.readFile(path, function(err, data) {
			// 	if(err) throw err;

			// 	if(player) {
			// 		player.stop();
			// 		delete player;
			// 	}

			// 	buffer = new AV.Buffer(data);
			// 	asset = AV.Asset.fromBuffer(buffer);
			// 	player = new AV.Player(asset);

			// 	asset.on('metadata', function(data) {
			// 		console.log(data);
			// 	});
			// 	asset.start();
			// });
		};

		var playing = false;
		this.playPause = function() {
			if(player) {
				if(playing)
					player.pause();
				else
					player.play();

				playing = !playing;
			}
			else {
				throw 'No player defined';
			}
		};
	}]);