/* eslint-disable global-require, import/no-dynamic-require */

// load .env in local development
// if (process.env.NODE_ENV !== "production") {
require("dotenv").config();
// }

const processType = process.env.PROCESS_TYPE;

let config;
try {
  config = require(`./${processType}`);
} catch (error) {
  if (error.code === "MODULE_NOT_FOUND") {
    throw new Error(`No config for process type: ${processType}`);
  }
  throw error;
}

module.exports = config;
