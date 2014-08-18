module.exports = function(config) {
	config.set({
		basePath: 'client/',
		frameworks: ['jasmine'],

		files: [
			'bower_components/lodash/dist/lodash.js',
			'bower_components/angular/angular.min.js',
			'bower_components/angular-mocks/angular-mocks.js',
			'app/pheo-app.js',
			'app/**/*.js'
		],

		exclude: [],
		port: 7357, // 7357=TEST
		logLevel: config.LOG_INFO,
		autoWatch: true,
		browsers: ['Chrome'],
		singleRun: false
	});
};