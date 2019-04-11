const { updateUserById } = require("./../database/queries/user");
const User = require("./../database/models/User");

module.exports = async (req, res) => {
  const user = await User.findOne({ isAdmin: false });
  const { tradeId } = req.body;
  const { uploadedFileName } = req.file;
  updateUserById(user._id, { tradeId, awaitingReview: true, verificationPhoto: uploadedFileName })
    .then(() => {
      res.json({});
    });
};
