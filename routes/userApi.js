var User = require('../models/userModel'),
    config = require('../config/main'),
    nodemailer = require('nodemailer');

module.exports = function(app, express){

    var api = express.Router();

    api.get('/email', function(req,res){
		// create reusable transporter object using the default SMTP transport
		var transporter = nodemailer.createTransport('smtps://beta.eproc%40gmail.com:d0c0t3lmks@smtp.gmail.com');

		module.exports = {
			kirim : 'kirim'
		}
		// setup e-mail data with unicode symbols
		var mailOptions = {
		    from: 'Andri', // sender address
		    to: 'andri_dwiutomo@ymail.com', // list of receivers
		    subject: 'Hello', // Subject line
		    text: 'Hello world', // plaintext body
		    html: {path : './routes/mail.html'} //'<b>Hello world</b>' // html body
		};

		// send mail with defined transport object
		transporter.sendMail(mailOptions, function(error, info){
		    if(error){
		        return console.log(error);
		    }else{
			    console.log('Message sent: ' + info.response);	    	
		    }
		});
	});

    /*create user account by Andri*/
    api.post('/sendReq', function(req,res){
        var user = new User({
            email       : req.body.email,
	        username    : req.body.username,
	        password    : req.body.password,
	        token       : req.body.token,
	        activated   : false
        });

        user.save(function(err){
            if(err){
                res.send(err);
                return;
            }

            res.json({ message : "Email Telah Terkirim" });
        });
    });

    /*user update by Andri*/
    api.post('/update/:id', function(req,res){
		var resp = User.findOneAndUpdate({'_id' : req.params.id}, 
			{email : req.body.email}, function(err, user){
            if(err) {
                res.send(err);
                return;
            }
            res.json({ message : "User Telah Berubah"});
		});
    });

    /*user activated by Andri*/
    api.get('/activated/:token', function(req,res){
		var resp = User.findOneAndUpdate({'token' : req.params.token}, 
			{activated : true}, function(err, user){
            if(err) {
                res.send(err);
                return;
            }
            res.json({ message : "User Activated"});
		});
    });

    /*user getuser by id create by Andri*/
    api.get('/getuser/:token', function(req, res) {
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
            res.json({ message : "User Terhapus"});
        });
    });

    /*user login by Andri*/
    api.post('/login', function(req, res) {

        User.findOne({ 
            'email' : req.body.email
        }).select('username password activated token').exec(function(err, user) {
            if(err) throw err;
            if(!user) {
                res.send({ message: "User doesnt exist"});
            } else if(user){ 
                var validPassword = user.comparePassword(req.body.password);
                if(!validPassword) {
                    res.send({ message: "Invalid Password"});
                } else {
                	if(user.activated === false){
                		res.send({ message: "User Doesnt Active"});
                	}else{
	                    res.json({
	                        success: true,
	                        token: user.token,
	                        message: "Successfuly login!",
	                    });
                	}
                }
            }
        });
    });

    /*getAll User by Andri*/
    api.get('/users', function(req, res) {
        User.find({}, function(err, users) {
            if(err) {
                res.send(err);
                return;
            }
            res.json(users);
        });
    });

    return api
}