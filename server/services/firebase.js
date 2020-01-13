const admin = require("firebase-admin");
const config = require("../config");

admin.initializeApp({
  credential: admin.credential.cert(config.firebase.creds),
  storageBucket: config.firebase.storageBucket,
});

module.exports.admin = admin;
