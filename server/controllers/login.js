const jwt = require("jsonwebtoken");
const { findByEmail } = require("./../database/queries/user");

module.exports = (req, res) => {
  const { email } = req.body;
  console.log(email);

  findByEmail(email)
    .then((user) => {
      if (!user) {
        // no user
      } else {
        // need to compare ??????????

        const userInfo = {
          id: user._id,
          trade: user.trade,
          verified: user.verified,
          awaitingReview: user.awaitingReview,
          userId: user.userId,
          points: user.points,
          isAdmin: user.isAdmin,
        };

        const token = jwt.sign({ id: user._id }, process.env.SECRET, { expiresIn: "30d" });
        res.cookie("token", token, { maxAge: 2592000000, httpOnly: true });
        res.json(userInfo);
      }
    }).catch((err) => {
      console.log(err);
    });
};
