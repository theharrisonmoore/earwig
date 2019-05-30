const boom = require("@hapi/boom");
const { deleteAnswer } = require("./../../database/queries/reviews");

module.exports = (req, res, next) => {
  const { id } = req.params;

  deleteAnswer(id)
    .then(({ deletedCount }) => {
      if (deletedCount > 0) {
        res.json("success");
      } else {
        next(boom.methodNotAllowed("cannot be deleted!"));
      }
    })
    .catch(() => {
      next(boom.badImplementation());
    });
};
