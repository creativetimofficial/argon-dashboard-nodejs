const registerRepo = require('../repository');

async function createUser(req, res) {
  let user = {};
  const registerSuccessMessage = 'You have successfully registered, you can log in.';
  try {
    user = await registerRepo.createUser(req.body);
  } catch (error) {
    user = error;
  }
  if (user.email) {
    res.redirect(`/login?succesText=${registerSuccessMessage}`);
  }
  const { code } = user;
  const databaseError =
    code === '23505' ? 'The email has already been taken.' : 'Something went wrong.';
  res.render('pages/register', { databaseError });
}

module.exports = createUser;
