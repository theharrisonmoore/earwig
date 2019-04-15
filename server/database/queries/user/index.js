const User = require("./../../models/User");

module.exports.findByEmail = email => User.findOne({ email: email.toLowerCase() });

module.exports.addNew = ({ email, password }) => User.create({
  email: email.toLowerCase(),
  password,
});

module.exports.findById = id => User.findById(id);

module.exports.updateUserById = (id, data) => User.findByIdAndUpdate(id, { $set: data });
