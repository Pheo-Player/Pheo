var express = require('express'),
    app = express(),

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
function endWithLibraryError(res, err) {
	var errorMsg = 'Error while reading library';
	if(err) errorMsg += ": " + err;
	res.status(500).end(errorMsg);
}

// INDEX action
app.get('/library', function(req, res) {
	library.get()
	.then(function(data) {
		res.json(data);
	}, function(err) {
		endWithLibraryError(res, err);
	});
});

// READ action
app.get('/library/:id', function(req, res) {
	library.getOne(req.params.id)
	.then(function(data) {
		if(data === null) res.json({});
		else res.json(data);
	}, function(err) {
		endWithLibraryError(res, err);
	});
});

module.exports = app;