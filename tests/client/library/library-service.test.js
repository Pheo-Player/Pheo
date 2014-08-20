describe('Library Service', function() {
	beforeEach(module('pheoApp'));

	// Tested objects
	var libSvc;

	// Mock angular objects
	var httpMock;

	// Mock values and objects
	var a0t1 = {"file":"/path/lo.mp3","mtime":"2014-08-01T00:00:00.000Z","_id":"Shimeldimeldidum","metadata":{"title":"Lo","artist":["Bobby and the Tests"],"albumartist":[],"album":"Hi / Lo","year":"2014","track":{"no":1,"of":0},"genre":["Retrofunk"],"disk":{"no":0,"of":0},"duration":0}},
	a0t2 = {"file":"/path/hi.mp3","mtime":"2014-08-01T00:00:00.000Z","_id":"ShaKar0nSh4kArOn","metadata":{"title":"Hi","artist":["Bobby and the Tests"],"albumartist":[],"album":"Hi / Lo","year":"2014","track":{"no":2,"of":0},"genre":["Neue Dauer Welle"],"disk":{"no":0,"of":0},"duration":0}},

	a1t1 = {"file":"/path/noalbum.mp3","mtime":"2014-06-20T00:00:00.000Z","_id":"ThisHasNoAlbumYo","metadata":{"title":"Track without an album","artist":["Dawg"],"albumartist":[""],"album":"","year":"1979","track":{"no":0,"of":0},"genre":[""],"disk":{"no":0,"of":0},"duration":0}},

	a2t1 = {"file":"/path/notracknoa.mp3","mtime":"2014-06-20T00:00:00.000Z","_id":"ThisHasNoTrackNo","metadata":{"title":"Track without a number","artist":["Dawg"],"albumartist":[""],"album":"Unsorted Album","year":"1979","track":{"no":0,"of":0},"genre":[""],"disk":{"no":0,"of":0},"duration":0}},
	a2t2 = {"file":"/path/notracknob.mp3","mtime":"2014-06-20T00:00:00.000Z","_id":"ThatHasNoTrackNo", "metadata":{"title":"Song without a number","artist":["Dawg"],"albumartist":[""],"album":"Unsorted Album","year":"1979","track":{"no":0,"of":0},"genre":[""],"disk":{"no":0,"of":0},"duration":0}},

	a3t1 = {"file":"/path/compilationa.mp3","mtime":"2014-07-01T00:00:00.000Z","_id":"DieWutzIstFettJa","metadata":{"title":"Before It Was Cool","artist":["The Books"],"albumartist":["Various Artists"],"album":"Nase","year":"2011","track":{"no":1,"of":2},"genre":["Some Hipster shit"],"disk":{"no":0,"of":0},"duration":0}},
	a3t2 = {"file":"/path/compilationb.mp3","mtime":"2014-06-20T00:00:00.000Z","_id":"OstfriesenGold1a","metadata":{"title":"Ostfriesengold","artist":["Someone"],"albumartist":["Various Artists"],"album":"Nase","year":"2011","track":{"no":2,"of":2},"genre":["Some Hipster shit"],"disk":{"no":0,"of":0},"duration":0}};
	var mockLibrary = _.shuffle([ // random initial sorting
		a0t1, a0t2, a1t1, a2t1, a2t2, a3t1, a3t2
	]);

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

		it('should sort the albums first by artist', function(done) {
			libSvc.getAlbums()
			.then(function(albums) {
				expect(albums[0].artist).toEqual('Bobby and the Tests');
				expect(albums[1].artist).toEqual('Dawg');
				expect(albums[2].artist).toEqual('Dawg');
				expect(albums[3].artist).toEqual('Various Artists');
			}).finally(done);

			httpMock.flush();
		});

		it('should sort the albums second by album name', function(done) {
			libSvc.getAlbums()
			.then(function(albums) {
				expect(albums[1].name).toEqual('');
				expect(albums[2].name).toEqual('Unsorted Album')
			}).finally(done);

			httpMock.flush();
		});

		it("should sort each album's tracks first by tracknumber, then by name", function(done) {
			libSvc.getAlbums()
			.then(function(albums) {
				expect(albums[0].tracks).toEqual([a0t1, a0t2]);
				expect(albums[2].tracks).toEqual([a2t2, a2t1]);
			}).finally(done);

			httpMock.flush();
		});

		it("should sort each album's tracks second by title", function(done) {
			libSvc.getAlbums()
			.then(function(albums) {
				expect()
			}).finally(done);

			httpMock.flush();
		});
	});
});