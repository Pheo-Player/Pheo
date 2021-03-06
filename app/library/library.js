var Datastore = require('nedb'),

    fs = require('fs'),
    path = require('path'),
    glob = require('glob'),
    dive = require('dive'),

    _ = require('lodash-node/modern'),

    q = require('q'),
    async = require('async'),
    mmd = require('musicmetadata');

module.exports = Library;

/**
 * The constructor function for the library.
 * 
 * @param {string} lib_path The path in the file system where our music files are
 * @param {string} dbfile The filename where the database file is located
 */
function Library(lib_path, dbfile) {
	if(lib_path === undefined) throw new Error('lib_path is not set!');

	var self = this,
	    CONCURRENCY = 5,
	    publicFields = { metadata: 1 },

	    database = null,
	    initDeferred = q.defer(),
	    initPromise = initDeferred.promise;

	// API
	self.getAll = getAll;
	self.getOne = getOne;
	self.getFilename = getFilename;
	self.getImage = getImage;

	// Create the library database object from the dbfile
	database = getDatabase(dbfile);
	init(database, lib_path);

	/**
	 * Gets a database from a database file's path
	 * 
	 * @return {object}
	 */
	function getDatabase(dbfile) {
		// Load the datastore from the file as set in the config
		var database = new Datastore({
			filename: dbfile,
			autoload: true
		});
		// Ensure indexing for the file[name] field in the datastore
		database.ensureIndex({ fieldName: "file", unique: true }, function (err) {
			if(err) throw err;
		});

		return database;
	}

	/**
	 * Initialises the database and resolves the init deferred on success.
	 * 
	 * @return {Promise} A promise
	 */
	function init(database, lib_path) {
		// Check and update the timestamps,
		// then refresh metadata in the db for all changed files
		// When this is done, resolve with the initialised library object
		checkAndUpdateTimestamps(database, lib_path)
		.then(function refreshMeta(changedFiles) {
			refreshMetadata(database, changedFiles)
			.then(function initialised() {
				initDeferred.resolve(database);
			}, function(err) { initDeferred.reject(err); });
		}, function(err) { initDeferred.reject(err); });
	}

	/**
	 * Gets all database entries
	 * 
	 * @return {Promise} A promise
	 */
	function getAll() {
		var deferred = q.defer();

		initPromise
		.then(function(db) {
			db.find({}, publicFields, function(err, data) {
				if(err) deferred.reject(err);
				deferred.resolve(data);
			});
		}, function(err) {
			deferred.reject(err);
		});

		return deferred.promise;
	}

	/**
	 * Gets a single database entry by id
	 * 
	 * @param  {string} id The id of the database entry to return
	 * @return {Promise} A promise
	 */
	function getOne(id) {
		var deferred = q.defer();

		initPromise
		.then(function(db) {
			db.findOne({ _id: id }, publicFields, function(err, data) {
				if(err) deferred.reject(err);
				else deferred.resolve(data);
			});
		}, function(err) {
			deferred.reject(err);
		});

		return deferred.promise;
	}

	/**
	 * Retrieves the filename for a given entry id
	 * 
	 * @param  {string} id The id of the entry
	 * @return {Promise} A promise
	 */
	function getFilename(id) {
		var deferred = q.defer();

		initPromise
		.then(function(db) {
			db.findOne({ _id: id }, function(err, data) {
				if(err) deferred.reject(err);
				else deferred.resolve(data && data.file);
			});
		}, function(err) {
			deferred.reject(err);
		});

		return deferred.promise;
	}

	/**
	 * Gets the array of image information from an entry id.
	 * 
	 * @param  {string} id The id of the entry
	 * @return {Promise} A promise
	 */
	function getImageInfo(id) {
		var deferred = q.defer();

		initPromise
		.then(function(db) {
			db.findOne({ _id: id }, function(err, data) {
				if(err) deferred.reject(err);
				else deferred.resolve(data && data.images);
			});
		});

		return deferred.promise;
	}

	/**
	 * Gets a single image by index from an entry id.
	 * 
	 * @param  {string} id      The id of the entry
	 * @param  {number} imageid The index of the image
	 * @return {Promise} A promise
	 */
	function getImage(id, imageid) {
		var deferred = q.defer();

		getImageInfo(id)
		.then(function(images) {
			var image = images[imageid];

			if(!image) deferred.resolve(null);
			// Image stored in file metadata
			else if(image.in_file) {
				getFilename(id)
				.then(function(trackFilename) {
					if(!trackFilename) deferred.resolve(null);
					else {
						var readStream = fs.createReadStream(trackFilename);
						var parser = mmd(readStream);
						parser.on('metadata', function(data) {
							deferred.resolve(data.picture[image.index]);
						});
						parser.on('error', function(err) { deferred.reject(err); });
					}
				});
			}
			// External image file, stored in same folder as file
			else if(image.filename) {
				var imageFilename = image.filename;
				if(!imageFilename) deferred.resolve(null);
				// Stat to find out file size
				fs.stat(imageFilename, function(err, stat) {
					if(err) deferred.reject(err);
					// Open file to read
					fs.open(imageFilename, 'r', function(err, fd) {
						if(err) deferred.reject(err);
						// Read file to new buffer and resolve with this buffer
						var buffer = new Buffer(stat.size);
						fs.read(fd, buffer, 0, buffer.length, null,
							function(err, bytesRead, buffer) {
								deferred.resolve({
									format: path.extname(imageFilename),
									data: buffer
								});
							}
						);
					});
				});
			}
			else { deferred.resolve(null); }
		}, function(err) { deferred.reject(err); });

		return deferred.promise;
	}

	/**
	 * Compares the stored mtime of all database entries with
	 * the actual mtime of all music files in the library directory.
	 * Resolves with an array of all changed files, and updates
	 * all differing timestamps in the database.
	 * 
	 * @param  {object} database The library database
	 * @return {Promise} A promise
	 */
	function checkAndUpdateTimestamps(database, lib_path) {
		// TODO delete missing files from the database
		var deferred = q.defer();

		// The files that have been changed are stored in this array
		var changedFiles = [];

		/// Dive through library directory and add all music files to the queue
		var refreshQueue = createTimestampRefreshQueue(database, lib_path);
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


		/**
		 * Creates an async queue to refresh timestamps 
		 * 
		 * @param {object} database The database to refresh
		 * @param {string} lib_path The library path to dive through
		 * @return {object} The async queue
		 */
		function createTimestampRefreshQueue(database, lib_path) {
			console.time('TimestampRefreshQueue');

			var refreshQueue = async.queue(function refreshTimestamp(file, cb) {
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

						if(!savedFile ||
						(actualStamp.getTime() !== savedStamp.getTime()) ||
						!savedFile.metadata) {
							// TODO push files with missing metadata to a different array (?)
							changedFiles.push(file);

							// Update the mtime stamp in the database for this changed file
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
				console.log('Refreshed timestamps.');
				console.timeEnd('TimestampRefreshQueue');
				database.persistence.compactDatafile();
				deferred.resolve(changedFiles);
			};

			return refreshQueue;
		}
	}

	/**
	 * Refreshes the metadata inside a db for a given array of files.
	 * @param  {object} database The library datastore.
	 * @param  {array} files The array of affected files
	 * @return {Promise} A promise
	 */
	function refreshMetadata(database, files) {
		// We return the promise of this deferred
		var deferred = q.defer();

		// Save count of changed files
		var total = files.length;
		// Save current and previous percentages
		var currPercentage, prevPercentage;

		var refreshQueue = createMetadataRefreshQueue(database, files);
		// Push all the changed files onto the queue
		refreshQueue.push(files, function() {
			// Compare previous and current percentage, then set previous percentage
			// We only want to log when percentage changes by at least 1/10th
			currPercentage = 10 * Math.floor(Math.floor((1 - (refreshQueue.length() / total)) * 10));
			if(currPercentage != prevPercentage) console.log('Refreshing metadata...', currPercentage + '%');
			prevPercentage = currPercentage;
		});

		return deferred.promise;


		/**
		 * Creates an async queue to refresh metadata
		 * 
		 * @param {object} database The database to refresh
		 * @param {array} files An array of files whose stored metadata
		 * should be updated in the database
		 * @return {object} The async queue
		 */
		function createMetadataRefreshQueue(database, files) {
			console.time('MetadataRefreshQueue');

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
				parser.once('metadata', function(data) {
					// Create an array of all image files that are either embedded in the
					// metadata or located in the same directory as the track
					var images = [];
					_.times(data.picture.length, function(n) {
						this.push({ in_file: true, index: n });
					}, images);
					var dir = path.dirname(file);
					glob(dir + '/*.{jpg,png}', function(err, files) {
						if (err) throw err;
						// Map all filenames to a simple object
						var imageFiles = _.map(files, function(file) {
							return { filename: file };
						});
						// Prepend all imagefile objects to the images array
						Array.prototype.unshift.apply(images, imageFiles);
					});
					// Delete the picture property before we store the metadata,
					// as we don't want to save all pictures in the database. We'll
					// instead store the image information as created above.
					delete data.picture;

					// Update the file's db entry metadata and call
					// the queue callback when this operation finishes.
					database.update(
						{ file: file },
						{$set: {
							metadata: data,
							images: images || undefined
							// , imageCount: images.length
						}},
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

			refreshQueue.drain = function() {
				console.log('Refreshed the metadata.');
				console.timeEnd('MetadataRefreshQueue');
				database.persistence.compactDatafile();
				deferred.resolve(files);
			};

			return refreshQueue;
		}
	}
}