const boom = require("boom");

const {
  getTradesAdmin, deleteTrade, addTrade, editTrade,
} = require("./../../database/queries");

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

const addTradeController = (async (req, res, next) => {
  const { trades } = req.body;
  try {
    await addTrade(trades);
    res.send();
  } catch (error) {
    next(boom.badImplementation());
  }
});

const editTradeController = (async (req, res, next) => {
  const { oldName, newName } = req.body;
  try {
    await editTrade(oldName, newName);
    res.send();
  } catch (error) {
    next(boom.badImplementatino());
  }
});

module.exports = {
  getAllTrades, deleteTradeController, addTradeController, editTradeController,
};
