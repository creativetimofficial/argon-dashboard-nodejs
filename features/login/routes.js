const { wrap } = require('async-middleware');

const verifyRequestBody = require('./commands/verify-request-body');
const { login, redirectToDashboard, loadPage } = require('./commands/login');

module.exports = router => {
  router.post('/login', wrap(verifyRequestBody), wrap(login), wrap(redirectToDashboard));
  router.get('/login', wrap(loadPage));

  return router;
};
