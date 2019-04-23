const boom = require("boom");

const { allComments } = require("./../database/queries/reviews");

module.exports = (req, res, next) => {
  const { organizationID, questionID } = req.body;

  // console.log(req.body)

  allComments(organizationID, questionID)
    .then(comments => res.json(comments))
    .catch(err => next(boom.badImplementation(err)));
};
