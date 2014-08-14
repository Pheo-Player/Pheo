describe('AssetList Service', function() {
	beforeEach(module('pheoApp'));

	var assetListSvc;
	beforeEach(inject(function(AssetListSvc) {
		assetListSvc = AssetListSvc;
	}));

	it('should do things', function() {
		expect(true).toBeTruthy();
	});
});