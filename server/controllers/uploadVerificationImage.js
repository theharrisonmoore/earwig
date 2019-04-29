const boom = require("boom");

const { updateUserById } = require("./../database/queries/user");

module.exports = async (req, res, next) => {
  // to be updated when authentication is ready
  const { user } = req;
  const { tradeId, city } = req.body;
  const { uploadedFileName } = req.file;
  updateUserById(user._id, {
    tradeId,
    awaitingReview: true,
    verificationPhoto: uploadedFileName,
    city,
  })
    .then(() => {
      res.send();
    }).catch(() => {
      next(boom.badImplementation("Error in updating your information"));
    });
};
