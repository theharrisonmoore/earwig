const boom = require("boom");

const { getFirstLevelCommentsOnQuestion } = require("./../database/queries/reviews");

module.exports = (req, res, next) => {
  const { organizationID, questionID } = req.body;

  getFirstLevelCommentsOnQuestion(organizationID, questionID)
    .then(comments => res.json(comments))
    .catch(err => next(boom.badImplementation(err)));
};
