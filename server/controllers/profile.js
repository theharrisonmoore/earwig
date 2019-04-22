const boom = require("boom");

const {
  overallReview,
  basicReview,
  allAnswers,
  checkOrgExists,
} = require("./../database/queries/reviews");

module.exports = async (req, res, next) => {
  const { organizationID } = req.body;
  const { user } = req;

  // check organisation exists
  const organization = await checkOrgExists(organizationID).catch(err => next(boom.badImplementation(err)));

  if (!organization) return next(boom.notFound("Cannot find the organization you're looking for"));

  let summary;
  let reviewDetails;
  let level;


  if (user) {
    summary = await overallReview(organizationID).catch(err => next(boom.badImplementation(err)));

    reviewDetails = await allAnswers(organizationID).catch(err => next(boom.badImplementation(err)));

    level = user.verified ? 2 : 1;
  } else {
    summary = await basicReview(organizationID).catch(err => next(boom.badImplementation(err)));

    reviewDetails = [];

    level = 0;
  }


  // overallReview(organizationID)
  //   .then(result => res.json({ summary: result, id: organizationID }))
  //   .catch(err => console.error(err));

  // checkOrgExists(organizationID).then(result => res.json(result));

  return res.json({ summary, reviewDetails, level });
};
