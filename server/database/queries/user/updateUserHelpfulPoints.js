const mongoose = require("mongoose");

const User = require("./../../models/User");
const Helpfulness = require("./../../models/Helpfulness");


const updateUserHelpfulPoints = async (userId) => {
  const [data] = await Helpfulness.aggregate([
    {
      $match: {
        helpfulUser: mongoose.Types.ObjectId(userId),
        points: { $gt: 0 },
      },
    },
    {
      $group: {
        _id: null,
        points: { $sum: "$points" },
        helped: { $addToSet: "$helpedUser" },
      },
    },
  ]);

  return User.updateOne(
    { _id: userId },
    {
      points: data.points,
      helpedUsers: data.helped.length,
    },
    { upsert: false },
  );
};

module.exports = updateUserHelpfulPoints;
