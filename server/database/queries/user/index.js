const User = require("./../../models/User");

module.exports.updateUserById = (userId, data) => User.findByIdAndUpdate(userId, { $set: data });
