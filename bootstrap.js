#!/usr/bin/env node
const redfox = require('./utils/redfox');
const server = require('./app');

const pkg = require('./package.json');

if (process.argv && process.argv.indexOf('-v') > -1) {
	return redfox.success(`monitor version ${pkg.version}`);
}

const port = process.env.PORT || 1234;
server.listen(port, (err) => {
	if(err) {
		return redfox.error('[APP] Init', err);
	}

	redfox.success('[APP] listening on port ', port);
});
