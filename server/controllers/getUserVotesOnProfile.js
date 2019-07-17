const boom = require("boom");
const { getUserVotesOnProfile } = require("./../database/queries/user");

module.exports = (req, res, next) => {
  const { userId, orgId } = req.params;

  getUserVotesOnProfile({ userId, orgId })
    .then((data) => {
      res.json(data);
    })
    .catch(() => {
      next(boom.badImplementation());
    });
};
