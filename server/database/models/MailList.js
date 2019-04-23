const mongoose = require("mongoose");

const { Schema } = mongoose;


const MailListSchema = new Schema({
  email: String,
}, {
  timestamps: true,
});

module.exports = mongoose.model("maillists", MailListSchema);
