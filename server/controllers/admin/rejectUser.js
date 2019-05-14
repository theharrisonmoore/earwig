/**
 * reject user and update the user state to be unverified
 * remove the verificcation image from DB
 * @todo delete verification image from google storage
 * @param {id} mongoID - user id
 */

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
      } else if (!user.verificationPhoto) {
        next(boom.badData("the user has no verification image"));
      } else {
        // update user state
        updateUserById(id, updateData)
          .then(() => {
            // delete verification photo from google storage
            deleteFile(user.verificationPhoto)
              .then(() => {
                res.send();
              })
              .catch((err) => {
                if (err.message === "file is no longer available") {
                  next(boom.badData(err));
                } else {
                  next(boom.badImplementation());
                }
              });
          })
          .catch(() => {
            next(boom.badImplementation());
          });
      }
    });
});
