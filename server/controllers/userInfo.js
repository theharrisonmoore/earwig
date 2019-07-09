module.exports = (req, res) => {
  const { user } = req;
  const userInfo = {
    id: user._id,
    trade: user.trade,
    verified: user.verified,
    awaitingReview: user.awaitingReview,
    userId: user.userId,
    points: user.points,
    helpedPoints: user.helpedPoints,
    isAdmin: user.isAdmin,
    email: user.email,
    city: user.city,
  };
  return res.json(userInfo);
};
