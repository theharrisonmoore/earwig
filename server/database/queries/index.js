const Trade = require("./../models/Trade");

module.exports.getTrades = () => Trade.find();
module.exports.addTrade = trade => Trade.create(trade);
module.exports.findTradeByTitle = title => Trade.findOne({ title });
