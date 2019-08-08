module.exports = (req, res) => {
  const { user } = req;
  console.log("user11111111111", user);
  const userInfo = {
    id: user._id,
    trade: user.trade,
    verified: user.verified,
    awaitingReview: user.awaitingReview,
    userId: user.userId,
    points: user.points,
    helpedUsers: user.helpedUsers,
    isAdmin: user.isAdmin,
    email: user.email,
    city: user.city,
    // fields: {

    // },
  };
  return res.json(userInfo);
};
