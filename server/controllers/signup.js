/**
 * sign up controller
 * @param {email} -string- user email
 * @param {password} -string- user plain password
 * response with the user onfo and create new token
 */

const boom = require("boom");
const jwt = require("jsonwebtoken");

const { findByEmail, addNew, checkValidReferral } = require("./../database/queries/user");
// const confirmJoiningMailList = require("./../helpers/confirmJoiningMailList");

const addToMailchimpList = require("../helpers/3dParty/mailchimp");

const { tokenMaxAge } = require("./../constants");

module.exports = async (req, res, next) => {
  const { email, password, referral } = req.body;

  const newUserData = {
    email,
    password,
  };
  try {
    // check if the referral is valid
    if (referral) {
      const referralUser = await checkValidReferral(referral);
      if (referralUser) {
        newUserData.referral = referral;
      } else {
        return next(boom.badRequest("referral link isn't valid"));
      }
    }


    // check if the email is already exist
    const storedUser = await findByEmail(email);

    if (storedUser) {
    // email already exist
      return next(boom.conflict("Email already taken"));
    }

    // create new user
    const user = await addNew(newUserData);

    if (process.env.NODE_ENV !== "test") {
      try {
        await addToMailchimpList(email);
      } catch (err) {
        return next(boom.badImplementation());
      }
    }

    // data to be sent in the response
    const userInfo = {
      id: user._id,
      trade: user.trade,
      verified: user.verified,
      awaitingReview: user.awaitingReview,
      userId: user.userId,
      points: user.points,
      isAdmin: user.isAdmin,
      email: user.email,
    };


    // create token for 30 day
    const token = jwt.sign({ id: user._id }, process.env.SECRET, {
      expiresIn: tokenMaxAge.string,
    });

    res.cookie("token", token, { maxAge: tokenMaxAge.number, httpOnly: true });

    // send the user info
    return res.json(userInfo);
  } catch (error) {
    return next(boom.badImplementation());
  }
};
