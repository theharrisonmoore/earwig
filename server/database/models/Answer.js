
const mongoose = require("mongoose");

const { Schema } = mongoose;
const { ObjectId, Mixed } = Schema.Types;

const answerSchema = new Schema({
  question: {
    type: ObjectId,
    ref: "questions",
  },
  answer: {
    type: Mixed,
  },
  comment: {
    type: ObjectId,
    ref: "comments",
  },
  user: {
    type: ObjectId,
    ref: "users",
  },
  review: {
    type: ObjectId,
    ref: "reviews",
  },
});

module.exports = mongoose.model("answeres", answerSchema);
