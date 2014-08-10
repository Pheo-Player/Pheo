module.exports = function(config) {
	config.set({
		basePath: '',

		frameworks: ['jasmine'],

		files: [
			'bower_components/angularjs/angular.min.js',
			'bower_components/angular-mocks/angular-mocks.js',
			'**/*.js'
		],

		exclude: [],

		port: 7357, // 7357=TEST

		logLevel: config.LOG_INFO,

		autoWatch: true,

		// browsers: ['Chrome'],

		singleRun: false
	});
};