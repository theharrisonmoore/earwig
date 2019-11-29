const mongoose = require("mongoose");

const { Schema } = mongoose;
const { ObjectId } = Schema.Types;

const replySchema = new Schema({
  user: {
    type: ObjectId,
    ref: "users",
    required: true,
  },
  text: String,
  displayName: String,
}, {
  timestamps: true,
});


const reviewSchema = new Schema({
  organization: {
    type: ObjectId,
    ref: "organizations",
    required: true,
  },
  user: {
    type: ObjectId,
    ref: "users",
    required: true,
  },
  lastUse: {
    type: Date,
    required: true,
  },
  rate: {
    type: Number,
    min: 1,
    max: 5,
    required: true,
  },
  overallReview: {
    text: String,
    replies: [replySchema],
  },
  voiceReview: {
    audio: String,
    replies: [replySchema],
  },
  isVerified: {
    type: Boolean,
    default: false,
  },
  siteImages: [String],
  worksiteImage: String,
}, {
  timestamps: true,
});

module.exports = mongoose.model("reviews", reviewSchema);
