var mongoose    = require('mongoose'),
    Schema      = mongoose.Schema,
    config      = require('../../config/config'),
    bcrypt      = require('bcrypt-nodejs'),
    userSchema = new Schema({
        email       : {type : String, required : true, unique : true, lowercase:true},
        username    : {type : String, required : true, lowercase:true},
        password    : {type : String, required : true, select : false},
        token       : {type : String, select : false},
        displayname : String,
        picture     : String,
        linkedin    : String,
        activated   : {type : Boolean, default:0}
    });

userSchema.pre('save', function(next){
    var user = this;
    if(!user.isModified('password')) return next();

    bcrypt.genSalt(10,function(err,salt){
        bcrypt.hash(user.password, salt, null, function(err, hash){
            if(err) return next(err);

            //user.token = libFunct.createToken(user.email);
            user.password = hash;
            next();
        });
    });
    
});

userSchema.methods.comparePassword = function(password,done){
    var user = this;
    return bcrypt.compare(password,user.password, function(err,isMatch){
        done(err,isMatch);
    });

    /*return bcrypt.compareSync(password, user.password);*/
};

module.exports = mongoose.model('user_account', userSchema);