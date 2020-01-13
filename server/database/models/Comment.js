const mongoose = require("mongoose");

const { Schema } = mongoose;
const { ObjectId } = Schema.Types;

const commentSchema = new Schema({
  organization: {
    type: ObjectId,
    ref: "organizations",
    required: true,
  },
  question: {
    type: ObjectId,
    ref: "questions",
    required: true,
  },
  user: {
    type: ObjectId,
    ref: "users",
    required: true,
  },
  text: {
    type: String,
    required: true,
  },
  review: {
    type: ObjectId,
    ref: "reviews",
    required: true,
  },
  parentComment: {
    type: ObjectId,
    ref: "comments", // self-relation
  },
  displayName: String,
}, {
  timestamps: true,
});

module.exports = mongoose.model("comments", commentSchema);
