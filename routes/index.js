const express = require('express');

const router = express.Router();

const mountRegisterRoutes = require('../features/register/routes');
const mountLoginRoutes = require('../features/login/routes');
const mountResetPasswordRoutes = require('../features/reset-password/routes');

/* GET home page. */
router.get('/', (req, res) => {
  res.render('pages/dashboard');
});

router.get('/icons', (req, res) => {
  res.render('pages/icons');
});

router.get('/maps', (req, res) => {
  res.render('pages/maps');
});

router.get('/profile', (req, res) => {
  res.render('pages/profile');
});

router.get('/tables', (req, res) => {
  res.render('pages/tables');
});

mountRegisterRoutes(router);
mountLoginRoutes(router);
mountResetPasswordRoutes(router);

module.exports = router;
