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

		/*var mmm = require('mmmagic');
		var magic = new mmm.Magic();
		var ALLOWED_AUDIO_FORMATS = [
			'audio/basic',    // uLaw
			'audio/L24',      // LPCM
			'audio/mpeg',     // mp3
			'audio/ogg',      // ogg vorbis
			'audio/vorbis',   // vorbis
			'audio/vnd.wave', // WAV
			'audio/wav',      // WAV
			'audio/flac',     // FLAC
			'audio/alac'      // ALAC
		];*/
		/**
		 * Checks if a given buffer is in an audio format that can be decoded.
		 * @param {Buffer} buffer The data buffer to be checked
		 * @return {promise} A promise to fail with an exception, or resolve with the given buffer if data is decodable audio
		 */
		function checkType(buffer) {
			var deferred = $q.defer();

			try {
				// TODO actual checks as soon as mmmagic works
				
				// magic.detect(buf, function(err, result) {
				// 	if(err) throw err;

				// 	if(...) {
				// 		deferred.resolve(buf);
				// 	}
				// });
				
				deferred.resolve(buffer);
			} catch(e) {
				deferred.reject(e);
			}

			return deferred.promise;
		};
	}]);