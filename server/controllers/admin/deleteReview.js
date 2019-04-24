const boom = require("boom");
const { deleteReview, findById } = require("./../../database/queries/reviews");

module.exports = ((req, res, next) => {
  const { id } = req.body;
  findById(id).then((review) => {
    if (!review) {
      next(boom.notFound("review not found!"));
    } else {
      deleteReview(id)
        .then(({ deletedCount }) => {
          if (deletedCount > 0) {
            res.json();
          } else {
            next(boom.methodNotAllowed("can not be deleted!"));
          }
        }).catch(() => {
          next(boom.badImplementation());
        });
    }
  });
});
