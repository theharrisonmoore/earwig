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
  verificationPhoto: String,
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
  points: {
    type: Number,
    default: 0,
    required: true,
  },
  isAdmin: {
    type: Boolean,
    default: false,
  },
  city: String,
  referral: {
    type: Schema.Types.ObjectId,
    ref: "users",
  },
  resetToken: {
    value: String,
    expiresIn: Date,
  },
},
{ timestamps: true });


async function hashPassword() {
  if (this.isNew || this.isModified("password")) {
    const document = this;
    try {
      const hashedPassword = await bcrypt.hash(document.password, 8);
      document.password = hashedPassword;
    } catch (err) {
      throw new Error("Something bad happend");
    }
  } else {
    throw new Error("Invalid data");
  }
}

// create a pre hook to hash user's password before store it in the DB
userSchema.pre("save", hashPassword);

module.exports = mongoose.model("users", userSchema);
