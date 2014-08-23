module.exports = function(config) {
	config.set({
		basePath: '',
		frameworks: ['jasmine'],

		files: [
			'public/bower_components/lodash/dist/lodash.js',
			'public/bower_components/angular/angular.min.js',
			'public/bower_components/angular-mocks/angular-mocks.js',
			'public/app/pheo-app.js',
			'public/app/**/*.js',
			'tests/client/**/*.js'
		],

		exclude: [
			'public/app/app.js' // This is just the public/app directory concatenated
		],
		port: 7357, // 7357=TEST
		logLevel: config.LOG_INFO,
		autoWatch: true,
		browsers: ['Chrome'],
		singleRun: false
	});
};