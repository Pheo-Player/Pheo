angular.module('pheoApp')
.service('LibrarySvc', ['$q', '$http', function($q, $http) {
	var self = this;
	var library;

	self.getLibrary = function() {
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
	};

	// TODO better logic for collaboration albums which don't have albumartist set
	self.getAlbums = function() {
		var deferred = $q.defer();

		self.getLibrary()
		.then(function(library) {
			var albums = {};
			var albumsSorted = [];

			function addTitle(albums, track) {
				var meta = track.metadata;

				// Define a default string to use when values are unknown
				var unknownValue = '(Unknown)';
				// Cascading possible values for the album's artist:
				var actualArtist, actualAlbum;

				// Cycle through all albumartists first
				for(var i = 0, j = meta.albumartist.length; i < j; i++) {
					actualArtist = actualArtist || meta.albumartist[i];
				}
				// Then cycle through all artists
				for(i = 0, j = meta.artist.length; i < j; i++) {
					actualArtist = actualArtist || meta.artist[i];
				}
				// If all else fails, assign unknown value
				actualArtist = actualArtist || unknownValue;

				// Set album title
				actualAlbum = meta.album;

				// Concatenating artist and album name to have 'unique' identifiers
				var albumID = actualArtist + '::' + actualAlbum;
				// Create new object with albumID as index if it does not exist
				if(!albums[albumID]) {
					albums[albumID] = {
						name: actualAlbum,
						artist: actualArtist,
						year: meta.year,
						tracks: [],
					};
				}

				// Push the track onto the album with the given albumID
				albums[albumID].tracks.push(track);
			}

			// Cycle through all library entries and call addTitle on albums with each
			for(var i = 0, j = library.length; i < j; i++) {
				var entry = library[i];

				if(!entry.metadata) {
					// TODO write these to an array and notify the user of them
					console.log('No metadata for', entry);
					return;
				}

				addTitle(albums, entry);
			};

			// Sort all albums' tracks by track numbers,
			// and push each album onto the albumsSorted array to sort it afterwards
			for(albumName in albums) {
				if(albums.hasOwnProperty(albumName)) {
					var album = albums[albumName];

					album.tracks.sort(function(a, b) {
						var noA = a.metadata.track.no, noB = b.metadata.track.no;
						var titleA = a.metadata.title, titleB = b.metadata.title;

						// first by track number, then by title
						if(noA < noB) return -1;
						if(noA > noB) return 1;
						if(titleA > titleB) return -1;
						if(titleA < titleB) return 1;

						return 0;
					});

					albumsSorted.push(album);
				}
			};

			// Sort the albumsSorted array
			albumsSorted.sort(function(a, b) {
				var artistA = a.artist.toLowerCase(), artistB = b.artist.toLowerCase();
				var albumA = a.name.toLowerCase(), albumB = b.name.toLowerCase();

				// first by artist, then by album name
				if(artistA > artistB) return 1;
				if(artistA < artistB) return -1;
				if(albumA > albumB) return 1;
				if(albumA < albumB) return -1;

				return 0;
			});

			// Return the sorted album array,
			// each album holding tracks sorted by title number
			deferred.resolve(albumsSorted);
		}, function(err) {
			deferred.reject(err);
		});

		return deferred.promise;
	};
}]);