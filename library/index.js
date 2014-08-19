var express = require('express'),
    app = express(),

    Library = require('./library'),

    nconf = require(__dirname + '/../config/nconf');

// Create and initialise the library
var lib_path = nconf.get('lib_path');
var dbfile = __dirname + '/../' + nconf.get('dbfile'); // TODO this ain't nice

// TODO handle this in the client on first startup
if(!lib_path) throw new Error('lib_path is not set!');

var library = new Library(lib_path, dbfile);

// We will reuse this function any time accessing the library fails
function endWithLibraryError(res) {
	res.status(500);
	res.end('Error while reading library');
}

// INDEX action
app.get('/library', function(req, res) {
	library.get().then(function(store) {
		store.find({}, function(err, data) {
			if(err) endWithLibraryError(res);

			res.json(data);
		});
	});
});

// READ action
app.get('/library/:id', function(req, res) {
	library.get().findOne({ _id: req.params.id }, function(err, data) {
		if(err) endWithLibraryError(res);
		if(data === null) {
			res.json({});
		}
		else {
			res.json(data);
		}
	});
});

module.exports = app;