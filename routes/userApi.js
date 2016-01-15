var User = require('../models/userModel'),
    config = require('../config/main');

module.exports = function(app, express){

    var api = express.Router();

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

    /*user getuser by id create by Andri*/
    api.get('/getuser/:id', function(req, res) {
        User.findOne({'_id' : req.params.id}, function(err, user) {
            if(err) {
                res.send(err);
                return;
            }
            res.json(user);
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
            username: req.body.username
        }).select('username password').exec(function(err, user) {
            if(err) throw err;
            if(!user) {
                res.send({ message: "User doenst exist"});
            } else if(user){ 
                var validPassword = user.comparePassword(req.body.password);
                if(!validPassword) {
                    res.send({ message: "Invalid Password"});
                } else {
                    res.json({
                        success: true,
                        message: "Successfuly login!",
                    });
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