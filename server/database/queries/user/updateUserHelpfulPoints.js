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

  const points = data && data.points ? data.points : 0;
  const helpedUsers = data && data.helped ? data.helped.length : 0;

  return User.updateOne(
    { _id: userId },
    {
      points,
      helpedUsers,
    },
    { upsert: false },
  );
};

module.exports = updateUserHelpfulPoints;
