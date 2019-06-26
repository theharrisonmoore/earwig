const User = require("../models/User");
const Trade = require("./../models/Trade");

module.exports = async () => {
  const trades = await Trade.find();

  // create verified user so that we can store as referral person
  const refUsers = [
    {
      email: "ref1@earwig.com",
      password: "123456",
      trade: trades[2],
      verified: true,
      awaitingReview: false,
      points: 200,
    },

    {
      email: "ref2@earwig.com",
      password: "123456",
      trade: trades[0],
      verified: true,
      awaitingReview: false,
      points: 100,
    },
  ];

  const storedRefUsers = await User.create(refUsers);

  const users = [
    // level 2 user just registered
    {
      email: "level2@earwig.com",
      password: "123456",
      trade: trades[0],
    },
    //  level 2 user - awaiting verification, referred by verified user
    {
      email: "level2-awaiting@earwig.com",
      password: "123456",
      trade: trades[1],
      verificationPhoto: "users/fake_name.png", // to be replaced when the firebase storge is ready
      verified: false,
      awaitingReview: true,
      referral: storedRefUsers[0],
    },
    // level 3 - verified, referred to by verified user
    {
      email: "level3@earwig.com",
      password: "123456",
      trade: trades[2],
      verified: true,
      awaitingReview: false,
      referral: storedRefUsers[1],
      points: 20,
    },
    {
      email: "level3-2@earwig.com",
      password: "123456",
      trade: trades[3],
      verified: true,
      awaitingReview: false,
      referral: storedRefUsers[0],
      points: 30,
    },
    {
      email: "ramy@gmail.com",
      password: "123456",
      trade: trades[2],
      verified: true,
      awaitingReview: false,
    },
    {
      email: "joe@gmail.com",
      password: "123456",
      trade: trades[3],
      verified: true,
      awaitingReview: false,
    },
    {
      email: "abdalsamad.y.m@gmail.com",
      password: "123456",
      trade: trades[3],
      verified: true,
      awaitingReview: false,
    },
    {
      email: "simon@gmail.com",
      password: "123456",
      trade: trades[3],
      verified: true,
      awaitingReview: false,
    },
    // Admin
    {
      email: "admin@earwig.com",
      password: "123456",
      verified: true,
      awaitingReview: false,
      isAdmin: true,
    },
  ];

  return User.create(users);
};
