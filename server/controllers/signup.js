/**
 * sign up controller
 * @param {email} -string- user email
 * @param {password} -string- user plain password
 * response with the user onfo and create new token
 */

const boom = require("boom");
const jwt = require("jsonwebtoken");
const mongoose = require("mongoose");

const { findByEmail, addNew, checkValidReferral } = require("./../database/queries/user");
const createAccountEmails = require("./../helpers/emails/createAccountEmail");
const verificationPhotoEmail = require("./../helpers/emails/verificationPhotoEmail");

const addToMailchimpList = require("../helpers/3dParty/mailchimp");

const { tokenMaxAge } = require("./../constants");

module.exports = async (req, res, next) => {
  try {
    const {
      email, password, referral, isWorker, orgType, trade, city, otherOrg,
    } = req.body;
    const uploadedFileName = req.file && req.file.uploadedFileName;

    const newUserData = {
      email: email.toLowerCase(),
      password,
    };

    const { fieldName } = req;

    if (isWorker === "yes") {
      newUserData.trade = trade;
      newUserData.city = city;
      newUserData.awaitingReview = true;
      newUserData.verificationPhoto = uploadedFileName;
    } else {
      const worksFor = orgType !== "other" ? orgType : otherOrg;
      newUserData.worksFor = worksFor;
      newUserData.awaitingReview = false;
    }
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

    // start a mongodb session
    const session = await mongoose.startSession();
    session.startTransaction();
    // create new user
    const user = await addNew(newUserData, session);

    // if in production add email to list
    if (process.env.NODE_ENV === "production") {
      try {
        const resp = await addToMailchimpList(email);
        const { data } = resp;

        if (data.errors.length) {
          throw boom.badData(data.errors[0].error);
        }
        await createAccountEmails(email);
        if (fieldName === "verificationImage") {
        // send an email to the admin.
          await verificationPhotoEmail();
        }
        await session.commitTransaction();
        session.endSession();
      } catch (err) {
        await session.abortTransaction();
        session.endSession();
        if (err.isBoom && !err.isServer) {
          return next(err);
        }
        return next(boom.badImplementation(err));
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
    return next(boom.badImplementation(error));
  }
};
