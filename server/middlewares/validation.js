const Joi = require("joi");
const boom = require("boom");

// define all routes schema here
const schemas = {
  login: {
    email: Joi.string()
      .email({ minDomainAtoms: 2 })
      .required(),
    password: Joi.string().required()
  },
  uploadVerificationImage: {
    tradeId: Joi.string()
      .length(24)
      .required(),
    city: Joi.string().allow("")
  },
  signup: {
    email: Joi.string()
      .email({ minDomainAtoms: 2 })
      .required(),
    password: Joi.string()
      .min(6)
      .required(),
    checkbox: Joi.boolean()
      .valid(true)
      .error(() => "You should agree Earwig terms of user"),
    referral: Joi.string().length(24),
    isWorker: Joi.string()
      .valid(["yes", "no"], "Must select an option")
      .required("Required"),
    trade: Joi.string()
      .when("isWorker", { is: "no", then: Joi.allow("").optional() })
      .when("isWorker", { is: "yes", then: Joi.required("trade is required") }),
    orgType: Joi.string().when("isWorker", {
      is: "no",
      then: Joi.string()
        .valid(
          ["agency", "payroll", "company", "mainCompany", "other"],
          "invalid organisation type"
        )
        .required(),
      otherwise: Joi.allow("").optional()
    }),
    otherOrg: Joi.string().when("orgType", {
      is: "other",
      then: Joi.string().min(3),
      otherwise: Joi.allow("").optional()
    })
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
    newUsername: Joi.string().max(15),
    newTrade: Joi.any(),
    newCity: Joi.string().allow("")
  },
  addTrade: {
    trade: Joi.string()
      .min(3)
      .required()
  },
  addOrganization: {
    name: Joi.string()
      .min(3)
      .required(),
    category: Joi.string()
      .valid("payroll", "company", "worksite", "agency")
      .required()
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
      8: Joi.number().required(),
      9: Joi.string().required(),
      10: Joi.string().required(),
      11: Joi.string().required(),
      12: Joi.string().required(),
      13: Joi.string().required(),
      14: Joi.string().required(),
      15: Joi.string().required(),
      16: Joi.number().required(),
      17: Joi.string().required(),
      18: Joi.string().required()
    }),
    review: Joi.object({
      lastUse: Joi.date().required(),
      rate: Joi.number().required(),
      overallReview: Joi.string().required(),
      voiceReview: Joi.any()
    }),
    hasAgreed: Joi.boolean()
      .valid(true)
      .error(() => "You should agree Earwig terms of user")
  },

  payroll: {
    questions: Joi.object({
      1: Joi.string().required(),
      2: Joi.string().required(),
      // 3: Joi.number().required(),
      4: Joi.string().required(),
      5: Joi.string().required(),
      6: Joi.string().required(),
      7: Joi.string().required(),
      8: Joi.string().required(),
      9: Joi.number().required(),
      10: Joi.string().required(),
      11: Joi.string().required(),
      12: Joi.string().required()
    }),
    review: Joi.object({
      lastUse: Joi.date().required(),
      rate: Joi.number().required(),
      overallReview: Joi.string().required(),
      voiceReview: Joi.any()
    }),
    hasAgreed: Joi.boolean()
      .valid(true)
      .error(() => "You should agree Earwig terms of user")
  },
  worksite: {
    questions: Joi.object({
      1: Joi.string().required(),
      2: Joi.string().required(),
      3: Joi.number().required(),
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
      14: Joi.any().required(),
      15: Joi.string().required(),
      16: Joi.string().required(),
      17: Joi.string().required(),
      18: Joi.string().required()
    }),
    review: Joi.object({
      lastUse: Joi.date().required(),
      rate: Joi.number().required(),
      overallReview: Joi.string().required(),
      voiceReview: Joi.any()
    }),
    hasAgreed: Joi.boolean()
      .valid(true)
      .error(() => "You should agree Earwig terms of user")
  },
  company: {
    questions: Joi.object({
      1: Joi.string().required(),
      2: Joi.string().required(),
      3: Joi.string().required(),
      4: Joi.string().required(),
      5: Joi.string().required(),
      6: Joi.string().required(),
      7: Joi.string().required(),
      8: Joi.string().required(),
      9: Joi.string().required()
    }),
    review: Joi.object({
      lastUse: Joi.date().required(),
      rate: Joi.number().required(),
      overallReview: Joi.string().required(),
      voiceReview: Joi.any()
    }),
    hasAgreed: Joi.boolean()
      .valid(true)
      .error(() => "You should agree Earwig terms of user")
  },
  onlyMongoId: {
    id: Joi.string()
      .length(24)
      .required()
  },
  activateOrganization: {
    id: Joi.string()
      .length(24)
      .required(),
    active: Joi.boolean().required()
  },
  reportContent: {
    // required params
    reason: Joi.string().required(),
    description: Joi.string().required(),
    target: Joi.string().required(),
    orgId: Joi.string().required(),
    orgName: Joi.string().required(),
    reportedReviewUserId: Joi.string().required(),
    // optional params
    reportedReviewText: Joi.string(),
    reportedReplyUserId: Joi.string(),
    reportedReplyText: Joi.string(),
    question: Joi.object(),
    review: Joi.object(),
    comment: Joi.object(),
    reply: Joi.object(),
    image: Joi.string()
  },
  addCommentOnQuestion: {
    text: Joi.string().required(),
    displayName: Joi.string()
      .allow("")
      .optional(),
    question: Joi.string()
      .length(24)
      .required(),
    organization: Joi.string()
      .length(24)
      .required(),
    parentCommentId: Joi.string().allow(""),
    reviewId: Joi.string().allow("")
  },
  addCommentOnReview: {
    text: Joi.string().required(),
    displayName: Joi.string()
      .allow("")
      .optional(),
    reviewId: Joi.string()
      .length(24)
      .required(),
    target: Joi.string().required()
  },
  setCurrentOrgs: {
    currentAgency: Joi.object(),
    currentPayroll: Joi.object(),
    currentWorksite: Joi.object(),
    currentCompany: Joi.object()
  }
};

module.exports = route => (req, res, next) => {
  const schema = Joi.object().keys(schemas[route]);
  const isValid = Joi.validate(req.body, schema);

  if (!isValid.error) {
    return next();
  }
  return next(boom.badRequest(isValid.error.details[0].message));
};
