var express = require('express');
var app = express();
var fs = require('fs');
var mime = require('mime');

app.set('port', process.env.PORT || 52430); // 52430='SPHEO

/** LIBS **/
var fortunes = require('./lib/fortunes.js');

/** ROUTES **/
app.get('/', function(req, res) {
	res.send('Pheo is running! <3');
});

app.get('/file', function(req, res) {
	path = req.query.path;

	if(path === '') {
		res.status(404);
		return;
	}

	// TODO library path
	if(path.indexOf('/home/chipf0rk/Music') !== 0) {
		res.status(403);
		return;
	}

	fs.readFile(path, function(err, data) {
		if(err) {
			res.status(500);
			return;
		}

		var stat = fs.statSync(path);
		res.writeHead(200, {
			'Content-Type': mime.lookup(path),
			'Content-Length': stat.size
		});

		var readStream = fs.createReadStream(path);
		readStream.pipe(res);

		console.info('Streaming', path);
	});
});

// 404
app.use(function(req, res) {
	res.status(404);
});

// 500
app.use(function(err, req, res, next) {
	console.error(err.stack);
	res.status(500);
});


/** APP ENTRY POINT **/
app.listen(app.get('port'), function() {
	console.log('Express started on http://localhost:' +
		app.get('port') + '; press Ctrl-C to terminate.');
});