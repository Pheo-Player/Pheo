var Datastore = require('nedb'),

    fs = require('fs'),
    path = require('path'),
    dive = require('dive'),

    q = require('q'),
    async = require('async'),
    mmd = require('musicmetadata'),

    nconf = require('../config/nconf');

// The default concurrency of the queue operations
var CONCURRENCY = 5;

function Library() {
	var self = this;

	// Get the library path from the config
	var lib_path = nconf.get('lib_path');
	if(lib_path === undefined) { throw 'lib_path is not set!'; }

	// Load the datastore from the file as set in the config
	var library = new Datastore({
		filename: __dirname + '/../' + nconf.get('dbfile'), // TODO this ain't nice
		autoload: true
	});
	// Ensure indexing for the file[name] field in the datastore
	library.ensureIndex({ fieldName: "file", unique: true }, function (err) {
		if(err) throw err;
	});

	// Keep a public reference to the datastore.
	self.store = null;

	self.checkAndUpdateTimestamps = function() {
		// Remember current time for duration calculation
		var startTime = new Date();
		// We return the promise of this deferred
		var deferred = q.defer();

		// The files that have a different mtime stamp (i.e. changed) are stored in this array
		var changedFiles = [];

		// Create the async queue to refresh the timestamps
		var refreshQueue = async.queue(function(file, cb) {
			fs.stat(file, function(err, stat) {
				if(err) throw err;

				// Find the file with the given filename
				library.findOne({ file: file }, function(err, savedFile) {
					if(err) throw err;

					// Read the last known stamp from the database
					var savedStamp = savedFile && savedFile.mtime;
					// Read the current stamp from the file stat
					var actualStamp = stat.mtime;

					// IF the file does not exist in the DB yet (!savedFile)
					// OR the saved and actual timestamps differ,
					// push the current file to the changedFiles array
					if(!savedFile || (actualStamp.getTime() !== savedStamp.getTime())) {
						changedFiles.push(file);
					}
				});

				// After comparing the timestamps, we know which files have changed
				// and can update the last known timestamp for their DB entries
				library.update(
					{ file: file },
					{ $set: { file: file, mtime: stat.mtime } },
					{ upsert: true },
					cb); // Call the callback function (for the queue) when the library update finishes
			});
		}, CONCURRENCY);

		// When the queue has completed:
		refreshQueue.drain = function() {
			// Log the time needed
			console.log('Refreshed all timestamps in', (new Date() - startTime) / 1000 + 's');
			// Compact the library file
			library.persistence.compactDatafile();
			// Resolve the deferred with the array of changed files
			deferred.resolve(changedFiles);
		};

		// Dive through the library directory
		dive(lib_path, function(err, file) {
			if(err) {
				throw err;
			}

			// Push all files with fitting extensions onto the queue
			var ext = path.extname(file);
			if(ext == '.mp3' ||
				ext == '.flac') { // TODO better matchers
				refreshQueue.push(file);
			}
		});

		return deferred.promise;
	};

	self.refreshMetadata = function(changedFiles) {
		// Remember current time for duration calculation
		var startTime = new Date();
		// We return the promise of this deferred
		var deferred = q.defer();

		// Create the async queue to refresh the metadata
		var refreshQueue = async.queue(function(file, cb) {
			// Create read stream for the current file
			var stream = fs.createReadStream(file);

			stream.on('error', function(err) {
				console.error('Reading metadata failed for', file + ':', err);
				deferred.reject(err);
			});

			// Get metadata parser for the current file stream
			var parser = mmd(stream);

			// Listen for the metadata event to fire
			parser.on('metadata', function(data) {
				// Delete the picture property from the metadata,
				// as we don't want to cache this in the database.
				delete data.picture;

				// Update the file's db entry metadata and call
				// the queue callback when this operation finishes.
				library.update(
					{ file: file },
					{ $set: { metadata: data } },
					{},
					cb);
			});
			// Listen for the parser to be done.
			parser.on('done', function(err) {
				// Only fire the callback here when there was an error
				// reading the metadata. This is because if the metadata is read,
				// both the 'metadata' and 'done' events fire, thus the callback
				// would be called twice (which is illegal).
				if(err) cb();

				// Destroy the stream when the parser is done to save strain on
				// the file system.
				stream.destroy();
			});
		}, CONCURRENCY);

		// When the queue has completed:
		refreshQueue.drain = function() {
			// Log the time needed
			console.log('Refreshed all metadata in', (new Date() - startTime) / 1000 + 's');
			// Compact the library file
			library.persistence.compactDatafile();
			// Resolve the deferred with the array of changed files
			deferred.resolve(changedFiles);
		};

		// Push all the changed files onto the queue
		refreshQueue.push(changedFiles);

		return deferred.promise;
	};

	self.init = function() {
		// Check and update the timestamps,
		self.checkAndUpdateTimestamps()
		.then(function(changedFiles) {
			// then refresh the metadata for all changed files
			self.refreshMetadata(changedFiles)
			.then(function() {
				// and only then make the initialized store
				// publicly available on this object
				self.store = library;
			});
		});
	};
}

module.exports = Library;