const joi = require("joi");

const envVarsSchema = joi.object({
  PORT: joi.number().required(),
  DOMAIN: joi.string().required(),
  SECRET: joi.string().required(),
}).unknown()
  .required();

const { error, value: envVars } = joi.validate(process.env, envVarsSchema);
if (error) {
  throw new Error(`Config validation error: ${error.message}`);
}

const config = {
  server: {
    port: envVars.PORT,
    domain: envVars.DOMAIN,
    secret: envVars.SECRET,
  },
};

module.exports = config;
