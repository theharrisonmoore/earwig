const mongoose = require("mongoose");

const config = require("../config");

// read the config file
// require("dotenv").config();
require("env2")("./.env");

const { mongodbUrl, env } = config;

const mongoURI = mongodbUrl[env];

// create DB connection
const dbConnection = async () => mongoose.disconnect().then(() => mongoose.connect(mongoURI, {
  useNewUrlParser: true,
  useCreateIndex: true,
  useFindAndModify: false,
  useUnifiedTopology: true,
}));

module.exports = dbConnection;
