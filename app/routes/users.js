var User = require('../models/users'),
    helper = require('../../lib/helper'),
    jwt = require('jwt-simple'),
    moment = require('moment'),
    nodemailer = require('nodemailer'),
    path = require('path'),   
    /*emailTemplate = require('email-templates'),*/
    config = require('../../config/main');

module.exports = function(app, express){

    var api = express.Router();

    /*
     |--------------------------------------------------------------------------
     | Generate JSON Web Token
     |--------------------------------------------------------------------------
     */
    function createJWT (user) {
        var payload = {
            sub: user._id,
            iat: moment().unix(),
            exp: moment().add(14, 'days').unix()
        };
        return jwt.encode(payload, config.secretKey);
    }

    /*var auth = function (req, res, next) {
        function unauthorized(res) {
            res.set('WWW-Authenticate', 'Basic realm=Authorization Required');
            return res.send(401);
        }

        var user = basicAuth(req);

        if (!user || !user.name || !user.pass) {
            return unauthorized(res);
        }

        if (user.name === 'hansenmakangiras' && user.pass === 'BlackID85') {
            return next();
        } else {
            return unauthorized(res);
        }
    };*/


    function ensureAuthenticated(req,res,next){
        if (!req.headers.authorization) {
            return res.status(401).send({ message: 'Please make sure your request has an Authorization header' });
        }
        var token = req.headers.authorization.split(' ')[1];

        var payload = null;
        try {
            payload = jwt.decode(token, config.secretKey);
        }
        catch (err) {
            return res.status(401).send({ message: err.message });
        }

        if (payload.exp <= moment().unix()) {
            return res.send({ message: 'Token has expired' });
        }
        req.user = payload.sub;
        next();
    }

    /*user update by Andri*/
    api.post('/update/:id', function(req,res){
		User.findOneAndUpdate({'_id' : req.params.id},
			{email : req.body.email}, function(err, user){
            if(err) {
                res.send(err);
                return;
            }

            res.json({ message : "User Telah Berubah"});
		});
    });

    /*getAll User by Andri*/
    api.get('/users', function(req, res) {
        User.find({}, function(err, users) {
            if(err) {
                res.send(err.message);
                return;
            }
            res.json(users);
        });
    });

    /*user getuser by token create by Andri*/
    api.get('/user/:token', function(req, res) {
        User.findOne({'token' : req.params.token}, function(err, user) {
            if(err) {
                res.send(err);
            }else{
                res.json(user);         
            }
        });
    });

    /*user delete by id create by Andri*/
    api.get('/delete/:id', function(req, res) {
        User.remove({'_id' : req.params.id}, function(err) {
            if(err) {
                res.send(err);
                return;
            }
            res.send({ message : "User Terhapus"});
        });
    });
    /*
     |--------------------------------------------------------------------------
     | POST /auth/signup
     | Route For linkedin signup
     | Created By : Hansen - 17/11/2016 : 10:54
     |--------------------------------------------------------------------------
     */
    api.post('/auth/signup', function(req, res) {
        User.findOne({ email: req.body.email }, function(err, existingUser) {
            if (existingUser) {
                return res.send({ message: 'Email is already taken' });
            }
            var user = new User({
                displayname: req.body.displayname,
                username: req.body.username,
                email: req.body.email,
                password: req.body.password
            });
            user.save(function(err, result) {
                if (err) {
                    res.json({ message: err.message });
                }
                res.json({ token: createJWT(result), message:"Successfully Register."});
            });
        });
    });

    api.get('/user/confirm/:token',function(req,res){
        User.findOne({ token: req.params.token }, function(err, user) {
            user.update({activated : 0},{activated : 1},function(err, result) {
                if (err) {
                    res.json({ message: err.message });
                }
                res.json({ message:"Email has been confirmed successfuly."});
            });
        });
    });

    /*user login by Andri*/
    /*
     |--------------------------------------------------------------------------
     | POST /auth/login
     | Modified By Hansen Used For Social Media Login
     |--------------------------------------------------------------------------
     */
    api.post('/auth/login', function(req, res) {
        User.findOne({
            'email' : req.body.email
        }).select('username password activated token linkedin google').exec(function(err, user) {
            if(err) throw err;
            if(!user) {
                res.send({ message: "User doesnt exist"});
            } else if(user){
                var validPassword = user.comparePassword(req.body.password);
                if(!validPassword) {
                    res.send({ message: "Invalid Password"});
                } else {
                    if(user.linkedin !== "" || user.google !== ""){
                        if(!user.activated){
                            return res.send({ message: "Please, confirm your email!"});
                        }else{
                            return res.json({
                                success: true,
                                token: user.token,
                                message: "Successfuly login!"
                            });
                        }
                    }
                }
            }
        });
        /*User.findOne({ email: req.body.email }, '+password', function(err, user) {
            if (!user) {
                return res.status(401).send({ message: 'Invalid email and/or password' });
            }
            user.comparePassword(req.body.password, function(err, isMatch) {
                if (!isMatch) {
                    return res.status(401).send({ message: 'Invalid email and/or password' });
                }
                res.json({ token: createJWT(user) });
            });
        });*/
    });

    /*
     |--------------------------------------------------------------------------
     | GET /api/me
     |--------------------------------------------------------------------------
     */
    api.get('/api/me', ensureAuthenticated, function(req, res) {
        User.findById(req.user, function(err, user) {
            if(err){
                return res.send(400,{message:"User not found"});
            }
            res.send(user);
        });
    });
    /*
     |--------------------------------------------------------------------------
     | PUT /api/me
     |--------------------------------------------------------------------------
     */
    api.put('/api/me', function(req, res) {
        User.findById(req.user, function(err, user) {
            if (!user) {
                return res.send(400,{ message: 'User not found' });
            }
            user.displayName = req.body.displayName || user.displayName;
            user.email = req.body.email || user.email;
            user.save(function(err) {
                if(err){
                    return res.send(404,{message:err.message});
                }
                res.end(200);
            });
        });
    });

    /*
     |--------------------------------------------------------------------------
     | Login with LinkedIn
     |--------------------------------------------------------------------------
     */
    api.post('/auth/linkedin', function(req, res) {
        var accessTokenUrl = 'https://www.linkedin.com/uas/oauth2/accessToken';
        var peopleApiUrl = 'https://api.linkedin.com/v1/people/~:(id,first-name,last-name,email-address,picture-url)';
        var params = {
            code: req.body.code,
            client_id: req.body.clientId,
            client_secret: config.LINKEDIN_SECRET,
            redirect_uri: req.body.redirectUri,
            grant_type: 'authorization_code'
        };

        // Step 1. Exchange authorization code for access token.
        req.post(accessTokenUrl, { form: params, json: true }, function(err, res, body) {
            if (res.statusCode !== 200) {
                return res.status(res.statusCode).send({ message: body.error_description });
            }
            var params = {
                oauth2_access_token: body.access_token,
                format: 'json'
            };

            // Step 2. Retrieve profile information about the current user.
            req.get({ url: peopleApiUrl, qs: params, json: true }, function(err, res, profile) {

                // Step 3a. Link user accounts.
                if (req.headers.authorization) {
                    User.findOne({ linkedin: profile.id }, function(err, existingUser) {
                        if (existingUser) {
                            return res.status(409).send({ message: 'There is already a LinkedIn account that belongs to you' });
                        }
                        var token = req.headers.authorization.split(' ')[1];
                        var payload = jwt.decode(token, config.secretKey);
                        User.findById(payload.sub, function(err, user) {
                            if (!user) {
                                return res.status(400).send({ message: 'User not found' });
                            }
                            user.linkedin = profile.id;
                            user.picture = user.picture || profile.pictureUrl;
                            user.displayname = user.displayname || profile.firstName + ' ' + profile.lastName;
                            user.activated = 1;
                            user.save(function() {
                                var token = createJWT(user);
                                res.send({ token: token });
                            });
                        });
                    });
                } else {
                    // Step 3b. Create a new user account or return an existing one.
                    User.findOne({ linkedin: profile.id }, function(err, existingUser) {
                        if (existingUser) {
                            return res.send({ token: helper.createJWT(existingUser) });
                        }
                        var user = new User();
                        user.linkedin = profile.id;
                        user.picture = profile.pictureUrl;
                        user.displayname = profile.firstName + ' ' + profile.lastName;
                        user.activated = 1;
                        user.save(function() {
                            var token = createJWT(user);
                            res.send({ token: token });
                        });
                    });
                }
            });
        });
    });

    /*
     |--------------------------------------------------------------------------
     | Login with Google
     |--------------------------------------------------------------------------
     */
    api.post('/auth/google', function(req, res) {
        var accessTokenUrl = 'https://accounts.google.com/o/oauth2/token';
        var peopleApiUrl = 'https://www.googleapis.com/plus/v1/people/me/openIdConnect';
        var params = {
            code: req.body.code,
            client_id: req.body.clientId,
            client_secret: config.GOOGLE_SECRET,
            redirect_uri: req.body.redirectUri,
            grant_type: 'authorization_code'
        };

        // Step 1. Exchange authorization code for access token.
        req.post(accessTokenUrl, { json: true, form: params }, function(err, res, token) {
            var accessToken = token.access_token;
            var headers = { Authorization: 'Bearer ' + accessToken };

            // Step 2. Retrieve profile information about the current user.
            req.get({ url: peopleApiUrl, headers: headers, json: true }, function(err, res, profile) {
                if (profile.error) {
                    return res.status(500).send({message: profile.error.message});
                }
                // Step 3a. Link user accounts.
                if (req.headers.authorization) {
                    User.findOne({ google: profile.sub }, function(err, existingUser) {
                        if (existingUser) {
                            return res.status(409).send({ message: 'There is already a Google account that belongs to you' });
                        }
                        var token = req.headers.authorization.split(' ')[1];
                        var payload = jwt.decode(token, config.TOKEN_SECRET);
                        User.findById(payload.sub, function(err, user) {
                            if (!user) {
                                return res.status(400).send({ message: 'User not found' });
                            }
                            user.google = profile.sub;
                            user.picture = user.picture || profile.picture.replace('sz=50', 'sz=200');
                            user.displayName = user.displayName || profile.name;
                            user.activated = 1;
                            user.save(function() {
                                var token = createJWT(user);
                                res.send({ token: token });
                            });
                        });
                    });
                } else {
                    // Step 3b. Create a new user account or return an existing one.
                    User.findOne({ google: profile.sub }, function(err, existingUser) {
                        if (existingUser) {
                            return res.send({ token: helper.createJWT(existingUser) });
                        }
                        var user = new User();
                        user.google = profile.sub;
                        user.picture = profile.picture.replace('sz=50', 'sz=200');
                        user.displayName = profile.name;
                        user.activated = 1;
                        user.save(function(err) {
                            var token = createJWT(user);
                            res.send({ token: token });
                        });
                    });
                }
            });
        });
    });

    return api
};