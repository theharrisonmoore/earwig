const mongoose = require("mongoose");

const constants = require("./../../constants");

const { Schema } = mongoose;

const uniqueStringGen = Math.random()
  .toString(36)
  .substring(2, 15)
  + Math.random()
    .toString(36)
    .substring(2, 15);

const organizationSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
      unique: true,
    },
    category: {
      type: String,
      enum: constants.database.ORGANIZATIONS_TYPE,
      required: true,
    },
    verified: {
      type: Boolean,
      default: true,
    },
    phoneNumber: String,
    email: {
      type: String,
      unique: true,
      default: uniqueStringGen,
    },
    websiteURL: String,
    loacation: {
      lat: Number,
      long: Number,
    },
    contractor: {
      name: String,
      logo: String,
    },
    lastViewed: Date,
  },
  {
    timestamps: true,
  },
);

module.exports = mongoose.model("organizations", organizationSchema);
