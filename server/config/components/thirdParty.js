const joi = require("joi");

const envVarsSchema = joi.object({
  SENTRY_DSN: joi.string().when("NODE_ENV", { is: "test", then: joi.string(), otherwise: joi.string().required() }),
  MAILCHIMP_LIST_URL: joi.string().when("NODE_ENV", { is: "test", then: joi.string(), otherwise: joi.string().required() }),
  MAILCHIMP_LIST_APIKEY: joi.string().when("NODE_ENV", { is: "test", then: joi.string(), otherwise: joi.string().required() }),
}).unknown()
  .required();

const { error, value: envVars } = joi.validate(process.env, envVarsSchema);
if (error) {
  throw new Error(`Config validation error: ${error.message}`);
}

const config = {
  thirdParty: {
    sentry: {
      dsn: envVars.SENTRY_DSN,
    },
    mailChimp: {
      listUrl: envVars.MAILCHIMP_LIST_URL,
      apiKey: envVars.MAILCHIMP_LIST_APIKEY,
    },
  },
};

module.exports = config;
