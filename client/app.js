angular.module('pheoApp', []);
angular.module('pheoApp')
	.service('AudioAssetSvc', ['$http', '$q', function($http, $q) {
		/**
		 * Creates a new AV.Asset from a given file path.
		 * @param  {string} path The path of the audio asset.
		 * @return {promise} A promise that resolves with the asset, and rejects with any thrown exception.
		 */
		this.fromPath = function(path) {
			var deferred = $q.defer();

			try {
				console.log('fromPath');
				var asset = AV.Asset.fromURL('http://localhost:52430/file?path='+path);
				deferred.resolve(asset);
			} catch(e) {
				deferred.reject(e);
			}

			return deferred.promise;
		};
	}]);
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
angular.module('pheoApp')
	.service('PlayerSvc', ['AudioAssetSvc', '$q', function (AudioAssetSvc, $q) {
		var self = this;

		// Keep reference to the AV.Player.
		var player = null;

		// Remember the current (last loaded) path.
		// We use this if the player.stop() and player.play() are called subsequently,
		// as we will need to load the asset anew in this case.
		var currentPath = '';

		/**
		 * Starts/resumes playback. This is a wrapper around AV.Player's play function
		 * that also handles player.stop() and player.play() being called subsequently.
		 */
		function play() {
			var deferred = $q.defer();

			try {
				if(player) {
					// Play if the player exists and has an active asset.
					player.play();
				}
				else if(currentPath !== '') {
					// Reload the asset from the last used path if it is not active,
					// then start playback on the new player.
					self.loadFile(currentPath)
						.then(function() {
							player.play();
							deferred.resolve(player);
						}, function(e) {
							// TODO handle error
							throw e;
						});
				}
				else {
					// TODO
					throw new Error('No file path is specified.');
				}
			} catch(e) {
				deferred.reject(e);
			}

			return deferred.promise;
		}

		/**
		 * Loads an audio file by path.
		 * @param  {string} path The file's path as a simple string.
		 * @param  {function} callback A function that will be called after the file is successfully loaded.
		 */
		this.loadFile = function(path) {
			var deferred = $q.defer();

			try {
				// remember path (see currentPath declaration for an explanation)
				currentPath = path;

				AudioAssetSvc.fromPath(path)
					.then(function(asset) {
						// Replace the current AV.Player as soon as the asset is loaded.
						if(player) player.stop();
						player = new AV.Player(asset);
						deferred.resolve(asset);
					}, function(e) {
						// TODO proper error handling
						console.log('!!!', e);
						throw e;
					});
			} catch(e) {
				deferred.reject(e);
			}

			return deferred.promise;
		};

		/**
		 * Stops playback.
		 * @return {boolean} If playback could be stopped.
		 */
		this.stop = function() {
			if(player) {
				player.stop();
				return true;
			}

			return false;
		};

		/**
		 * Toggles play/pause state of the current AV.Player.
		 */
		this.playPause = function() {
			if(player) {
				if(player.playing)
					player.pause(); // use the player's pause function.
				else {
					// use our custom play() wrapper function.
					play()
						.then(function() {
							console.log('playing');
						}, function(e) {
							// TODO
							console.log('Failure on calling play()');
							throw e;
						});
				}
			}
			else {
				// TODO
				throw new Error('No player active!');
			}
		};

		/**
		 * Returns the play state of the current AV.Player
		 * @return {Boolean} Play state of the current AV.Player
		 */
		this.isPlaying = function() {
			return player && player.playing;
		};
	}]);
//# sourceMappingURL=app.js.map