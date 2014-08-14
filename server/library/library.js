var Datastore = require('nedb'),

    fs = require('fs'),
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

	self.refreshMetadata = function(changedFiles) {
		var activeRefreshes = 0;

		async.each(changedFiles, function(file, cb) {
			activeRefreshes++;

			var parser = mmd(fs.createReadStream(file));
			parser.on('metadata', function(data) {
				delete data.picture;

				library.update(
					{ file: file },
					{ $set: { metadata: data } },
					{},
					function() {
						if(--activeRefreshes == 0) {
							console.log('Refreshed all metadata in library folder.');
							library.persistence.compactDatafile();
						}

						cb();
					}
				);
			});
			parser.on('done', function(err) {
				if(err) {
					if(--activeRefreshes == 0) {
						console.log('Refreshed all metadata in library folder.');
						library.persistence.compactDatafile();
					}

					cb();
				}
			});
		}, function(err) {
			if(err) throw err;
		});
	};

	self.checkAndUpdateTimestamps = function() {
		var deferred = q.defer();

		var activeRefreshes = 0;
		var changedFiles = [];

		dive(lib_path, function(err, file) {
			if(err) {
				throw err;
			}

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
		});

		return deferred.promise;
	};

	self.init = function() {
		self.checkAndUpdateTimestamps()
			.then(function(changedFiles) {
				self.refreshMetadata(changedFiles);
			});
	};
}

module.exports = Library;