var express = require('express'),
    bodyParser = require('body-parser'),
    morgan = require('morgan'),
    mongoose = require('mongoose'),
    config = require('./config/config'),
    http = require('http'),
    path = require('path'),
    //methodOverride = require('method-override'),
    app = express();

var api = require('./app/routes/users')(app, express);
var routes = require('./app/routes/index')(app, express);

/*app.set('views', path.join(__dirname, '/public/views'));
app.set('view engine', 'html');*/

app.use(morgan('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

app.use(express.static(__dirname + '/public'));
app.use(express.static(__dirname + '/public/assets/img'));
app.use(express.static(path.join(__dirname,'public')));
/*app.use(express.static(__dirname + '/public'));
app.use(express.static(__dirname + '/public/assets/img'));*/

app.use('/api', api);
app.use('/', routes);

/**
 * Get port from config.
 */
var port = normalizePort(config.port);
app.set('port', port);
/**
 * Create HTTP server.
 */
var server = http.createServer(app);

/* development error handler*/
app.use(function (req, res, next) {
    var err = new Error('Not Found');
    err.status = 404;
    next(err);
});

/* production error handler */
app.use(function (err, req, res, next) {
    res.status(err.status || 500);
    res.sendFile(path.join(__dirname + '/public/views/site/error.html'), {
        message: err.message,
        error: err
    });
});
server.listen(port);
server.on('error', onError);
server.on('listening', onListening);


/**
 * Normalize a port into a number, string, or false.
 */

function normalizePort(val) {
    var port = parseInt(val, 10);

    if (isNaN(port)) {
        // named pipe
        return val;
    }

    if (port >= 0) {
        // port number
        return port;
    }

    return false;
}

/**
 * Event listener for HTTP server "error" event.
 */

function onError(error) {
    if (error.syscall !== 'listen') {
        throw error;
    }

    var bind = typeof port === 'string'
        ? 'Pipe ' + port
        : 'Port ' + port;

    // handle specific listen errors with friendly messages
    switch (error.code) {
        case 'EACCES':
            console.error(bind + ' requires elevated privileges');
            process.exit(1);
            break;
        case 'EADDRINUSE':
            console.error(bind + ' is already in use');
            process.exit(1);
            break;
        default:
            throw error;
    }
}

/**
 * Event listener for HTTP server "listening" event.
 */
function onListening() {
    var addr = server.address();
    var bind = typeof addr === 'string'
        ? 'pipe ' + addr
        : 'port ' + addr.port;
    console.log('Terhubung dengan port ' + bind);
}
/*Connected to Database*/
mongoose.connect(config.database, function (err) {
    if (err) {
        console.log(err);
    } else {
        console.log('Connected to Database');
    }
});