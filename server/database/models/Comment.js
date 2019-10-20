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
  displayName: String,
}, {
  timestamps: true,
});

module.exports = mongoose.model("comments", commentSchema);
