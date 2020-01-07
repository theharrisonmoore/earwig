const mongoose = require("mongoose");

const { Schema } = mongoose;
const { ObjectId } = Schema.Types;

const helpfulnessSchema = new Schema(
  {
    helpfulUser: {
      type: ObjectId,
      ref: "user",
    },
    helpedUser: {
      type: ObjectId,
      ref: "user",
    },
    points: {
      type: Number,
      required: true,
    },
    // if true then (review, organisation, target) will be null
    fromReferral: {
      type: Boolean,
      default: true,
    },
    // "overallReview" OR "voiceReview" OR "comment"
    target: String,
    review: {
      type: ObjectId,
      ref: "reviews",
    },
    organization: {
      type: ObjectId,
      ref: "organizations",
    },
    comment: {
      type: ObjectId,
      ref: "comments",
    },
  },
  { timestamps: true },
);

module.exports = mongoose.model("helpfulness", helpfulnessSchema);
