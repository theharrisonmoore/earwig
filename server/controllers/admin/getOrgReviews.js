const boom = require("boom");

const { getOrgReviews } = require("./../../database/queries/reviews");

module.exports = (req, res, next) => {
  const { id } = req.params;
  console.log("helllooo", id);
  getOrgReviews(id)
    .then((reviews) => {
      console.log(reviews);
      res.json(reviews);
    })
    .catch((err) => {
      console.log(err);
      next(boom.badImplementation());
    });
};

// display orgDetails, reviews, comments for that org

// A) modify reviews

// 1)
// change each modified review: OrgId
// get all answers for that reviewId and change answer orgIds

// 2)
// change each modified comment for that org -> update orgID
