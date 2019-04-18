const User = require("./../../models/User");

const getAllUsers = require("./allUsers");

module.exports.updateUserById = (userId, data) => User.findByIdAndUpdate(userId, { $set: data });
module.exports.findByEmail = email => User.findOne({ email: email.toLowerCase() });

module.exports.addNew = ({ email, password }) => User.create({
  email: email.toLowerCase(),
  password,
});

module.exports.getUserById = id => User.findById(id, { password: 0 });

module.exports.getAllUsers = getAllUsers;
