const { getUser } = require('../repository');

const { FETCH_INFO_ERROR_MESSAGE } = require('../constants');

async function loadPage(req, res) {
  let userInfo;
  const { user } = req;
  try {
    userInfo = await getUser(user && user.id);
  } catch (getUserError) {
    req.session.messages = { databaseError: FETCH_INFO_ERROR_MESSAGE };
  }
  res.render('pages/profile', { ...userInfo });
}

module.exports = loadPage;
