/* eslint-disable camelcase */
const joi = require("joi");

const envVarsSchema = joi.object({
  MONGO_URI: joi.string().required(),
  MONGOURI_TEST: joi.string().required(),
}).unknown()
  .required();

const { error, value: envVars } = joi.validate(process.env, envVarsSchema);
if (error) {
  throw new Error(`Config validation error: ${error.message}`);
}

const {
  MONGO_URI,
  MONGOURI_TEST,
} = envVars;

const config = {
  mongodb: {
    mongoURI: MONGO_URI,
    mongoTestURI: MONGOURI_TEST,
  },
};

module.exports = config;
