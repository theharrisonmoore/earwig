
const config = require("../config");

const isProduction = () => config.env === "production";

module.exports = { isProduction };
