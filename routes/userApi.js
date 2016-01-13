var userAccount = require('../models/userModel'),
    config      = require('../config/main');


module.exports = function(app, express){

    var api = express.Router();

    api.post('/signup', function(req, res){
        var user = new userAccount({
            username    : req.body.username,
            email       : req.body.email,
            password    : req.body.password,
        });

        user.save(function(err){
            if(err){
                res.send(err);
            }
        });
    });
}