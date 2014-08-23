beforeEach(function() {
	var matchers = {
		toDeepEqual: function() {
			return {
				compare: function(actual, expected) {
					var result = {
						pass: _.isEqual(actual, expected)
					};
					return result;
				}
			};
		}
	};

	jasmine.addMatchers(matchers);
});