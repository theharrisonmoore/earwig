const mongoose = require("mongoose");

const { Schema } = mongoose;
const { ObjectId } = Schema.Types;

const jobSchema = new Schema({
  title: {
    type: String,
    required: true,
  },
  description: String,
  trade: {
    type: ObjectId,
    ref: "trades",
  },
  rate: Number,
  hours: Number,
  startDate: Date,
  company: {
    type: ObjectId,
    ref: "organizations",
  },
  agency: {
    type: ObjectId,
    ref: "organizations",
  },
  worksite: {
    type: ObjectId,
    ref: "organizations",
  },
  favorites: [
    {
      user: {
        type: ObjectId,
        ref: "users",
      },
    },
  ],
  location: String,
  isActive: {
    type: Boolean,
    default: true,
  },
  timestamps: true,
});


module.exports = mongoose.model("jobs", jobSchema);
