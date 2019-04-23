const Trade = require("./../models/Trade");

module.exports.getTrades = () => Trade.find();
module.exports.addTrade = trade => Trade.create(trade);
module.exports.findTradeByTitle = title => Trade.findOne({ title });

module.exports.getTradesAdmin = () => Trade.aggregate([
  {
    $project: {
      key: "$_id",
      trade: "$title",
    },
  },
]);

module.exports.deleteTrade = id => Trade.deleteOne({ _id: id });
