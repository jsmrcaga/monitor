const express = require('express');

let router = express.Router();

router.get('/', (req, res) => {
	return res.render('index');
});

router.use('/api', require('./api'));

module.exports = router;
