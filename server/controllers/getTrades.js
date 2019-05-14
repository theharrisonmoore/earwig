/**
 * get all trades from DB
 */
const { getTrades } = require("./../database/queries");

module.exports = (req, res) => {
  getTrades().then((trades) => {
    res.json(trades);
  });
};
