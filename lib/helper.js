var jsonwebtoken = require('jsonwebtoken'),
    jwt = require('jwt-simple'),
    moment = require('moment'),
	config		 = require('../config/config');

module.exports = {
	createToken : function(req){
		return jsonwebtoken.sign({
			email: req.body.email
		}, config.secretKey);
	},
	/*
	 |--------------------------------------------------------------------------
	 | Generate JSON Web Token
	 |--------------------------------------------------------------------------
	 */
	createJWT : function(user) {
		var payload = {
			sub: user._id,
			iat: moment().unix(),
			exp: moment().add(14, 'days').unix()
		};
		return jwt.encode(payload, config.secretKey);
    },
    /*
     |--------------------------------------------------------------------------
     | Login Required Middleware
     |--------------------------------------------------------------------------
     */
    ensureAuthenticated : function (req, res, next) {
        var auth = req.headers.authorization;
        console.log("Authorization Header adalah : ", auth);
        if (!auth) {
            //return res.status(401).send({ message: 'Please make sure your request has an Authorization header' });
            res.statusCode = 401;
            res.setHeader('WWW-Authenticate', 'Basic realm="Secure Area"');
            return;
        }
        var tmp = auth.split(' '),
            buff = new Buffer(tmp[1], 'base64'),
            plain_auth = buff.toString();

        console.log("Decoded Authorization ", plain_auth);
        console.log("token ", auth.split(' ')[1]);
        /*var creds = plain_auth.split(':'),
            username = creds[0],
            password = creds[1];

        if ((username == "hansenmakangiras") && (password == "BlackID85")) {
            res.statusCode = 200;  // OK
            res.end('<html><body>Selamat, anda berhasil menghack..Hahahaha!!</body></html>');
            res.end(app);
        } else {
            res.statusCode = 401; // Force them to retry authentication
            res.setHeader('WWW-Authenticate', 'Basic realm="Secure Area"');
            res.end('<html><body>Maaf, yang jelek tidak boleh login</body></html>');
        }*/

        var token = auth.split(' ')[1],
            payload = null;

        /*function getPayload(req,res,err){
            if(err){
                return res.status(401).send({message:err.message});
            }
            payload = jwt.decode(token, config.secretKey);
        }*/

        try {
            payload = jwt.decode(token, config.secretKey);
        }
        catch (err) {
            console.log("token ", payload);
            return res.status(401).send({ message: err.message });
        }

        console.log(getPayload.sub);
        if (payload.exp <= moment().unix()) {
            return res.status(401).send({ message: 'Token has expired' });
        }
        req.user = payload.sub;
        next();
    }
};
