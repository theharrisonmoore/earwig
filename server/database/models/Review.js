const mongoose = require("mongoose");

const { Schema } = mongoose;
const { ObjectId } = Schema.Types;

const replySchema = new Schema({
  user: {
    type: ObjectId,
    ref: "users",
  },
  text: String,
}, {
  timestamps: true,
});
const voteSchema = new Schema({
  user: {
    type: ObjectId,
    ref: "users",
  },
  points: Number,
}, {
  timestamps: true,
});

const reviewSchema = new Schema({
  organization: {
    type: ObjectId,
    ref: "organizations",
  },
  user: {
    type: ObjectId,
    ref: "users",
  },
  workPeriod: {
    from: {
      type: Date,
      required: true,
    },
    to: {
      type: Date,
      required: true,
    },
  },
  rate: {
    type: Number,
    min: 1,
    max: 5,
  },
  overallReview: {
    text: String,
    replies: [replySchema],
    votes: [voteSchema],
  },
  voiceReview: {
    audio: String,
    replies: [replySchema],
    votes: [voteSchema],
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
