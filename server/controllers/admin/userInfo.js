const boom = require("boom");

const getImageLink = require("./../../helpers/getImageLink");
const { getUserById } = require("./../../database/queries/user");

module.exports = ((req, res, next) => {
  const { id } = req.params;
  getUserById(id)
    .then((user) => {
      if (!user) {
        next(boom.notFound("user not found!"));
      } else {
        getImageLink(user.verificationPhoto)
          .then((url) => {
            res.json({ userInfo: user, url });
          }).catch(() => {
            next(boom.badImplementation());
          });
      }
    }).catch(() => {
      next(boom.badImplementation());
    });
});
