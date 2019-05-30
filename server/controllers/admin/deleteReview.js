/**
 * delete review and it's answers
 * @param {id} - mongoID - review id
 */

const boom = require("@hapi/boom");
const { deleteReview, deleteReviewAnswers, findById } = require("./../../database/queries/reviews");

module.exports = ((req, res, next) => {
  const { id } = req.body;
  findById(id).then((review) => {
    if (!review) {
      next(boom.notFound("review not found!"));
    } else {
      deleteReview(id)
        .then(({ deletedCount }) => {
          if (deletedCount > 0) {
            deleteReviewAnswers(id)
              .then(() => {
                res.json();
              }).catch(() => {
                next(boom.badImplementation());
              });
          } else {
            next(boom.methodNotAllowed("can not be deleted!"));
          }
        }).catch(() => {
          next(boom.badImplementation());
        });
    }
  });
});
