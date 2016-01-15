var mongoose    = require('mongoose'),
    Schema      = mongoose.Schema,
    config      = require('../config/main'),
    libFunct    = require('../lib/function-model'),
    bcrypt      = require('bcrypt-nodejs'),
    userSchema = new Schema({
        email       : {type : String, required : true},
        username    : {type : String, required : true, index : {unique : true}},
        password    : {type : String, required : true, select : false},
        token       : {type : String, select : false},
        activated   : {type : Boolean}
    });

userSchema.pre('save', function(next){
    var user = this;
    if(!user.isModified('password')) return next();

    bcrypt.hash(user.password, null, null, function(err, hash){
        if(err) return next(err);

        user.token = libFunct.createToken(user.email);
        user.password = hash;
        next();
    });
    
});


userSchema.methods.comparePassword = function(password){
    var user = this;

    return bcrypt.compareSync(password, user.password);
}

module.exports = mongoose.model('user_account', userSchema);