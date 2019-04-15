const Joi = require("joi");
const boom = require("boom");

// define all routes schema here
const schemas = {
  login: {
    email: Joi.string().email({ minDomainAtoms: 2 }).required(),
    password: Joi.string().required(),
  },
  signup: {
    email: Joi.string().email({ minDomainAtoms: 2 }).required(),
    password: Joi.string().min(6).required(),
    rePassword: Joi.any().valid(Joi.ref("password")).required().options({ language: { any: { allowOnly: "must match password" } } }),
    checkbox: Joi.boolean().valid(true).error(() => "You should agree Earwig terms of user"),
  },
  editProfile: {
    oldPassword: Joi.string().required(),
    newPassword: Joi.string().min(6).required(),
    reNewPassword: Joi.any().valid(Joi.ref("newPassword")).required().options({ language: { any: { allowOnly: "must match password" } } }),
  },
};

module.exports = route => (req, res, next) => {
  const schema = Joi.object().keys(schemas[route]);
  const isValid = Joi.validate(req.body, schema);

  if (!isValid.error) {
    next();
  } else {
    next(boom.badRequest(isValid.error.details[0].message));
  }
};
