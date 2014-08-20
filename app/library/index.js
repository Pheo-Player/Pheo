var express = require('express'),
    app = express(),

    fs = require('fs'),
    path = require('path'),

    _ = require('lodash-node/modern'),

    Library = require('./library'),

    nconf = require('../config/');

// Create and initialise the library
var lib_path = nconf.get('lib_path');
var dbfile = './' + nconf.get('dbfile'); // TODO this ain't nice

// TODO handle this in the client on first startup
if(!lib_path) throw new Error('lib_path is not set!');

var library = new Library(lib_path, dbfile);
var publicFields = { "metadata": 1 };

// We will reuse this function any time accessing the library fails
function endWithError(err) {
	this.status(500).end(err);
}

// INDEX action
app.get('/library', function(req, res) {
	library.get()
	.then(function(data) {
		res.json(data);
	}, endWithError.bind(res));
});

// READ action
app.get('/library/:id', function(req, res) {
	library.getOne(req.params.id)
	.then(function(data) {
		if(data === null) res.json({});
		else res.json(data);
	}, endWithError.bind(res));
});

// PLAY action
app.get('/library/:id/play', function(req, res) {
	library.getFilename(req.params.id)
	.then(function(filePath) {
		if(!filePath) res.status(404).end();

		fs.stat(filePath, function(err, stat) {
			if(err) throw err;

			res.type(path.extname(filePath));
			res.set({ 'Content-Length': stat.size });

			var readStream = fs.createReadStream(filePath);
			readStream.pipe(res);
			readStream.on('error', endWithError.bind(res));
		});
	}, endWithError.bind(res));
});

module.exports = app;