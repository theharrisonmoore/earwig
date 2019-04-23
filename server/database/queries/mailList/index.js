const MailList = require("./../../models/MailList");

module.exports.findOne = email => MailList.findOne({ email });

module.exports.addToMailList = email => MailList.create({ email });
