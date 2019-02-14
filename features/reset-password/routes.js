module.exports = router => {
  router.get('/reset-password', (req, res) => {
    res.render('pages/reset-password');
  });

  return router;
};
