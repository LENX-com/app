const mongoose = require("mongoose");

const ApplyToBecomeSellerSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true
    },
    summary:{
      type: String,
      required: true
    },
    email:{
      type: String,
      required: true
    },
    mobile: {
      type: Number,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("ApplyToBecomeSeller", ApplyToBecomeSellerSchema);       