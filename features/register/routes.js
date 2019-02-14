const { wrap } = require('async-middleware');

const requestBodyValidation = require('./commands/verify-request-body');
const createUser = require('./commands/create-user');

module.exports = router => {
  router.get('/register', (req, res) => {
    res.render('pages/register');
  });

  router.post('/register', wrap(requestBodyValidation), wrap(createUser));

  return router;
};
