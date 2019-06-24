/**
 * get all trades from DB
 */
const boom = require("boom");
const { getTrades } = require("./../database/queries");

module.exports = (req, res, next) => {
  getTrades().then((trades) => {
    res.json(trades);
  })
    .catch(() => {
      next(boom.badImplementation());
    });
};
