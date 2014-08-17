describe('Library Service', function() {
	beforeEach(module('pheoApp'));

	// tested objects
	var libSvc;

	var a1t1 = {"file":"/path/hi.mp3","mtime":"2014-08-01T00:00:00.000Z","_id":"Shimeldimeldidum","metadata":{"title":"Hi","artist":["Bobby and the Tests"],"albumartist":[],"album":"Hi / Lo","year":"2014","track":{"no":1,"of":0},"genre":["Retrofunk"],"disk":{"no":0,"of":0},"duration":0}};
	var a1t2 = {"file":"/path/lo.mp3","mtime":"2014-08-01T00:00:00.000Z","_id":"ShaKar0nSh4kArOn","metadata":{"title":"Lo","artist":["Bobby and the Tests"],"albumartist":[],"album":"Hi / Lo","year":"2014","track":{"no":2,"of":0},"genre":["Neue Dauer Welle"],"disk":{"no":0,"of":0},"duration":0}};
	var a2t1 = {"file":"/path/single.mp3","mtime":"2014-07-01T00:00:00.000Z","_id":"DieWutzIstFettJa","metadata":{"title":"Before It Was Cool (Celebritydollars Remake)","artist":["The Books"],"albumartist":["Celebritydollars"],"album":"","year":"2011","track":{"no":1,"of":1},"genre":["Some Hipster shit"],"disk":{"no":0,"of":0},"duration":0}};

	// mock values and objects
	var mockLibrary = [a1t2, a2t1, a1t1]; // pseudo random sorting

	// mocked angular objects
	var httpMock;


	beforeEach(inject(function(LibrarySvc, $httpBackend) {
		libSvc = LibrarySvc;

		httpMock = $httpBackend;
		httpMock.expectGET('/library').respond(200, mockLibrary);
	}));


	it('fetches the library via http and makes it accessible publicly', function(done) {
		libSvc.loadLibrary()
			.then(function(data) {
				expect(_.isEqual(data, mockLibrary)).toEqual(true);
			}, function(err) {
				expect(undefined).toEqual(true);
			})
			.finally(done);

		httpMock.flush();
	});

	it('exposes a function that returns the library as a sorted collection of albums', function(done) {
		libSvc.loadLibrary()
			.then(function(data) {
				expect(_.isEqual(libSvc.getAlbums(), [
					{
						name: "Hi / Lo",
						artist: "Bobby and the Tests",
						year: "2014",
						tracks: [a1t1, a1t2],
					},
					{
						name: "",
						artist: "Celebritydollars",
						year: "2011",
						tracks: [a2t1]
					}
				])).toEqual(true);
			})
			.finally(done);

		httpMock.flush();
	});
});