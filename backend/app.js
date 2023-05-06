var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var indexRouter = require('./routes/index');

var app = express();

var session = require('express-session');
var { SESSION_SECRET } = require(path.resolve('setting.js'))  // setting.js保存敏感信息，该文件不能公开

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
// app.use(cookieParser());   // 从1.5.0版本开始，express-session不再需要依赖cookie-parser，使用了cookie-parser反而可能出错
app.use(express.static(path.join(__dirname, 'public')));


app.use(session({
  secret: SESSION_SECRET,

  // 是否将 sessionID cookie保存回客户端，即使cookie没有发生修改，默认值为true（官方不推荐使用）
  resave: false,

  // 布尔值，强制将“未初始化”的会话保存到存储中。false减少服务器储存使用量。默认为true
  saveUninitialized: false,

}))

// 使用Nginx的反向代理，将https://timegogo.top/session_base_api，代理到http://localhost:3001/session_base_api
app.use('/session_base_api', indexRouter);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

// 设置进程端口为3001，3000端口已经被占用
process.env.PORT = 3001

module.exports = app;
