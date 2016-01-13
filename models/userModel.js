var mongoose = require('mongoose'),
    Schema = mongoose.schema,
    bcrypt = require('bcrypt-nodejs'),

    UserSchema = new Schema({
    username    : {type : String, required:true, index: {unique : true}},
    email       : {type : String, required:true},
    password    : {type : String, required:true, select: false},
    token       : {type : String, required:true, select: false},
    activated   : [Boolean]
    });

UserSchema.pre('save', function(next){
    var user = this;
    if(!user.isModified('password')) return next();

    bcrypt.hash(user.password, null, null, function(err, hash){
        if(err) return next(err);

        user.password = hash;
        next();
    });
});

UserSchema.methods.comparePassword = function(password){
    var user = this;

    return bcrypt.compareSync(password, user.password);
}

module.exports = mongoose.model('user_account', UserSchema);