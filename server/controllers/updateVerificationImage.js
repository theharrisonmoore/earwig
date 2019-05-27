const boom = require("boom");

const { updateUserById } = require("./../database/queries/user");

module.exports = async (req, res, next) => {
  // to be updated when authentication is ready
  const { user } = req;
  const { tradeId, city } = req.body;
  let uploadedFileName;
  const updateData = {};

  if (req.file) {
    // eslint-disable-next-line prefer-destructuring
    uploadedFileName = req.file.uploadedFileName;
    updateData.verificationPhoto = uploadedFileName;
  }
  if (tradeId) {
    updateData.trade = tradeId;
  }

  if (city) {
    updateData.city = city;
  }


  updateUserById(user._id, updateData)
    .then(() => {
      res.send();
    }).catch(() => {
      next(boom.badImplementation("Error in updating your information"));
    });
};
