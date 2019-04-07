const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const shortid = require("shortid");

const constants = require("./../../constants");


const { Schema } = mongoose;
const { ObjectId } = Schema.Types;

shortid.characters(constants.database.SHORT_ID_CHARACTERS);

const userSchema = new Schema({
  email: {
    type: String,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  trade: {
    type: ObjectId,
    ref: "trades",
  },
  verificationPhoto: {
    name: {
      type: String,
      required: false,
    },
    photoUrl: {
      type: String,
      required: false,
    },
  },
  verified: {
    type: Boolean,
    default: false,
  },
  awaitingReview: {
    type: Boolean,
    default: false,
  },
  userId: {
    type: String,
    default: shortid.generate,
    required: true,
  },
  points: Number,
  isAdmin: {
    type: Boolean,
    default: false,
  },
  tradeId: String,
  timestamps: true,
});


function hashPassword(next) {
  // get the plain password that user input
  const plainPassword = this.password;
  // only hash the password if it has been modified (or is new)
  if (!this.isModified("password")) return next();
  return bcrypt
    .hash(plainPassword, 8)
    .then((hash) => {
      // store the hashed password
      this.password = hash;
      next();
    })
    .catch(next);
}

// create a pre hook to hash user's password before store it in the DB
userSchema.pre("save", hashPassword);

module.exports = mongoose.model("users", userSchema);
