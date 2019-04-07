const mongoose = require("mongoose");

const { Schema } = mongoose;

const { ObjectId } = Schema.Types;


const organizationSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  category: {
    type: String,
    enum: ["company", "agency", "payroll", "worksite"],
    required: true,
  },
  phoneNumber: String,
  email: {
    type: String,
    unique: true,
  },
  websiteURL: String,
  loacation: {
    lat: Number,
    long: Number,
  },
  contractor: {
    name: String,
    logoTitle: String,
    logoUrl: String,
  },
  questions: [
    {
      type: ObjectId,
      ref: "questions",
    },
  ],
  lastViewed: Date,
});


module.exports = mongoose.model("organizations", organizationSchema);
