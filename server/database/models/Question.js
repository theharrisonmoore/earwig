const mongoose = require("mongoose");

const constants = require("./../../constants");

const { Schema } = mongoose;


const questionSchema = new Schema({
  number: Number,
  type: String,
  text: String,
  hintText: String,
  label: String,
  isJumping: Boolean,
  jumpTo: [{
    value: String,
    nextQuestion: Number,
    _id: false,
  }],
  options: [String],
  category: {
    type: String,
    enum: constants.database.ORGANIZATIONS_TYPE,
  },
  group: {
    groupOrder: Number,
    name: String,
    text: String,
  },
  hasComment: Boolean,
}, {
  timestamps: true,
});

module.exports = mongoose.model("questions", questionSchema);
