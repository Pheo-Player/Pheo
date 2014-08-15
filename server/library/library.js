var Datastore = require('nedb'),

    fs = require('fs'),
    path = require('path'),
    dive = require('dive'),

    q = require('q'),
    async = require('async'),
    mmd = require('musicmetadata'),

    nconf = require('../config/nconf');

function Library() {
	var self = this;

	var lib_path = nconf.get('lib_path');
	if(lib_path === undefined) { throw 'lib_path is not set!'; }

	var library = new Datastore({
		filename: __dirname + '/../' + nconf.get('dbfile'),
		autoload: true
	});

	library.ensureIndex({ fieldName: "file", unique: true }, function (err) {
		if(err) throw err;
	});

	self.checkAndUpdateTimestamps = function() {
		var deferred = q.defer();

		var activeRefreshes = 0;
		var changedFiles = [];

		var ext;
		dive(lib_path, function(err, file) {
			if(err) {
				throw err;
			}

			ext = path.extname(file);
			if(ext == '.mp3' ||
				ext == '.flac') { // TODO better matchers
				activeRefreshes++;

				fs.stat(file, function(err, stat) {
					if(err) throw err;

					library.findOne({ file: file }, function(err, savedFile) {
						if(err) throw err;

						var savedStamp = savedFile && savedFile.mtime;
						var actualStamp = stat.mtime;

						if(!savedFile || (actualStamp.getTime() !== savedStamp.getTime())) {
							changedFiles.push(file);
						}
					});

					library.update(
						{ file: file },
						{ $set: { file: file, mtime: stat.mtime } },
						{ upsert: true },
						function() {
							if(--activeRefreshes == 0) {
								console.log('Refreshed all timestamps in library folder.');
								library.persistence.compactDatafile();
								deferred.resolve(changedFiles);
							}
						});
				});
			}
		});

		return deferred.promise;
	};

	self.refreshMetadata = function(changedFiles) {
		var startTime = new Date();
		var deferred = q.defer();

		var refreshQueue;
		refreshQueue = async.queue(function(file, cb) {
			var stream = fs.createReadStream(file);
			stream.on('error', function(err) {
				console.error('Reading metadata failed for', file + ':', err);
				deferred.reject(err);
			});

			var parser = mmd(stream);

			parser.on('metadata', function(data) {
				delete data.picture;

				library.update(
					{ file: file },
					{ $set: { metadata: data } },
					{},
					cb
				);
			});
			parser.on('done', function(err) {
				if(err) { cb(); }
				stream.destroy();
			});
		}, 5);

		refreshQueue.drain = function() {
			console.log('Refreshed all metadata.');
			library.persistence.compactDatafile();

			deferred.resolve('Refreshed all metadata');
			console.log('Took', (new Date() - startTime) / 1000, 's');
		};

		var finished = 0, total = changedFiles.length;
		refreshQueue.push(changedFiles, function() {
			finished++;
			console.log('finished', finished, 'of', total, '=', (finished*100.0 / total) + '%');
		});

		return deferred.promise;
	};

	self.init = function() {
		self.checkAndUpdateTimestamps()
		.then(function(changedFiles) {
			self.refreshMetadata(changedFiles)
			.then(function() {
				
			});
		});
	};
}

module.exports = Library;