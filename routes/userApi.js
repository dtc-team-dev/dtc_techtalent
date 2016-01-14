var User = require('../models/userModel'),
    config = require('../config/main');

module.exports = function(app, express){

    var api = express.Router();

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


    api.get('/getuser/:id', function(req, res) {
        User.findOne({'_id' : req.params.id}, function(err, user) {
            if(err) {
                res.send(err);
                return;
            }
            res.json(user);
        });
    });

    api.get('/delete/:id', function(req, res) {
        User.remove({'_id' : req.params.id}, function(err) {
            if(err) {
                res.send(err);
                return;
            }
            res.json({ message : "User Terhapus"});
        });
    });


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