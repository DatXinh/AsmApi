var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var indexRouter = require('./routes/index');

var app = express();

// Middleware xử lý dữ liệu POST và JSON
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

// Cấu hình static files
app.use(express.static(path.join(__dirname, 'public')));

// Cấu hình view engine
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

// Middleware chung
app.use(logger('dev'));
app.use(cookieParser());

// Định nghĩa router
app.use('/', indexRouter);

// Xử lý lỗi 404
app.use(function(req, res, next) {
  next(createError(404));
});

// Xử lý lỗi chung
app.use(function(err, req, res, next) {
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
