const User = require("./../../models/User");
const Comment = require("./../../models/Comment");
const Answer = require("./../../models/Answer");
const Review = require("./../../models/Review");

const getAllUsers = require("./allUsers");

module.exports.updateUserById = (userId, data) => User.findByIdAndUpdate(userId, { $set: data });
module.exports.findByEmail = email => User.findOne({ email: email.toLowerCase() });

module.exports.addNew = ({ email, password }) => User.create({
  email: email.toLowerCase(),
  password,
});

module.exports.getAllUsers = getAllUsers;

module.exports.deleteUser = id => User.deleteOne({ _id: id });

module.exports.getUserById = (id, withoutPassword) => (withoutPassword ? User.findById(id, { password: 0 }) : User.findById(id));

module.exports.deleteUserCompletely = async (userId) => {
  // delete the users' comments
  await Comment.deleteMany({
    user: userId,
  });
  // delete the users' answers
  await Answer.deleteMany({
    user: userId,
  });
  // delete the users' reviews
  await Review.deleteMany({
    user: userId,
  });
  // delete the user
  return User.findByIdAndDelete(userId);
};
