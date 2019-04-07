const mongoose = require("mongoose");

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
  orgType: {
    type: String,
    enum: ["company", "agency", "payroll", "worksite"],
  },
});

module.exports = mongoose.model("questions", questionSchema);
