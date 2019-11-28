const mongoose = require("mongoose");

const dbConnection = require("./../dbConnection");
const { resetDb, resetDBDev, resetDBProd } = require("./resetDB");

const trades = require("./trades");
const questions = require("./questions");
const organizations = require("./organizations");
const answers = require("./answers");
const comments = require("./comments");
const jobs = require("./jobs");
const reviews = require("./reviews");
const users = require("./users");
const mailList = require("./mailList");
const helpfulness = require("./helpfulness");

// production databases
const realOrganizations = require("./../productionData/organizations");
const realTrades = require("./../productionData/trades");

const buildDummyData = () => new Promise((resolve, reject) => {
  dbConnection()
    .then(async (res) => {
      if (res.connection.host.includes("hvkjd")) {
        throw new Error("Don't do this, this script is not meant to be used on dev or prod db");
      }
      // delete all documents from models
      await resetDb();
      await trades();
      await organizations();
      await questions();
      await users();
      await reviews();
      await jobs();
      await comments();
      await answers();
      await mailList();
      return helpfulness();
    })
    .then(resolve)
    .catch(reject);
});
const buildDevelopmentData = () => new Promise((resolve, reject) => {
  dbConnection()
    .then(async (res) => {
      if (res.connection.host.includes("hvkjd")) {
        throw new Error("Don't do this, this script is not meant to be used on dev or prod db");
      }
      await resetDBDev();

      await realTrades();
      await realOrganizations();
      await questions();
      return users();
    })
    .then(resolve)
    .catch(reject);
});

const buildProdctionData = () => new Promise((resolve, reject) => {
  dbConnection()
    .then(async () => {
      // delete all documents from models
      await resetDBProd();
      await questions();
      return users();
    })
    .then(resolve)
    .catch(reject);
});


// check the NODE_ENV
// if it is "test" that mean we run the the build script in terminal
// invoke the build function

if (process.env.NODE_ENV === "production") {
  buildProdctionData().then(() => {
    // eslint-disable-next-line no-console
    console.log("Done!: Production DB has been built successfully");
    // close the connection after build
    mongoose.disconnect();
  })
    .catch((err) => {
    // eslint-disable-next-line no-console
      console.log("err", err);
      mongoose.disconnect();
    });
} else if (process.env.NODE_ENV === "development") {
  buildDevelopmentData()
    .then(() => {
    // eslint-disable-next-line no-console
      console.log("Done!: Dev DB has been built successfully");
      // close the connection after build
      mongoose.disconnect();
    })
    .catch((err) => {
      // eslint-disable-next-line no-console
      console.log("err", err);
      mongoose.disconnect();
    });
} else if (process.env.NODE_ENV !== "test") {
  buildDummyData()
    .then(() => {
    // eslint-disable-next-line no-console
      console.log("Done!: Dev DB has been built successfully");
      // close the connection after build
      mongoose.disconnect();
    })
    .catch((err) => {
      // eslint-disable-next-line no-console
      console.log("err", err);
      mongoose.disconnect();
    });
}

module.exports = buildDummyData;
