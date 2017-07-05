var express = require('express');
var path = require('path');
var ejs = require('ejs');
var favicon = require('static-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var session = require('express-session');
var usersApi = require('./routes/usersApi');
var admin =require('./routes/admin');
var moviesApi = require('./routes/moviesApi');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(favicon());
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded());
app.use(cookieParser());
app.use('/public',express.static(path.join(__dirname, 'public')));
app.use(session({'secret':'lingdacompany'}));

app.use('/', express.static(path.join(__dirname, 'pages')));
app.use('/moviesApi', moviesApi);
app.use('/usersApi',usersApi);
app.use('/admin', admin);


/// catch 404 and forwarding to error handler
app.use(function(req, res, next) {
    res.redirect('/');
});

/// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
    app.use(function(err, req, res, next) {
        res.status(err.status || 500);
        res.render('home/error', {
            message: err.message,
            error: err
        });
    });
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
        message: err.message,
        error: {}
    });
});


module.exports = app;
