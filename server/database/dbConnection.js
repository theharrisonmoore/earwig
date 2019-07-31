const mongoose = require("mongoose");

// read the config file
// require("dotenv").config();
require("env2")("./.env");

let mongoURI = process.env.MONGO_URI;

if (process.env.NODE_ENV === "test") {
  // change mongoURI to testing database URI
  mongoURI = "mongodb+srv://ABD:H5nI1XcPZctS7QkF@earwig-hvkjd.mongodb.net/test?retryWrites=true";
}

// create DB connection
const dbConnection = async () => mongoose.disconnect().then(() => mongoose.connect(mongoURI, {
  useNewUrlParser: true,
  useCreateIndex: true,
  useFindAndModify: false,
}));

module.exports = dbConnection;
