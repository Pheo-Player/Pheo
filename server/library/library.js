var Datastore = require('nedb'),

    fs = require('fs'),
    dive = require('dive'),

    nconf = require('../nconf');

var lib_path = nconf.get('lib_path');

function Library() {
	var library = new Datastore({
		filename: __dirname + '/../' + nconf.get('dbfile'),
		autoload: true
	});

	this.populate = function() {
		dive(lib_path, function dive(err, file) {
			if(err) throw err;

			fs.stat(file, function(err, stat) {
				library.update(
					{ file: file },
					{ $set: { file: file, stat: stat } },
					{ upsert: true });
			});
		}, function diveFinished() {
			console.log("Dived through the library folder.");
		});
	};
}

module.exports = Library;