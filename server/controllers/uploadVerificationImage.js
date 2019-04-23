const boom = require("boom");

const { updateUserById } = require("./../database/queries/user");
const User = require("./../database/models/User");

module.exports = async (req, res, next) => {
  const { user } = req;
  const { tradeId } = req.body;
  const { uploadedFileName } = req.file;
  updateUserById(user._id, {
    tradeId,
    awaitingReview: true,
    verificationPhoto: uploadedFileName,
  })
    .then(() => {
      res.send();
    }).catch(() => {
      next(boom.badImplementation("Error in updating your information"));
    });
};
