const boom = require("boom");

const { allComments } = require("./../database/queries/reviews");

module.exports = (req, res, next) => {
  const { reason, description } = req.body;
  console.log(reason, description);


  // allComments(organizationID, questionID)
  //   .then(comments => res.json(comments))
  //   .catch(err => next(boom.badImplementation(err)));
};
