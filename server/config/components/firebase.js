/* eslint-disable camelcase */
const joi = require("joi");

const envVarsSchema = joi.object({
  type: joi.string().required(),
  project_id: joi.string().required(),
  private_key_id: joi.string().required(),
  private_key: joi.string().required(),
  client_email: joi.string().required(),
  client_id: joi.string().required(),
  auth_uri: joi.string().required(),
  token_uri: joi.string().required(),
  auth_provider_x509_cert_url: joi.string().required(),
  client_x509_cert_url: joi.string().required(),
  storageBucket: joi.string().required(),
}).unknown()
  .required();

const { error, value: envVars } = joi.validate(process.env, envVarsSchema);
if (error) {
  throw new Error(`Config validation error: ${error.message}`);
}

const {
  type,
  project_id,
  private_key_id,
  private_key,
  client_email,
  client_id,
  auth_uri,
  token_uri,
  auth_provider_x509_cert_url,
  client_x509_cert_url,
  storageBucket,
} = envVars;

const privateKey = private_key
  .replace(new RegExp("\\\\n", "g"), "\n")
  .replace("\"", "");

const config = {
  firebase: {
    creds: {
      type,
      project_id,
      private_key_id,
      client_email,
      client_id,
      auth_uri,
      token_uri,
      auth_provider_x509_cert_url,
      client_x509_cert_url,
      private_key: privateKey,
    },
    storageBucket,
  },
};

module.exports = config;
