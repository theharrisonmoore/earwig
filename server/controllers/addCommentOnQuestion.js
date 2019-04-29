const boom = require("boom");

const { createComment } = require("./../database/queries/comments");

module.exports = (req, res, next) => {
  const {
    text, commentAs, question, organization,
  } = req.body;
  const { user } = req;
  const data = {
    text,
    question,
    organization,
  };

  if (user.isAdmin) {
    data.commentAs = commentAs;
  }

  createComment(data)
    .then(() => {
      console.log("1");
    }).catch(() => next(boom.badImplementation()));
};
