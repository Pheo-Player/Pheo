angular.module('pheoApp')
.controller('LibraryController', ['LibrarySvc', function(LibrarySvc) {
	var self = this;
	self.albums = [];

	LibrarySvc.getAlbums()
	.then(function(albums) {
		self.albums = albums;
	});
}]);