const boom = require("boom");

const { getTradesAdmin, deleteTrade } = require("./../../database/queries");

const getAllTrades = (async (req, res, next) => {
  console.log("hi");
  try {
    const trades = await getTradesAdmin();
    console.log("trades111111111111", trades);
    res.send(trades);
  } catch (error) {
    console.log("arrrrrrrrr", error);
  }
});

const deleteTradeController = (async (req, res, next) => {
  console.log("param", req.params.id);
  const tradeId = req.params.id;
  try {
    const deletedTrade = await deleteTrade();
    console.log("deletedTrade", deletedTrade);
    res.send();
  } catch (error) {
    console.log("errpr", error);
  }
});

module.exports = { getAllTrades, deleteTradeController };
