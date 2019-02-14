const Joi = require('joi');

const constants = require('../constants');

const { PASSWORD_MAX, PASSWORD_MIN } = constants;

const schema = Joi.object().keys({
  username: Joi.string().email({ minDomainAtoms: 2 }),
  password: Joi.string()
    .regex(/^[a-zA-Z0-9]/)
    .min(PASSWORD_MIN)
    .max(PASSWORD_MAX),
});

module.exports = async function validate({ body }, res, next) {
  let payloadValidation = {};
  try {
    payloadValidation = await Joi.validate(body, schema, { abortEarly: false });
  } catch (validateRegisterError) {
    payloadValidation = validateRegisterError;
  }
  const { details } = payloadValidation;
  let errors;

  if (details) {
    errors = {};
    details.forEach(errorDetail => {
      const {
        message,
        path: [key],
        type,
      } = errorDetail;
      const errorType = type.split('.')[1];
      errors[key] = constants[`${key.toUpperCase()}_${errorType.toUpperCase()}_ERROR`] || message;
    });
  }

  if (errors) {
    return res.status(400).render('pages/login', { errors: { ...errors } });
  }
  return next();
};
