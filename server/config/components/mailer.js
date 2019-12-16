/* eslint-disable camelcase */
const joi = require("joi");

const envVarsSchema = joi.object({
  EMAIL: joi.string().when("NODE_ENV", { is: "test", then: joi.string(), otherwise: joi.string().required() }),
  REPORT_EMAIL: joi.string().when("NODE_ENV", { is: "test", then: joi.string(), otherwise: joi.string().required() }),
  HELP_EMAIL: joi.string().when("NODE_ENV", { is: "test", then: joi.string(), otherwise: joi.string().required() }),
  DELETE_EMAIL: joi.string().when("NODE_ENV", { is: "test", then: joi.string(), otherwise: joi.string().required() }),
  PROFILE_EMAIL: joi.string().when("NODE_ENV", { is: "test", then: joi.string(), otherwise: joi.string().required() }),
  EMAIL_PASSWORD: joi.string().when("NODE_ENV", { is: "test", then: joi.string(), otherwise: joi.string().required() }),
  REPORT_RECEIVER_EMAIL: joi.string().when("NODE_ENV", { is: "test", then: joi.string(), otherwise: joi.string().required() }),
}).unknown()
  .required();

const { error, value: envVars } = joi.validate(process.env, envVarsSchema);
if (error) {
  throw new Error(`Config validation error: ${error.message}`);
}

const {
  EMAIL,
  REPORT_EMAIL,
  HELP_EMAIL,
  DELETE_EMAIL,
  PROFILE_EMAIL,
  EMAIL_PASSWORD,
  REPORT_RECEIVER_EMAIL,
} = envVars;


const config = {
  email: {
    password: EMAIL_PASSWORD,
    main: EMAIL,
    aliases: {
      reportSend: REPORT_EMAIL,
      reportRecive: REPORT_RECEIVER_EMAIL,
      help: HELP_EMAIL,
      delete: DELETE_EMAIL,
      profile: PROFILE_EMAIL,
    },
  },
};

module.exports = config;
