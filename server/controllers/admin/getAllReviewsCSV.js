const boom = require("boom");

const allReviewsIncAnswers = require("../../database/queries/reviews/allReviewsIncAnswers");

module.exports = (req, res, next) => {
  allReviewsIncAnswers()
    .then((reviews) => {
      // in each review obj map through the answers and add as key pairings
      const cleanedReviews = reviews.map((review) => {
        const newReviewObj = review;

        if (review.answers && review.answers.length > 0) {
          review.answers.map((answer) => {
            newReviewObj[answer.question.text] = answer.answer;
            newReviewObj[`${answer.question.text}: Comment`] = answer.comment || "-";
            return newReviewObj;
          });
        }

        // now answers assigned, remove answers array from obj
        delete newReviewObj.answers;

        return newReviewObj;
      });

      res.json(cleanedReviews);
    })
    .catch(err => next(boom.badImplementation(err)));
};
