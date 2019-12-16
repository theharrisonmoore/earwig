const mongoose = require("mongoose");

const config = require("../config");

// read the config file
// require("dotenv").config();
require("env2")("./.env");

let { mongoURI } = config.mongodb;

if (config.env === "test") {
  // change mongoURI to testing database URI
  mongoURI = config.mongodb.mongoTestURI;
}

// create DB connection
const dbConnection = async () => mongoose.disconnect().then(() => mongoose.connect(mongoURI, {
  useNewUrlParser: true,
  useCreateIndex: true,
  useFindAndModify: false,
  useUnifiedTopology: true,
}));

module.exports = dbConnection;
