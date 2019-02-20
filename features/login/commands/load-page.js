const debug = require('debug')('express:login');

async function loadPage(req, res) {
  debug('login:servePage', req, res);
  res.render('pages/login');
}

module.exports = loadPage;
