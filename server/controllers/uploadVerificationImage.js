const boom = require("boom");

const { updateUserById } = require("./../database/queries/user");
const User = require("./../database/models/User");

module.exports = async (req, res, next) => {
  // to be updated when authentication is ready
  const user = await User.findOne({ isAdmin: false });
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
