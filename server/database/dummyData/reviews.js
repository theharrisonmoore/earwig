const Review = require("../models/Review");
const Organization = require("../models/Organization");
const User = require("../models/User");

module.exports = async () => {
  const companies = await Organization.find({ category: "company" });
  const agencies = await Organization.find({ category: "agency" });
  const worksites = await Organization.find({ category: "worksite" });
  const payrolls = await Organization.find({ category: "payroll" });

  const users = await User.find({ verified: true, isAdmin: false });
  const reviews = [
    // companies reviews
    {
      organization: companies[0],
      user: users[0],
      lastUse: "2019-03-31",
      rate: 2,
      overallReview: {
        text: "I had problem gitting paid",
        replies: [
          {
            user: users[1],
            text: "I faced the same thing",
          },
        ],

      },
      voiceReview: {
        audio: "audio/audio1.mp3", // to be updated when firebase storage is ready
        replies: [
          {
            user: users[1],
            text: "you are right",
          },
        ],
      },
      isVerified: true,
    },
    {
      organization: companies[0],
      user: users[1],
      lastUse: "2019-03-31",
      rate: 1,
      overallReview: {
        text: "Avoid lik the plague",
        replies: [
          {
            user: users[0],
            text: "Agree",
          },
        ],
      },
      isVerified: true,
    },
    //  agencies reviews
    {
      organization: agencies[0],
      user: users[0],
      lastUse: "2019-03-31",
      rate: 5,
      overallReview: {
        text: "Great agency",
        replies: [
          {
            user: users[1],
            text: "yeah that's right",
          },
        ],
      },
      voiceReview: {
        audio: "audio/audio1.mp3", // to be updated when firebase storage is ready
        replies: [
          {
            user: users[1],
            text: "you are right",
          },
        ],
      },
      isVerified: true,
    },
    {
      organization: agencies[0],
      user: users[1],
      lastUse: "2019-03-31",
      rate: 1,
      overallReview: {
        text: "Bad agency",
        replies: [
          {
            user: users[0],
            text: "yeah that's right",
          },
        ],
      },
      isVerified: true,
    },
    //  worksites review
    {
      organization: worksites[0],
      user: users[0],
      lastUse: "2019-03-31",
      rate: 1,
      overallReview: {
        text: "Greate worksite",
        replies: [
          {
            user: users[1],
            text: "yeah that's right",
          },
        ],
      },
      isVerified: true,
      siteImages: ["site-images1.png", "site-images2.png"],
    },
    {
      organization: worksites[0],
      user: users[1],
      lastUse: "2019-03-31",
      rate: 1,
      overallReview: {
        text: "Bad woksite",
        replies: [
          {
            user: users[0],
            text: "yeah that's right",
          },
        ],
      },
      isVerified: false,
      siteImages: ["site-images3.png", "site-images4.png"],
    },
    // Payrolls reviews
    {
      organization: payrolls[0],
      user: users[0],
      lastUse: "2019-03-31",
      rate: 5,
      overallReview: {
        text: "Great experience",
        replies: [
          {
            user: users[1],
            text: "yeah that's right",
          },
        ],
      },
      isVerified: true,
    },
    {
      organization: payrolls[0],
      user: users[1],
      lastUse: "2019-03-31",
      rate: 5,
      overallReview: {
        text: "Bad payroll",
        replies: [
          {
            user: users[0],
            text: "yeah that's right",
          },
        ],
      },
      isVerified: true,
    },
  ];
  return Review.create(reviews);
};
