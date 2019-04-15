const Joi = require("joi");
const boom = require("boom");

// define all routes schema here
const schemas = {
  login: {
    email: Joi.string().email({ minDomainAtoms: 2 }).required(),
    password: Joi.string().required(),
  },
  uploadVerificationImage: {
    tradeId: Joi.string().length(24).required(),
  },
  signup: {
    email: Joi.string().email({ minDomainAtoms: 2 }).required(),
    password: Joi.string().min(6).required(),
    rePassword: Joi.any().valid(Joi.ref("password")).required().options({ language: { any: { allowOnly: "must match password" } } }),
    checkbox: Joi.boolean().valid(true).error(() => "You should agree Earwig terms of user"),
  },
  editProfile: {
    oldPassword: Joi.string(),
    newPassword: Joi.string().min(6),
    reNewPassword: Joi.any().valid(Joi.ref("newPassword")).options({ language: { any: { allowOnly: "must match password" } } }),
    verificationImage: Joi.any().allow("").optional(),
  },
  addTrade: {
    trade: Joi.string().min(3).required(),
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
