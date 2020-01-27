//  gets all answers and questions of a review by id

const boom = require("boom");

const {
  getReviewDetails,
  getOneReviewWithOrgAndUser,
} = require("./../../database/queries/reviews");

module.exports = async (req, res, next) => {
  const { reviewID } = req.params;

  const promises = [
    getOneReviewWithOrgAndUser(reviewID),
    getReviewDetails(reviewID),
  ];

  try {
    const details = await Promise.all(promises);

    res.send({ review: details[0], details: details[1] });
  } catch (error) {
    next(boom.badImplementation(error));
  }
};
