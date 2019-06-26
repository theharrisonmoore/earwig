const boom = require("boom");

const {
  overallReview,
  basicReview,
  allAnswers,
  checkOrgExists,
  checkUsersLatestReview,
} = require("./../database/queries/reviews");

const { getHelpedPoints } = require("./../database/queries/user/index");

module.exports = async (req, res, next) => {
  const { organizationID } = req.body;

  const { user } = req;

  // check organisation exists
  const organization = await checkOrgExists(organizationID).catch(err => next(boom.badImplementation(err)));

  if (!organization) return next(boom.notFound("Cannot find the organization you're looking for"));

  let summary;
  let reviewDetails;
  let level;
  let reviewsLast30Days = [];
  let helpedPoints;

  if (user) {
    summary = await overallReview(organizationID).catch(err => next(boom.badImplementation(err)));

    helpedPoints = await getHelpedPoints("5d1372fb6f4a8726cd637b31").catch(err => next(boom.badImplementation(err)));

    // check if user has already given reviews less old than 4 weeks
    const userReviews = await checkUsersLatestReview(organizationID, user._id);

    if (userReviews.length > 0) {
      reviewsLast30Days = userReviews.filter(review => review.older_30_days === false);
    }

    reviewDetails = await allAnswers(organizationID).catch(err => next(boom.badImplementation(err)));

    level = user.verified ? 2 : 1;
  } else {
    summary = await basicReview(organizationID).catch(err => next(boom.badImplementation(err)));

    if (summary[0].reviews.length === 0) summary[0].reviews = [{}];

    reviewDetails = [];

    level = 0;
  }

  // console.log("REV", summary[0].reviews[0]);

  // overallReview(organizationID)
  //   .then(result => res.json({ summary: result, id: organizationID }))
  //   .catch(err => console.error(err));

  // checkOrgExists(organizationID).then(result => res.json(result));

  return res.json({
    summary,
    reviewDetails,
    level,
    reviewsLast30Days,
    helpedPoints,
  });
};
