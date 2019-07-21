const Review = require("../models/Review");
const Helpfulness = require("../models/Helpfulness");
const User = require("../models/User");

module.exports = async () => {
  const users = await User.find({ verified: true, isAdmin: false });
  const helpfulUser = users[0];
  const helpedUser = users[1];
  const helpulfullUserReviews = await Review.find({ user: helpfulUser });

  const helpfulness = [
    {
      helpfulUser,
      helpedUser,
      points: 5,
      fromReferral: false,
      target: "overallReview",
      review: helpulfullUserReviews[0],
      organization: helpulfullUserReviews[0].organization,
    }, {
      helpfulUser,
      helpedUser,
      points: 3,
      fromReferral: false,
      target: "voiceReview",
      review: helpulfullUserReviews[0],
      organization: helpulfullUserReviews[0].organization,
    }, {
      helpfulUser,
      helpedUser,
      points: 7,
      fromReferral: false,
      target: "overallReview",
      review: helpulfullUserReviews[1],
      organization: helpulfullUserReviews[1].organization,
    },
    {
      helpfulUser,
      helpedUser,
      points: 7,
      fromReferral: false,
      target: "overallReview",
      review: helpulfullUserReviews[1],
      organization: helpulfullUserReviews[1].organization,
    },
  ];
  return Helpfulness.create(helpfulness);
};
