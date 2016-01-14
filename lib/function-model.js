var jsonwebtoken = require('jsonwebtoken'),
	config		 = require('../config/main');

module.exports = {
	createToken : function(req){
		var token = jsonwebtoken.sign({
			email: req.email
		}, config.secretKey);

		return token;
	}
}
