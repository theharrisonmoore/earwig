const boom = require("@hapi/boom");

const { getTradesAdmin, deleteTrade } = require("./../../database/queries");

const getAllTrades = (async (req, res, next) => {
  try {
    const trades = await getTradesAdmin();
    res.send(trades);
  } catch (error) {
    next(boom.badImplementation());
  }
});

const deleteTradeController = (async (req, res, next) => {
  const tradeId = req.params.id;
  try {
    await deleteTrade(tradeId);
    res.send();
  } catch (error) {
    next(boom.badImplementation());
  }
});

module.exports = { getAllTrades, deleteTradeController };
