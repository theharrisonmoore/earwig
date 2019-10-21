const mongoose = require("mongoose");

const { Schema } = mongoose;
const { ObjectId, Mixed } = Schema.Types;

const answerSchema = new Schema(
  {
    question: {
      type: ObjectId,
      ref: "questions",
      required: true,
    },
    answer: {
      type: Mixed,
      required: true,
    },
    comment: {
      type: ObjectId,
      ref: "comments",
    },
    user: {
      type: ObjectId,
      ref: "users",
      required: true,
    },
    review: {
      type: ObjectId,
      ref: "reviews",
      required: true,
    },
    organization: {
      type: ObjectId,
      ref: "organizations",
      required: true,
    },
  },
  { timestamps: true },
);

module.exports = mongoose.model("answers", answerSchema);
