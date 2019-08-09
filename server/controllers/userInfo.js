module.exports = (req, res) => {
  const { user } = req;
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
    fields: {
      agency: user.currentAgency,
      company: user.currentCompany,
      payroll: user.currentPayroll,
      worksite: user.currentWorksite,
    },
  };
  return res.json(userInfo);
};
