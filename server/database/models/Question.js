const mongoose = require("mongoose");

const constants = require("./../../constants");

const { Schema } = mongoose;

const questionSchema = new Schema({
  number: Number,
  type: String,
  text: String,
  hintText: String,
  isJumping: Boolean,
  jumpTo: [{
    value: String,
    nextQuestion: Number,
  }],
  options: [String],
  category: {
    type: String,
    enum: constants.database.ORGANIZATIONS_TYPE,
  },
}, {
  timestamps: true,
});

module.exports = mongoose.model("questions", questionSchema);
