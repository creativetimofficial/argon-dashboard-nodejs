const debug = require('debug')('express:login');
const passport = require('passport');

const { USERNAME_PASSWORD_COMBINATION_ERROR, INTERNAL_SERVER_ERROR } = require('../constants');

function login(req, res, next) {
  return passport.authenticate('local', (error, user) => {
    if (error || !user) {
      return res.status(401).render('pages/login', {
        errors: { invalidEmailOrPassword: USERNAME_PASSWORD_COMBINATION_ERROR },
      });
    }

    req.logIn(user, loginError => {
      if (loginError) {
        return res.status(500).render('pages/login', {
          errors: { internalServerError: INTERNAL_SERVER_ERROR },
        });
      }

      return next();
    });
  })(req, res, next);
}

function loadPage(req, res) {
  debug('login:servePage', req, res);
  res.render('pages/login');
}

function redirectToDashboard(req, res) {
  debug('login:sendOkResponse');
  res.redirect('/');
}

module.exports = {
  login,
  loadPage,
  redirectToDashboard,
};
