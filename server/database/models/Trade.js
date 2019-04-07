const mongoose = require("mongoose");

const { Schema } = mongoose;

const tradeSchema = new Schema({
  title: {
    type: String,
    required: true,
  },
}, {
  timestamps: true,
});

module.exports = mongoose.model("trades", tradeSchema);
