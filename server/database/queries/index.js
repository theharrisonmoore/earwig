const Trade = require("./../models/Trade");

module.exports.getTrades = () => Trade.find();
