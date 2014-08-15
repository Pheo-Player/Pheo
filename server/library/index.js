var express = require('express'),
    app = express(),

    Library = require('./library');

// Create and initialise the library
var library = new Library();
library.init();

// We will reuse this function any time accessing the library fails
function endWithLibraryError(res) {
	res.status(500);
	res.end('Error while reading library');
}

// Middleware to check if the library is ready for all requests
app.use(function(req, res, next) {
	if(!library.store) {
		res.status(404);
		res.end('Library is not ready');
	}
	else {
		next();
	}
});

// INDEX action
app.get('/library', function(req, res) {
	library.store.find({}, function(err, data) {
		if(err) endWithLibraryError(res);

		res.json(data);
	});
});

// READ action
app.get('/library/:id', function(req, res) {
	library.store.findOne({ _id: req.params.id }, function(err, data) {
		if(err) endWithLibraryError(res);
		if(data == null) {
			res.json({});
		}
		else {
			res.json(data);
		}
	});
});

module.exports = app;