const express = require('express');

const router = express.Router();

const registerRouter = require('../features/register/routes');

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

router.get('/login', (req, res) => {
  res.render('pages/login');
});

router.use(registerRouter);

module.exports = router;
