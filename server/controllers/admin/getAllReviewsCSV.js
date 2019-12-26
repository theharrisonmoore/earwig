const boom = require("boom");

const allReviewsIncAnswers = require("../../database/queries/reviews/allReviewsIncAnswers");
const { getAllQs } = require("../../database/queries/reviews");

module.exports = (req, res, next) => {
  allReviewsIncAnswers()
    .then((reviews) => {
      // in each review obj map through the answers and add as key pairings
      const cleanedReviews = reviews.map((review) => {
        const newReviewObj = review;

        review.answers.forEach((answer) => {
          const { question, comment } = answer;

          if (question && question.category && question.text) {
            newReviewObj[`${question.category}: ${question.text}`] = answer.answer;
            newReviewObj[`${question.category}: ${question.text}: Comment`] = comment || "-";
          }
        });

        // now answers assigned, remove answers array from obj
        delete newReviewObj.answers;

        return newReviewObj;
      });

      return { cleanedReviews, reviews };
    }).then(({ cleanedReviews }) => getAllQs().then((questions) => {
      //  initial headers
      const allHeaders = ["Review date", "Overall star rating", "Overall Review", "earwig ID", "Unique User ID", "Town or City", "Points earned", "People helped", "Reviews given", "Trade", "Current agency", "Current payroll", "Current worksite", "Current company", "Entity type", "Entity name", "Last Use", "Date to"];

      const sortedQs = questions.sort((a, b) => a.category.localeCompare(b.category));

      sortedQs.forEach((question) => {
        const newQs = [`${question.category}: ${question.text}`, `${question.category}: ${question.text}: Comment`];
        allHeaders.push(...newQs);
      });

      res.json({ cleanedReviews, headers: allHeaders });
    }))
    .catch((err) => {
      next(boom.badImplementation(err));
    });
};
