const express = require('express');
const api = express.Router();
const redfox = require('../utils/redfox');
const RequestError = require('../utils/errors/RequestError');

const Perfs = require('../utils/perfs');

// Perfs accessor
const perfs = (name, res, next) => {
	Perfs[name]().then(perf => {
		res.json(perf);
	}).catch(e => {
		next(e);
	});
};

// Security middleware
api.use('/', require('../utils/security'));

api.get('/perfs', (req, res, next) => perfs('all', res, next));

api.get('/perfs/ram', (req, res, next) => perfs('ram', res, next));

api.get('/perfs/cpu', (req, res, next) => perfs('cpu', res, next));

api.get('/perfs/disk', (req, res, next) => perfs('disk', res, next));

api.get('/perfs/info', (req, res, next) => perfs('info', res, next));

// Error handling
api.use((err, req, res, next) => {
	redfox.error('[API]', req.path, err);
	return res.status(500).json({
		error: {
			raw: err,
			message: err.message,
			code: 500
		}
	});
});

module.exports = api;
