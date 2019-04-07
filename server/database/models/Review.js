const mongoose = require("mongoose");

const { Schema } = mongoose;
const { ObjectId } = Schema.Types;

const voteReplySchema = new Schema({
  user: {
    type: ObjectId,
    ref: "users",
  },
  text: String,
  timestamps: true,
});

const reviewSchema = new Schema({
  organization: {
    type: ObjectId,
    ref: "organizations",
  },
  userID: {
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
    required: true,
    min: 1,
    max: 5,
  },
  overallReview: {
    type: String,
    required: true,
    replies: [voteReplySchema],
    votes: [voteReplySchema],
  },
  voiceReview: {
    type: String,
    required: false,
    replies: [voteReplySchema],
    votes: [voteReplySchema],
  },
  answers: [{
    type: ObjectId,
    ref: "answers",
  }],
  isVerified: {
    type: Boolean,
    default: false,
  },
  worksiteImage: String,
  timestamps: true,
});

module.exports = mongoose.model("reviews", reviewSchema);
