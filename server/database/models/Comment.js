const mongoose = require("mongoose");

const { Schema } = mongoose;
const { ObjectId } = Schema.Types;

const commentSchema = new Schema({
  organization: {
    type: ObjectId,
    ref: "organizations",
  },
  question: {
    type: ObjectId,
    ref: "questions",
  },
  user: {
    type: ObjectId,
    ref: "users",
  },
  text: {
    type: String,
    required: true,
  },
}, {
  timestamps: true,
});

module.exports = mongoose.model("comments", commentSchema);
