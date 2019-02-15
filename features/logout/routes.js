const { wrap } = require('async-middleware');

const { logout } = require('./commands/logout');

module.exports = router => {
  router.post('/logout', wrap(logout));

  return router;
};
