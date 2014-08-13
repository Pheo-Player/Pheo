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