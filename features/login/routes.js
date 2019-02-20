const { wrap } = require('async-middleware');

const verifyRequestBody = require('./commands/verify-request-body');
const { login, redirectToDashboard } = require('./commands/login');
const loadPage = require('./commands/load-page');

module.exports = router => {
  router.post('/login', wrap(verifyRequestBody), wrap(login), wrap(redirectToDashboard));
  router.get('/login', wrap(loadPage));

  return router;
};
