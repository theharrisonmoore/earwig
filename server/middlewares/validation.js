const Joi = require("joi");
const boom = require("boom");

// define all routes schema here
const schemas = {
  login: {
    email: Joi.string()
      .email({ minDomainAtoms: 2 })
      .required(),
    password: Joi.string().required(),
  },
  uploadVerificationImage: {
    tradeId: Joi.string()
      .length(24)
      .required(),
  },
  signup: {
    email: Joi.string()
      .email({ minDomainAtoms: 2 })
      .required(),
    password: Joi.string()
      .min(6)
      .required(),
    rePassword: Joi.any()
      .valid(Joi.ref("password"))
      .required()
      .options({ language: { any: { allowOnly: "must match password" } } }),
    checkbox: Joi.boolean()
      .valid(true)
      .error(() => "You should agree Earwig terms of user"),
  },
  editProfile: {
    oldPassword: Joi.string(),
    newPassword: Joi.string().min(6),
    reNewPassword: Joi.any()
      .valid(Joi.ref("newPassword"))
      .options({ language: { any: { allowOnly: "must match password" } } }),
    verificationImage: Joi.any()
      .allow("")
      .optional(),
  },
  addTrade: {
    trade: Joi.string()
      .min(3)
      .required(),
  },
  addOrganization: {
    name: Joi.string()
      .min(3)
      .required(),
  },
  agency: {
    questions: Joi.object({
      1: Joi.string().required(),
      2: Joi.string().required(),
      3: Joi.string().required(),
      4: Joi.string().required(),
      5: Joi.string().required(),
      6: Joi.string().required(),
      7: Joi.string().required(),
      8: Joi.string().required(),

      // number input
      9: Joi.string().required(),

      10: Joi.string().required(),
      11: Joi.array().required(),
      12: Joi.string().required(),
      13: Joi.string().required(),
      14: Joi.string().required(),
      15: Joi.string().required(),
      16: Joi.string().required(),
      17: Joi.string().required(),
      // number input
      18: Joi.string().required(),

      19: Joi.string().required(),
      20: Joi.string().required(),
    }),
    checklist: Joi.array(),
    review: Joi.object({
      // workPeriod: Joi.string().required(),
      // rate: Joi.string().required(),
      overallReview: Joi.string().required(),
      // voiceReview: Joi.any()
    }),
    hasAgreed: Joi.boolean()
      .valid(true)
      .error(() => "You should agree Earwig terms of user"),
  },

  payroll: {
    questions: Joi.object({
      1: Joi.string().required(),
      2: Joi.string().required(),
      3: Joi.string().required(),
      // number
      4: Joi.string().required(),

      5: Joi.string().required(),
      6: Joi.string().required(),
      7: Joi.string().required(),
      8: Joi.string().required(),
      9: Joi.string().required(),
      10: Joi.string().required(),
      // number
      11: Joi.string().required(),

      12: Joi.string().required(),
      13: Joi.string().required(),
      14: Joi.string().required(),
    }),
    checklist: Joi.array(),
    review: Joi.object({
      // workPeriod: Joi.string().required(),
      // rate: Joi.string().required(),
      overallReview: Joi.string().required(),
      // voiceReview: Joi.any()
    }),
    hasAgreed: Joi.boolean()
      .valid(true)
      .error(() => "You should agree Earwig terms of user"),
  },
  worksite: {
    questions: Joi.object({
      1: Joi.string().required(),
      2: Joi.string().required(),
      3: Joi.string().required(),
      // number
      4: Joi.string().required(),

      5: Joi.string().required(),
      6: Joi.string().required(),
      7: Joi.string().required(),
      8: Joi.string().required(),
      9: Joi.string().required(),
      10: Joi.string().required(),
      11: Joi.string().required(),
      12: Joi.string().required(),
      13: Joi.string().required(),
      // 14 has his own value (checklist)
      15: Joi.string().required(),
      16: Joi.string().required(),
      17: Joi.string().required(),
      18: Joi.string().required(),
    }),
    checklist: Joi.array(),
    review: Joi.object({
      // workPeriod: Joi.string().required(),
      // rate: Joi.string().required(),
      overallReview: Joi.string().required(),
      // voiceReview: Joi.any()
    }),
    hasAgreed: Joi.boolean()
      .valid(true)
      .error(() => "You should agree Earwig terms of user"),
  },
  company: {
    questions: Joi.object({
      1: Joi.string().required(),
      2: Joi.string().required(),
      3: Joi.string().required(),
      4: Joi.string().required(),
      5: Joi.string().required(),
      6: Joi.string().required(),
      // name of the rep
      7: Joi.string().required(),

      8: Joi.string().required(),
      9: Joi.string().required(),
      10: Joi.string().required(),
    }),
    checklist: Joi.array(),
    review: Joi.object({
      // workPeriod: Joi.string().required(),
      // rate: Joi.string().required(),
      overallReview: Joi.string().required(),
      // voiceReview: Joi.any()
    }),
    hasAgreed: Joi.boolean()
      .valid(true)
      .error(() => "You should agree Earwig terms of user"),
  },
  onlyMongoId: {
    id: Joi.string().length(24).required(),
  },
  activateOrganization: {
    id: Joi.string().length(24).required(),
    active: Joi.boolean().required(),
  },
  reportContent: {
    reason: Joi.string().required(),
    description: Joi.string().required(),
    target: Joi.string().required(),
    organization: Joi.object().required(),
    question: Joi.object(),
    review: Joi.object(),
    comment: Joi.object(),
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
