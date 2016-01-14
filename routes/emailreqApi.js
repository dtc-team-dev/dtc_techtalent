var emailReq = require('../models/emailreqModel'),
    config = require('../config/main'),
    secretKey = config.secretKey;

module.exports = function(app, express){

    var api = express.Router();

    api.post('/send', function(req,res){
        var email_req = new emailReq({
            email : req.body.email,
            token : req.body.token,
        });

        email_req.save(function(err){
            if(err){
                res.send(err);
                return;
            }

            res.json({ message : "User has Been created" });
        });
    });

    api.get('/userreqs', function(req, res) {

        emailReq.find({}, function(err, userreqs) {
            if(err) {
                res.send(err);
                return;
            }

            res.json(userreqs);

        });
    });

    return api
}