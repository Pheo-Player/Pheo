var express = require('express'),
    app = express(),
    fs = require('fs'),
    path = require('path'),
    mime = require('mime');

app.set('port', process.env.PORT || 52430); // 52430='SPHEO

/** LIBS **/

/** ROUTES **/
app.get('/', function(req, res) {
	res.send('Pheo is running! <3');
});

app.get('/file', function(req, res) {
	var file_path = req.query.path.replace(/(?:\.\.)/g, '');

	console.log(file_path);

	fs.readFile(file_path, function(err, data) {
		if(err) {
			if(err.errno === 34) {
				res.status(404);
			}
			else {
				res.status(400);
			}

			res.end();
			return;
		}

		res.writeHead(200, {
			'Content-Type': mime.lookup(file_path)
		});

		var readStream = fs.createReadStream(file_path);
		
		readStream.on('open', function() {
			readStream.pipe(res);
		});
		readStream.on('error', function(err) {
			res.end(err);
		});
		readStream.on('end', function() {
			console.log('Streamed', file_path);
		});
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