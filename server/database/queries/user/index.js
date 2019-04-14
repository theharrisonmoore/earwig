const User = require("./../../models/User");

module.exports.findByEmail = email => User.findOne({ email: email.toLowerCase() });

module.exports.addNew = ({ email, password }) => User.create({
  email: email.toLowerCase(),
  password,
});

module.exports.getUserById = id => User.findById(id, { password: 0 });
