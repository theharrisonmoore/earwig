const Trade = require("./../models/Trade");

module.exports.getTrades = () => Trade.find().sort({ title: 1 });
module.exports.addTrade = trade => Trade.create(trade);
module.exports.findTradeByTitle = title => Trade.findOne({ title });

module.exports.getTradesAdmin = () => Trade.aggregate([
  {
    $project: {
      key: "$_id",
      trade: "$title",
    },

  }, {
    $sort: { trade: 1 },
  },
]);

module.exports.deleteTrade = id => Trade.deleteOne({ _id: id });

module.exports.editTrade = (oldName, newName) => Trade.updateOne(
  {
    title: oldName
  },
  {
    $set: {
      "title": newName
    }
  }
)
