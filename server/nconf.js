var fs = require('fs'),
    nconf = require('nconf');

nconf.file('config.json');

nconf.defaults({
	port: 52430,
	dbfile: 'library.nedb'
});

module.exports = nconf;