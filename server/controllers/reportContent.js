const boom = require("boom");

const reportMailing = require("./../helpers/reportMailing");

module.exports = (req, res, next) => {
  const {
    reason, description, target, question, organization, review, comment,
  } = req.body;
  const { user } = req;

  reportMailing({
    reason, description, target, question, organization, review, comment, user,
  }).then(() => {
    res.json({ message: "sent" });
  }).catch(() => {
    next(boom.badImplementation());
  });
};
