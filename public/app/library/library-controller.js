angular.module('pheoApp')
.controller('LibraryController', ['LibrarySvc', function(LibrarySvc) {
	var self = this;

	self.albums = [];
	self.getAlbums = getAlbums;

	getAlbums();

	function getAlbums() {
		LibrarySvc.getAlbums()
		.then(function(albums) {
			self.albums = albums;
		});
	}
}]);