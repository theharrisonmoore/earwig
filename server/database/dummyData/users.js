const User = require("../models/User");
const Trade = require("./../models/Trade");

module.exports = async () => {
  const trades = await Trade.find();

  const users = [
    // level 2 user just registered
    {
      email: "level2@earwig.com",
      password: "123456",
      trade: trades[0],
    },
    //  level 2 user - awaiting virification
    {
      email: "level2-awaiting@earwig.com",
      password: "123456",
      trade: trades[1],
      verificationPhoto: "users/fake_name.png", // to be replaced when the firebase storge is ready
      verified: false,
      awaitingReview: true,
    },
    // level 3 - verified
    {
      email: "level3@earwig.com",
      password: "123456",
      trade: trades[2],
      verified: true,
      awaitingReview: false,
    },
  ];

  const storedUsers = await User.create(users);

  const secondUserGroup = [
    {
      email: "level3-2@earwig.com",
      password: "123456",
      trade: trades[3],
      verified: true,
      awaitingReview: false,
    },
    {
      email: "ramy@gmail.com",
      password: "123456",
      trade: trades[2],
      verified: false,
      awaitingReview: true,
      referral: storedUsers[2],
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


  return User.create(secondUserGroup);
};
