const Config = require('./config');

module.exports = (req, res, next) => {
	let auth = req.get('Authorization');

	if(!auth) {
		return res.status(400).json({
			error: {
				message: 'Authorization not provided'
			}
		});
	}

	if(auth !== Config.api_key) {
		return res.status(403).json({
			error: {
				message: 'Authorization credentials not valid'
			}
		});	
	}

	return next();
};
