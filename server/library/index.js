var express = require('express'),
    app = express(),

    Library = require('./library');

var library = new Library();
library.populate();

app.get('/api/', function(req, res) {
	res.end('test');
});

module.exports = app;