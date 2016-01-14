var express = require('express'),
    bodyParser = require('body-parser'),
    morgan = require('morgan'),
    mongoose = require('mongoose'),
    config = require('./config/main'),
    app = express();

app.use(bodyParser.urlencoded({ extended : true }));
app.use(bodyParser.json());
app.use(morgan('dev'));

app.use(express.static(__dirname + '/public'));
app.use(express.static(__dirname + '/public/assets/img'));
/*app.get('*', function(req,res){
    res.sendFile(__dirname + '/public');
});

/*Listening Port to Run Node JS*/
app.listen(config.port, function(err){
    if(err){
        console.log(err);
    }else{
        console.log('Terhubung Dengan Port ' + config.port);
    }
});

/*Connected to Database*/
mongoose.connect(config.database, function(err){
    if(err){
        console.log(err);
    }else{
        console.log('Connected to Database');
    }
});