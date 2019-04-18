const boom = require("boom");

const { overallReview, allAnswers, checkOrgExists } = require("./../database/queries/reviews");

module.exports = async (req, res, next) => {
  const { organizationID } = req.body;

  console.log("USER", req.user);

  // check organisation exists
  const organization = await checkOrgExists(organizationID).catch(err => next(boom.badImplementation(err)));

  if (!organization) return next(boom.notFound("Cannot find the organization you're looking for"));

  const summary = await overallReview(organizationID).catch(err => next(boom.badImplementation(err)));

  const reviewDetails = await allAnswers(organizationID).catch(err => next(boom.badImplementation(err)));

  // overallReview(organizationID)
  //   .then(result => res.json({ summary: result, id: organizationID }))
  //   .catch(err => console.error(err));

  // checkOrgExists(organizationID).then(result => res.json(result));

  console.log("SUM", summary[0].reviews);

  return res.json({ summary, reviewDetails });
};
