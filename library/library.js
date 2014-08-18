var Datastore = require('nedb'),

    fs = require('fs'),
    path = require('path'),
    dive = require('dive'),

    q = require('q'),
    async = require('async'),
    mmd = require('musicmetadata');

// The default concurrency of the queue operations
var CONCURRENCY = 5;

/**
 * The constructor function for the library.
 * @param {string} lib_path The path in the file system where our music files are
 * @param {string} dbfile The filename where the database file is located
 */
function Library(lib_path, dbfile) {
	var self = this;

	/// Public API
	self.get = get;

	// Cached objects that will be set once and retrieved immediately thereafter
	var status = {
		initialised: false,
		initPromise: null
	};

	/// Create the library database object from the dbfile
	if(lib_path === undefined) throw new Error('lib_path is not set!');
	// Load the datastore from the file as set in the config
	var database = new Datastore({
		filename: dbfile,
		autoload: true
	});
	// Ensure indexing for the file[name] field in the datastore
	database.ensureIndex({ fieldName: "file", unique: true }, function (err) {
		if(err) throw err;
	});

	/// Always initialise on server start
	init();

	/**
	 * Retrieves the initialised library database.
	 * Returns a promise, because this database will not be available immediately.
	 * @return {promise} A promise to retrieve the library database
	 */
	function get() {
		if(status.initialised) {
			var deferred = q.defer();
			deferred.resolve(database);
			return deferred.promise;
		}
		else {
			return init();
		}
	}

	/**
	 * Initialises the library.
	 * At the moment, this means:
	 * - it checks for changed files since the last start
	 * - it updates the metadata in the db for all changed files
	 * @return {promise} A promise to initialise the library
	 */
	function init() {
		// If there is no currently running init promise, create one
		if(!status.initPromise) {
			var deferred = q.defer();
			status.initPromise = deferred.promise;

			// Check and update the timestamps,
			// then refresh metadata in the db for all changed files
			// When this is done, resolve with the initialised library object
			checkAndUpdateTimestamps(database)
			.then(function(changedFiles) {
				refreshMetadata(database, changedFiles)
				.then(function() {
					deferred.resolve(database);

					// reset initPromise so this will execute again
					// URGENT TODO this induces awkward behaviour at the moment
					status.initPromise = null;
				}, function(err) { deferred.reject(err); });
			}, function(err) { deferred.reject(err); });
		}

		return status.initPromise;
	};

	// TODO delete missing files from the database
	/**
	 * Compares the stored mtime of all database entries with
	 * the actual mtime of all music files in the library directory.
	 * Resolve with an array of all changed files, and update
	 * all differing timestamps in the database.
	 * @param  {object} database The library database
	 * @return {promise} A promise that resolves with all changed files
	 */
	function checkAndUpdateTimestamps(database) {
		// Remember current time for duration calculation
		var startTime = new Date();
		// We return the promise of this deferred
		var deferred = q.defer();

		// The files that have a different mtime stamp are stored in this array
		var changedFiles = [];

		// Create the async queue to refresh the timestamps
		var refreshQueue = async.queue(function(file, cb) {
			fs.stat(file, function(err, stat) {
				if(err) throw err;

				// Find the db entry with the given filename. The function also
				// executes when there was no such entry found, in which case savedFile
				// will be null. We use this to our advantage.
				database.findOne({ file: file }, function(err, savedFile) {
					if(err) throw err;

					// Read the last known stamp from the database,
					// and the current stamp from the file stat
					var savedStamp = savedFile && savedFile.mtime;
					var actualStamp = stat.mtime;

					// IF the file does not exist in the DB yet (!savedFile),
					// OR the saved and actual timestamps differ,
					// OR the database entry does not have any metadata,
					// push the current file to the changedFiles array

					// TODO push files with missing metadata to a different array (?)
					if(!savedFile ||
						(actualStamp.getTime() !== savedStamp.getTime()) ||
						!savedFile.metadata) {

						changedFiles.push(file);

						// After comparing the timestamps, we know which files have changed
						// and can update the last known timestamp for their DB entries
						database.update(
							{ file: file },
							{ $set: { file: file, mtime: stat.mtime } },
							{ upsert: true });
					}

					// We call back here, as there is no need to
					// wait for the update operations to complete
					cb();
				});

			});
		}, CONCURRENCY);

		// When the queue has completed,
		// - log the needed time
		// - compact the database
		// - resolve with an array of all changed files
		refreshQueue.drain = function() {
			console.log('Checked all timestamps in',
				(new Date() - startTime) / 1000 + 's');
			database.persistence.compactDatafile();
			deferred.resolve(changedFiles);
		};

		/// Dive through library directory and add all music files to the queue
		dive(lib_path, function(err, file) {
			if(err) throw err;

			// TODO better/more matchers for all supported extensions!
			var ext = path.extname(file);
			if(ext == '.mp3' ||
				ext == '.flac') {
				refreshQueue.push(file);
			}
		});

		return deferred.promise;
	};

	/**
	 * Refreshes the metadata inside a db for a given array of files.
	 * @param  {object} database The library datastore.
	 * @param  {array} files The array of affected files
	 * @return {promise} A promise to refresh the metadata, resolves with `files`.
	 */
	function refreshMetadata(database, files) {
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

			// Workaround for the case of zero-byte files
			// preventing the queue from completing.
			//
			// 'dataStreamed' is set to true when the 'data' event fires
			// (does not happen for 0byte files).
			//
			// When the stream ends, this variable is checked. If a zero-byte file
			// was detected, an angry console message will be logged
			// and the callback will be called. (The queue loves this!)
			var dataStreamed = false;
			stream.once('data', function() { dataStreamed = true; });
			stream.once('end', function() {
				if(!dataStreamed) {
					console.error(
						'Bullshit detector is running hot: File with 0 bytes found', file);
					cb();
				}
			});

			// Get metadata parser for the current file stream
			var parser = mmd(stream);

			// Listen for the metadata event to fire
			parser.once('metadata', function(data) {
				// Delete the picture property from the metadata,
				// as we don't want to cache this in the database.
				delete data.picture;

				// Update the file's db entry metadata and call
				// the queue callback when this operation finishes.
				database.update(
					{ file: file },
					{ $set: { metadata: data } },
					{},
					cb);
			});
			// Listen for the parser to be done.
			parser.once('done', function(err) {
				// Only fire the callback here when there was an error
				// reading the metadata. This is because if the metadata is read,
				// both the 'metadata' and 'done' events fire, thus the callback
				// would be called twice (which is illegal).
				if(err) {
					console.error(err, file);
					cb();
				}

				// Destroy the stream when the parser is done to save strain on
				// the file system.
				stream.destroy();
			});
		}, CONCURRENCY);

		// When the queue has completed:
		refreshQueue.drain = function() {
			// Log the time needed
			console.log('Refreshed all metadata in',
				(new Date() - startTime) / 1000 + 's');
			// Compact the database file
			database.persistence.compactDatafile();
			// Resolve the deferred with the array of changed files
			deferred.resolve(files);
		};

		// Save count of changed files
		var total = files.length;
		// Save current and previous percentages
		var currPercentage, prevPercentage;
		// Push all the changed files onto the queue
		refreshQueue.push(files, function() {
			// Compare previous and current percentage, then set previous percentage
			// We only want to log when percentage changes by at least 1/10th
			currPercentage = 10 * Math.floor(Math.floor((1 - (refreshQueue.length() / total)) * 10));
			if(currPercentage != prevPercentage) console.log('Refreshing metadata...', currPercentage + '%');
			prevPercentage = currPercentage;
		});

		return deferred.promise;
	};
}

module.exports = Library;