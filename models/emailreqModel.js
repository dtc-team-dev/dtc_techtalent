var mongoose	= require('mongoose'),
	Schema		= mongoose.Schema,
    config      = require('../config/main'),
    libFunct	= require('../lib/function-model'),
	emailReqSchema = new Schema({
		email 	: {type : String, required : true},
		token	: {type : String}
	});

emailReqSchema.pre('save', function(next){
    this.token = libFunct.createToken(this.email);

    next();
});

module.exports = mongoose.model('email_request', emailReqSchema);