const boom = require("boom");

const allReviewsIncAnswers = require("../../database/queries/reviews/allReviewsIncAnswers");
const { getAllQs } = require("../../database/queries/reviews")

module.exports = (req, res, next) => {
  allReviewsIncAnswers()
    .then((reviews) => {
      // in each review obj map through the answers and add as key pairings
      const cleanedReviews = reviews.map((review) => {
        const newReviewObj = review;

        if (review.answers && review.answers.length > 0) {
          review.answers.map((answer) => {
            const { question, comment } = answer;
            newReviewObj[`${question.category}: ${question.text}`] = answer.answer;
            newReviewObj[`${question.category}: ${question.text}: Comment`] = comment || "-";
            return newReviewObj;
          });
        }

        // now answers assigned, remove answers array from obj
        delete newReviewObj.answers;

        return newReviewObj;
      });

      return { cleanedReviews, reviews }

      // res.json(cleanedReviews);
    }).then(({cleanedReviews, reviews}) => {
      return getAllQs().then(questions => {

        //  initial headers
        let allHeaders = [ "Review date", "Overall star rating", "Overall Review", "earwig ID", "Unique User ID", "Town or City", "Points earned", "People helped", "Reviews given", "Trade", "Entity type", "Entity name", "Date from", "Date to"  ]

        // clean questions so only unique values
        const questionText = questions.map(question => question.text)
        const distinctQs = [...new Set(questionText)]

        const sortedQs = questions.sort((a, b) => a.category.localeCompare(b.category))

        sortedQs.map(question => {
          const newQs = [`${question.category}: ${question.text}`, `${question.category}: ${question.text}: Comment`]
          allHeaders.push(...newQs)
          })

        res.json({cleanedReviews, headers: allHeaders})
      })
    })
    .catch(err => next(boom.badImplementation(err)));
};
