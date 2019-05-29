const mongoose = require("mongoose");

const constants = require("./../../constants");

const { Schema } = mongoose;

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
    phoneNumber: String,
    email: {
      type: String,
      lowercase: true,
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
    active: {
      type: Boolean,
      default: true,
    },
  },
  {
    timestamps: true,
  },
  { typeKey: "$type" },
);

module.exports = mongoose.model("organizations", organizationSchema);
