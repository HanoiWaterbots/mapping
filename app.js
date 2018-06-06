let createError = require('http-errors');
let express = require('express');
let path = require('path');
let cookieParser = require('cookie-parser');
let logger = require('morgan');
let indexRouter = require('./routes/index');
let fetchDB = require('./routes/fetchDB');
let getLocation = require('./routes/getLocation');
let fetchConfig = require('./routes/fetchConfig');
let dbhandler = require('./routes/databaseHandler');
let app = express();
let io = require('socket.io')(8080);
let db = require('mongodb').MongoClient;

let CONFIG  = require('./config');

let ATLAS_API_KEY=CONFIG.DB_KEY;
let ATLAS_API_USER=CONFIG.DB_USER;
let ATLAS_API_URL=CONFIG.DB_URL;
let ATLAS_URL = "mongodb+srv://" + ATLAS_API_USER +":" + ATLAS_API_KEY + ATLAS_API_URL;

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

/**
 * Connect to the database as the server starts
 */
app.use(function (req, res, next) {
    db.connect(ATLAS_URL, {useNewUrlParser: true}, function (err, client) {
        if(err){
            console.log("Error connecting to the database");
        }
        else{
            req.client = client;
            next();
        }
    });
});

/**
 * Handle the socket connection
 */
app.use(function (req, res, next) {
    res.io = io;
    next();
});

app.use('/', indexRouter);
app.use('/fetchDB', fetchDB);
app.use('/getLocation', getLocation);
app.use('/fetchConfig', fetchConfig);
app.use('/dbhandler', dbhandler);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
