describe('Library Controller', function() {
	beforeEach(module('pheoApp'));

	// Tested objects
	var libCtrl;

	// Mock angular objects
	var httpMock;

	// Mock values and objects
	var mockLibrary = [{"_id":"Shimeldimeldidum","metadata":{"title":"Lo","artist":["Bobby and the Tests"],"albumartist":[],"album":"Hi / Lo","year":"2014","track":{"no":1,"of":0},"genre":["Retrofunk"],"disk":{"no":0,"of":0},"duration":0}}];

	// Preparation
	beforeEach(inject(function($controller, $httpBackend) {
		libCtrl = $controller('LibraryController');

		httpMock = $httpBackend;
		httpMock.expectGET('/library').respond(200, mockLibrary);
	}));

	xit('should do stuff', function() {
	});
});