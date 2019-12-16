// approvalEmail
const approvalEmail = require("./templates/approvalEmail");
// createAccountEmail
const createAccount = require("./templates/createAccountEmail");
// emailAdminTheNewProfile
const newEntityAdded = require("./templates/newEntityAdded");
// rejectionEmail
const userRejection = require("./templates/userRejection");
const reportMailing = require("./templates/reportMailing");
const resetPasswordMailing = require("./templates/resetPasswordMailing");
const verificationPhotoEmail = require("./templates/verificationPhotoEmail");


module.exports = {
  approvalEmail,
  createAccount,
  newEntityAdded,
  userRejection,
  reportMailing,
  resetPasswordMailing,
  verificationPhotoEmail,
};
