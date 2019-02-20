const debug = require('debug')('express:login');
const passport = require('passport');

const {
  USERNAME_PASSWORD_COMBINATION_ERROR,
  INTERNAL_SERVER_ERROR,
  SUCCESFULY_LOGGED_IN,
} = require('../constants');

function login(req, res, next) {
  return passport.authenticate('local', (error, user) => {
    if (error || !user) {
      req.session.messages = {
        errors: { invalidEmailOrPassword: USERNAME_PASSWORD_COMBINATION_ERROR },
      };
      return res.status(401).redirect('/login');
    }

    req.logIn(user, loginError => {
      if (loginError) {
        req.session.messages = {
          errors: { internalServerError: INTERNAL_SERVER_ERROR },
        };
        return res.status(500).redirect('/login');
      }
      req.session.messages = { loggedIn: SUCCESFULY_LOGGED_IN };
      return next();
    });
  })(req, res, next);
}

function redirectToDashboard(req, res) {
  debug('login:sendOkResponse');
  res.redirect('/');
}

module.exports = {
  login,
  redirectToDashboard,
};
