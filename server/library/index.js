var express = require('express'),
    app = express(),

    Library = require('./library');

var library = new Library();
library.init();

app.get('/library', function(req, res) {
	if(library.store) {
		library.store.find({}, function(err, data) {
			if(err) {
				res.status(500);
				res.end('Error while reading library');
			}

			res.json(data);
		});
	}
	else {
		res.status(404);
		res.end('Library is not ready');
	}
});

module.exports = app;