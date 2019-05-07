const Trade = require("./../models/Trade");

module.exports.getTrades = () => Trade.find();
module.exports.addTrade = trade => Trade.create(trade);
module.exports.findTradeByTitle = title => Trade.findOne({ title });

// get all trades and reshape it to be ready for antd table.
module.exports.getTradesAdmin = () => Trade.aggregate([
  {
    $project: {
      key: "$_id",
      trade: "$title",
    },
  },
]);

// delete trade by id.
module.exports.deleteTrade = id => Trade.deleteOne({ _id: id });
