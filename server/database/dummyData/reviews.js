const Review = require("../models/Review");
const Organization = require("../models/Organization");
const User = require("../models/User");

module.exports = async () => {
  const companies = await Organization.find({ type: "company" });
  const agencies = await Organization.find({ type: "agency" });
  const worksites = await Organization.find({ type: "worksite" });

  const users = await User.find({ verified: true, isAdmin: false });
  const reviews = [
    // companies reviews
    {
      organization: companies[0],
      user: users[0],
      workPeriod: {
        from: "2019-01-01",
        to: "2019-03-31",
      },
      rate: 2,
      overallReview: {
        text: "I had problem gitting paid",
        replies: [
          {
            user: users[1],
            text: "I faced the same thing",
          },
        ],
        votes: [{
          user: users[1],
          points: 8,
        }],
      },
      voiceReview: {
        audio: "audio/audio1.mp3", // to be updated when firebase storage is ready
        replies: [{
          user: users[1],
          text: "you are right",
        }],
        votes: [{
          user: users[1],
          points: 5,
        }],
      },
      isVerified: true,
    },
    {
      organization: companies[0],
      user: users[1],
      workPeriod: {
        from: "2019-02-01",
        to: "2019-03-31",
      },
      rate: 1,
      overallReview: {
        text: "Avoid lik the plague",
        replies: [
          {
            user: users[0],
            text: "Agree",
          },
        ],
        votes: [{
          user: users[0],
          points: 10,
        }],
      },
      isVerified: true,
    },
    //  agencies reviews
    {
      organization: agencies[0],
      user: users[0],
      workPeriod: {
        from: "2018-12-01",
        to: "2019-03-31",
      },
      rate: 5,
      overallReview: {
        text: "Great agency",
        replies: [
          {
            user: users[1],
            text: "yeah that's right",
          },
        ],
        votes: [{
          user: users[1],
          points: 8,
        }],
      },
      isVerified: true,
    },
    {
      organization: agencies[0],
      user: users[1],
      workPeriod: {
        from: "2018-10-01",
        to: "2019-03-31",
      },
      rate: 1,
      overallReview: {
        text: "Bad agency",
        replies: [
          {
            user: users[0],
            text: "yeah that's right",
          },
        ],
        votes: [{
          user: users[0],
          points: 8,
        }],
      },
      isVerified: true,
    },
    //  worksites review
    {
      organization: worksites[0],
      user: users[0],
      workPeriod: {
        from: "2018-10-01",
        to: "2019-03-31",
      },
      rate: 1,
      overallReview: {
        text: "Greate worksite",
        replies: [
          {
            user: users[1],
            text: "yeah that's right",
          },
        ],
        votes: [{
          user: users[1],
          points: 8,
        }],
      },
      isVerified: true,
      siteImages: ["site-images1.png", "site-images2.png"],
    },
    {
      organization: worksites[0],
      user: users[1],
      workPeriod: {
        from: "2018-10-01",
        to: "2019-03-31",
      },
      rate: 1,
      overallReview: {
        text: "Bad woksite",
        replies: [
          {
            user: users[0],
            text: "yeah that's right",
          },
        ],
        votes: [{
          user: users[0],
          points: 5,
        }],
      },
      isVerified: true,
      siteImages: ["site-images3.png", "site-images4.png"],
    },
  ];
  return Review.create(reviews);
};
