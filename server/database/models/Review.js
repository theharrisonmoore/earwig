const mongoose = require("mongoose");

const { Schema } = mongoose;
const { ObjectId } = Schema.Types;

const replySchema = new Schema({
  user: {
    type: ObjectId,
    ref: "users",
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
  },
  user: {
    type: ObjectId,
    ref: "users",
  },
  workPeriod: {
    from: {
      type: Date,
    },
    to: {
      type: Date,
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
