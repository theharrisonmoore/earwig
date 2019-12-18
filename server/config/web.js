const server = require("./components/server");
const firebase = require("./components/firebase");
const common = require("./components/common");
const mailer = require("./components/mailer");
const mongodb = require("./components/mongodb");
const thirdParty = require("./components/thirdParty");

module.exports = Object.assign({}, server, firebase, common, mailer, mongodb, thirdParty);
