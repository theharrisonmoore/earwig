const boom = require("boom");

const { updateUserById, getUserById } = require("./../../database/queries/user");
const deleteFile = require("./../../helpers/deleteFile");

module.exports = ((req, res, next) => {
  const { id } = req.body;
  const updateData = {
    awaitingReview: false,
    verified: false,
    verificationPhoto: undefined,
  };

  getUserById(id)
    .then((user) => {
      if (!user) {
        next(boom.notFound("user not found!"));
      } else {
        // update user state
        updateUserById(id, updateData)
          .then(() => {
            // delete verification photo from google storage
            deleteFile(user.verificationPhoto)
              .then(() => {
                res.send();
              })
              .catch(() => {
                next(boom.badImplementation());
              });
          })
          .catch(() => {
            next(boom.badImplementation());
          });
      }
    });
});
