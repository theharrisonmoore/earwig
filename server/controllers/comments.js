const boom = require("boom");

const { getFirstLevelCommentsOnQuestion, getCommentOnQuestionWithReplies } = require("./../database/queries/reviews");

module.exports = (req, res, next) => {
  const { id } = req.params;
  const { organizationID, questionID } = req.query;

  if (id) {
    // get specific comment with replies
    getCommentOnQuestionWithReplies(id)
      .then(([comment]) => res.json(comment))
      .catch(err => next(boom.badImplementation(err)));
  } else {
    getFirstLevelCommentsOnQuestion(organizationID, questionID)
      .then(comments => res.json(comments))
      .catch(err => next(boom.badImplementation(err)));
  }
};
