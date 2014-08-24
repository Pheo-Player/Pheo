angular.module('pheoApp')
.factory('LibrarySvc', ['$q', '$http', function($q, $http) {
	var library;

	return {
		getLibrary: getLibrary,
		getAlbums: getAlbums
	};

	function getLibrary() {
		var deferred = $q.defer();

		// If library has been fetched before, resolve with cached object
		if(library) {
			deferred.resolve(library);
		}
		// Else, fetch library from server, then resolve with library object
		else {
			$http.get('/library')
			.then(function(response) {
				library = response.data;
				deferred.resolve(library);
			}, function(err) {
				deferred.reject(err);
			});
		}

		return deferred.promise;
	}

	// TODO better logic for collaboration albums which don't have albumartist set
	function getAlbums() {
		var deferred = $q.defer();

		getLibrary()
		.then(function(library) {
			// Group all tracks in the library to an "album", by artist + album name
			var albums = _.chain(library)
			.reject(function(track) {
				return !track.metadata;
			})
			.groupBy(function(track) {
				var album = track.metadata.album;
				var artist = getActualArtist(
					track.metadata.albumartist, track.metadata.artist);

				// Concatenate artist and album name to have 'unique' identifiers
				return artist + '::' + album;
			})
			// Map each album array to an album object that holds basic info
			// (artist/title/year), and sort its tracks
			.map(function(tracks) {
				// Pick the first track to read the metadata of the whole album from
				var sampleTrack = tracks[0];

				// Sort the album's tracks by disk no, track no, then title
				var sortedTracks = _.sortBy(tracks, function(track) {
					return '' + track.metadata.disk.no +
					track.metadata.track.no +
					track.metadata.title;
				});

				return {
					artist: getActualArtist(
						sampleTrack.metadata.albumartist, sampleTrack.metadata.artist),
					title: sampleTrack.metadata.album,
					year: sampleTrack.metadata.year,
					imageCount: sampleTrack.imageCount,
					tracks: sortedTracks
				};
			})
			// Sort all albums case-insensitively by artist, then album title
			.sortBy(function(album) {
				return album.artist.toLowerCase() + album.title.toLowerCase();
			})
			.value();

			deferred.resolve(albums);
		}, function(err) {
			deferred.reject(err);
		});

		return deferred.promise;
	}

	function getActualArtist() {
		// Find the first non-empty value from arguments, in given order
		// Return a generic value if this yielded an empty value
		var possibleArtists = _.flatten(arguments);
		return _.find(possibleArtists) || '(Unknown)';
	}
}]);