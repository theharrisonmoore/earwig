const joi = require("joi");

const envVarsSchema = joi.object({
  SENTRY_DSN: joi.string().required(),
  MAILCHIMP_LIST_URL: joi.string().required(),
  MAILCHIMP_LIST_APIKEY: joi.string().required(),
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
