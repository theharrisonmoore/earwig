const boom = require("boom");
const { addTrade, findTradeByTitle } = require("./../database/queries");

module.exports = async (req, res, next) => {
  const { trade } = req.body;
  try {
    const storedTrade = await findTradeByTitle(trade);
    if (storedTrade) {
      return next(boom.badRequest(`${trade} is already exist!`));
    }

    const newTrade = await addTrade({ title: trade });

    return res.json(newTrade);
  } catch (error) {
    return next(boom.badImplementation());
  }
};
