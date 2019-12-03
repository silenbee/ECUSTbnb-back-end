var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
//var swig = require('swig');
var bodyParser=require('body-parser');

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var loginRouter = require('./routes/login');
var registerRouter = require('./routes/register');
var rentlistRouter = require('./routes/rentlist');
var releaseRouter = require('./routes/release');
var personRouter = require('./routes/person');
var rentDetailRouter=require('./routes/rentDetail');

var app = express();
//app.engine('html', swig.renderFile);
// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

var allowCrossDomain = function (req, res, next) {
  res.header('Access-Control-Allow-Origin', 'http://localhost:4200');
  res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
  res.header('Access-Control-Allow-Headers', 'Content-Type,Authorization');
  res.header('Access-Control-Allow-Credentials', 'true');
  next();
};
app.use(allowCrossDomain);


app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));



app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());


app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/login',loginRouter);
app.use('/register',registerRouter);
app.use('/rentlist',rentlistRouter);
app.use('/release',releaseRouter);
app.use('/person',personRouter);
app.use('/rentDetail',rentDetailRouter);

//app.use( bodyParser.urlencoded(extended=true));

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
app.listen(3000, function () {
  console.log('3000');
})
module.exports = app;
