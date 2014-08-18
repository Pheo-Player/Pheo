function pheoServer() {
	/** Dependencies **/
	// external
	var express = require('express'),
	    app = express(),

	    fs = require('fs');

	// local
	var libraryApp = require('./library');

	/** Config **/
	var conf = require('./config/nconf');
	app.set('port', conf.get('port'));

	/** Routes **/	
	app.use(express.static(__dirname + '/public'));
	app.use(libraryApp);

	app.use(function(req, res) {
		res.status(404);
		res.end();
	});
	app.use(function(err, req, res, next) {
		console.error(err.stack);
		res.status(500);
		res.end();
	});

	/** App Entry Point **/
	app.listen(app.get('port'), function() {
		console.log('PheoServer started on http://localhost:' +
			app.get('port') + '; press Ctrl-C to terminate.');
	});

	/** Cleanup & Save when exiting **/
	var beforeExit = function() {
		conf.save();
	};
	process.on('exit', beforeExit);
	process.on('SIGINT', function() {
		process.exit(1);
	});

	return app;
}

module.exports = pheoServer();