const mongoose = require("mongoose");

const constants = require("./../../constants");

const { Schema } = mongoose;

const questionSchema = new Schema(
  {
    number: Number,
    next: Schema.Types.Mixed,
    isDependent: Boolean,
    type: String,
    text: String,
    hintText: String,
    label: String,
    isJumping: Boolean,
    jumpTo: [
      {
        value: String,
        nextQuestion: Number,
        _id: false,
      },
    ],
    options: [String],
    category: {
      type: String,
      enum: constants.database.ORGANIZATIONS_TYPE,
    },
    profileSection: {
      type: String,
      enum: constants.database.PROFILE_SECTIONS,
    },
    profileText: String,
    profileType: String,
    profileOrder: Number,
    group: {
      groupOrder: Number,
      name: String,
      text: String,
    },
    hasComment: Boolean,
    icon: String,
  },
  {
    timestamps: true,
  },
);

module.exports = mongoose.model("questions", questionSchema);
