const boom = require("boom");
const { getUserById } = require("./../database/queries/user");
const { addToMailList, findOne } = require("./../database/queries/mailList");

module.exports = async (req, res, next) => {
  const { id } = req.body;

  getUserById(id, true)
    .then((user) => {
      if (!user) {
        next(boom.notFound("user not found!"));
      } else {
        // check for user email in the email list
        findOne(user.email)
          .then((storedEmail) => {
            if (storedEmail) {
              next(boom.conflict("Already subscribed"));
            } else {
              addToMailList(user.email)
                .then(() => {
                  res.json({ message: "your subscription has been confirmed. You've been added to ouremail list." });
                })
                .catch(() => {
                  next(boom.badImplementation());
                });
            }
          })
          .catch(() => {
            next(boom.badImplementation());
          });
      }
    })
    .catch(() => {
      next(boom.badImplementation());
    });
};
