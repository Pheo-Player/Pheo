describe('Library Service', function() {
	beforeEach(module('pheoApp'));

	// Tested objects
	var libSvc;

	// Mock angular objects
	var httpMock;

	// Mock values and objects
	var a0t1 = {"_id":"Shimeldimeldidum","metadata":{"title":"Lo","artist":["Bobby and the Tests"],"albumartist":[],"album":"Hi / Lo","year":"2014","track":{"no":1,"of":0},"genre":["Retrofunk"],"disk":{"no":0,"of":0},"duration":0}},
	a0t2 = {"_id":"ShaKar0nSh4kArOn","metadata":{"title":"Hi","artist":["Bobby and the Tests"],"albumartist":[],"album":"Hi / Lo","year":"2014","track":{"no":2,"of":0},"genre":["Neue Dauer Welle"],"disk":{"no":0,"of":0},"duration":0}},

	a1t1 = {"_id":"ThisHasNoAlbumYo","metadata":{"title":"Track without an album","artist":["Dawg"],"albumartist":[""],"album":"","year":"1979","track":{"no":0,"of":0},"genre":[""],"disk":{"no":0,"of":0},"duration":0}},

	a2t1 = {"_id":"ThisHasNoTrackNo","metadata":{"title":"Track without a number","artist":["Dawg"],"albumartist":[""],"album":"Unsorted Album","year":"1979","track":{"no":0,"of":0},"genre":[""],"disk":{"no":0,"of":0},"duration":0}},
	a2t2 = {"_id":"ThatHasNoTrackNo", "metadata":{"title":"Song without a number","artist":["Dawg"],"albumartist":[""],"album":"Unsorted Album","year":"1979","track":{"no":0,"of":0},"genre":[""],"disk":{"no":0,"of":0},"duration":0}},

	a3t1 = {"_id":"DieWutzIstFettJa","metadata":{"title":"Before It Was Cool","artist":["The Books"],"albumartist":["Various Artists"],"album":"Nase","year":"2011","track":{"no":1,"of":2},"genre":["Some Hipster shit"],"disk":{"no":0,"of":0},"duration":0}},
	a3t2 = {"_id":"OstfriesenGold1a","metadata":{"title":"Ostfriesengold","artist":["Someone"],"albumartist":["Various Artists"],"album":"Nase","year":"2011","track":{"no":2,"of":2},"genre":["Some Hipster shit"],"disk":{"no":0,"of":0},"duration":0}},

	a4t1 = {"_id":"ILikeToMakeUpIds","metadata":{"title":"Wurstwasser","artist":[],"albumartist":[],"album":"","year":"2011","track":{"no":0,"of":0},"genre":["Who knows"],"disk":{"no":0,"of":0},"duration":0}};

	// Mock library with random initial sorting
	var mockLibrary = _.shuffle([a0t1, a0t2, a1t1, a2t1, a2t2, a3t1, a3t2, a4t1]);

	// Preparation
	beforeEach(inject(function(LibrarySvc, $httpBackend) {
		libSvc = LibrarySvc;

		httpMock = $httpBackend;
		httpMock.expectGET('/library').respond(200, mockLibrary);
	}));

	it('should fetch the library via http and make it accessible publicly', function(done) {
		libSvc.getLibrary()
		.then(function(data) {
			expect(data).toDeepEqual(mockLibrary);
		}, function(err) {
			expect(undefined).toEqual(true);
		}).finally(done);

		httpMock.flush();
	});

	describe('getAlbums()', function() {
		it('should return something even if getLibrary() was not called before', function(done) {
			libSvc.getAlbums()
			.then(function(albums) {
				expect(albums).toBeTruthy();
			}).finally(done);

			httpMock.flush();
		});

		it('should replace unknown artist names with (Unknown)', function(done) {
			libSvc.getAlbums()
			.then(function(albums) {
				expect(albums[0].artist).toEqual('(Unknown)');
			}).finally(done);

			httpMock.flush();
		});

		it('should sort the albums first by artist', function(done) {
			libSvc.getAlbums()
			.then(function(albums) {
				expect(albums[1].artist).toEqual('Bobby and the Tests');
				expect(albums[2].artist).toEqual('Dawg');
				expect(albums[3].artist).toEqual('Dawg');
				expect(albums[4].artist).toEqual('Various Artists');
			}).finally(done);

			httpMock.flush();
		});

		it('should sort the albums second by album title', function(done) {
			libSvc.getAlbums()
			.then(function(albums) {
				expect(albums[2].title).toEqual('');
				expect(albums[3].title).toEqual('Unsorted Album')
			}).finally(done);

			httpMock.flush();
		});

		it("should sort each album's tracks first by tracknumber, then by name", function(done) {
			libSvc.getAlbums()
			.then(function(albums) {
				expect(albums[1].tracks).toEqual([a0t1, a0t2]);
				expect(albums[3].tracks).toEqual([a2t2, a2t1]);
			}).finally(done);

			httpMock.flush();
		});
	});
});