/* eslint-disable camelcase */
const joi = require("joi");

const envVarsSchema = joi.object({
  MONGO_URI: joi.string().when("NODE_ENV", { is: "production", then: joi.required() }),
  MONGOURI_TEST: joi.string().when("NODE_ENV", { is: "test", then: joi.required() }),
  MONGOURI_DEV: joi.string().when("NODE_ENV", { is: "development", then: joi.required() }),
}).unknown()
  .required();

const { error, value: envVars } = joi.validate(process.env, envVarsSchema);
if (error) {
  throw new Error(`Config validation error: ${error.message}`);
}

const {
  MONGO_URI,
  MONGOURI_TEST,
  MONGOURI_DEV,
} = envVars;

const config = {
  mongodbUrl: {
    production: MONGO_URI,
    development: MONGOURI_DEV,
    test: MONGOURI_TEST,
  },
};

module.exports = config;
