const Review = require("../../models/Review");

module.exports = userId => Review.find({ user: userId })
  .populate({
    path: "organization",
    select: { name: 1, _id: 1, category: 1 },
  })
  .select({ createdAt: 1 });
