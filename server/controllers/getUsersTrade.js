/**
 * get trade name for a user
 */
const boom = require("boom");
const { getUsersTrade } = require("./../database/queries/user");

module.exports = (req, res, next) => {
  const { user } = req;

  getUsersTrade(user.trade)
    .then((trade) => {
      res.json(trade);
    })
    .catch(() => {
      next(boom.badImplementation());
    });
};
