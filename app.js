require('dotenv').config({
  path: `./env-files/${process.env.NODE_ENV || 'development'}.env`,
});

const createError = require('http-errors');
const express = require('express');
const path = require('path');
const expressLayouts = require('express-ejs-layouts');
const cookieParser = require('cookie-parser');

const logger = require('./logger');
const initAuthMiddleware = require('./features/login/init-auth-middleware');
const indexRouter = require('./routes/index');

const app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
app.use(expressLayouts);

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

initAuthMiddleware(app);
app.use('/', indexRouter);

// catch 404 and forward to error handler
app.use((req, res, next) => {
  next(createError(404));
});

// error handler
app.use((err, req, res) => {
  // set locals, only providing error in development
  logger.error('Topmost error handler reached: %s - stack: %s', err.message, err.stack);
  if (!err.status || err.status === 500) {
    return res.status(500).json({
      errors: [{ message: 'Server Error' }],
    });
  }

  return res.status(err.status).json({
    errors: [err],
  });
});

module.exports = app;
