const PASSWORD_MIN = 6;
const PASSWORD_MAX = 30;
const PASSWORD_MAX_ERROR = `Password length must be less than or equal to ${PASSWORD_MAX} characters long`;
const PASSWORD_MIN_ERROR = `Password length must be at least ${PASSWORD_MIN} characters long`;
const USERNAME_EMAIL_ERROR = 'Email must be a valid email address';
const USERNAME_PASSWORD_COMBINATION_ERROR = 'These credentials do not match our records.';
const INTERNAL_SERVER_ERROR = 'Something went wrong! Please try again.';

module.exports = {
  PASSWORD_MAX,
  PASSWORD_MIN,
  PASSWORD_MAX_ERROR,
  PASSWORD_MIN_ERROR,
  USERNAME_EMAIL_ERROR,
  USERNAME_PASSWORD_COMBINATION_ERROR,
  INTERNAL_SERVER_ERROR,
};
