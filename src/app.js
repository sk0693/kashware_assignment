const createError = require('http-errors');
const express = require('express');
const path = require('path');
const cors = require('cors');
const passport = require('passport');
const { jwtStrategy } = require('./config/passport');
const cookieParser = require('cookie-parser');
const logger = require('morgan');


// const indexRouter = require('./routes/index');
// const usersRouter = require('./routes/users');

const app = express();

// view engine setup
// app.set('views', path.join(__dirname, 'views'));
// app.set('view engine', 'jade');

app.use(logger('dev'));

// parse json request body
app.use(express.json());

// parse urlencoded request body
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
// app.use(express.static('public'));

// enable cors
app.use(cors());
app.options('*', cors());


// app.use(require('body-parser').urlencoded({ extended: true }));
// app.use(require('express-session')({ secret: 'keyboard cat', resave: true, saveUninitialized: true }));
// jwt authentication
app.use(passport.initialize());
// app.use(passport.session());
passport.use('jwt', jwtStrategy);

const routes = require('./routes/v1');
const authRoutes = require('./routes/v1/auth.route');

// v1 api routes
app.use('/v1/auth', authRoutes);
app.use('/v1', passport.authenticate('jwt', {session: false}), routes);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};
  // logger.info("Error Handler")
  // render the error page
  console.log(err)
  res.status(err.status || 501);
  res.send(err);
});

module.exports = app;
