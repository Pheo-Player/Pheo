var fs = require('fs'),
    nconf = require('nconf');

nconf.file(__dirname + '/config.json');

nconf.defaults({
	port: 52430,
	dbfile: 'db/library.nedb'
});

module.exports = nconf;