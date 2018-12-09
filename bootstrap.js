#!/usr/bin/env node
const redfox = require('./utils/redfox');

const server = require('./app');

const port = process.env.PORT || 1234;
server.listen(port, (err) => {
	if(err) {
		return redfox.error('[APP] Init', err);
	}

	redfox.success('[APP] listening on port ', port);
});
