const boom = require("boom");

const {
  overallReview,
  basicReview,
  allAnswers,
  allQsAndAs,
  checkOrgExists,
  checkUsersLatestReview,
} = require("./../database/queries/reviews");

module.exports = async (req, res, next) => {
  const { organizationID } = req.params;
  const { user } = req;
  try {
    // check organisation exists
    const organization = await checkOrgExists(organizationID).catch(err => next(boom.badImplementation(err)));

    if (!organization) return next(boom.notFound("Cannot find the organization you're looking for"));

    let summary;
    let reviewDetails;
    let reviewsLast30Days = [];
    // let newReviewDetails;

    if (user) {
      summary = await overallReview(organizationID).catch((err) => {
        next(boom.badImplementation(err));
      });


      // check if user has already given reviews less old than 4 weeks
      const userReviews = await checkUsersLatestReview(organizationID, user._id);

      if (userReviews.length > 0) {
        reviewsLast30Days = userReviews.filter(review => review.older_30_days === false);
      }

      // reviewDetails = await allAnswers(organizationID)
      //   .catch(err => next(boom.badImplementation(err)));

      // reviewDetails = await allAnswers(organizationID)
      //   .catch(err => next(boom.badImplementation(err)));

      reviewDetails = await allQsAndAs(organization.category, organizationID).catch(err => next(boom.badImplementation(err)));
    } else {
      summary = await basicReview(organizationID).catch(err => next(boom.badImplementation(err)));

      if (summary[0].reviews.length === 0) summary[0].reviews = [{}];
      if (organization.category === "worksite") {
        const justContractor = true;
        reviewDetails = await allQsAndAs(
          organization.category,
          organizationID,
          justContractor,
        ).catch(err => next(boom.badImplementation(err)));
      } else {
        reviewDetails = [];
      }
    }

    return res.json({
      summary,
      reviewDetails,
      reviewsLast30Days,
    });
  } catch (error) {
    return next(boom.badImplementation(error));
  }
};
