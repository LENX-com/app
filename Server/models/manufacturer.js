const mongoose = require("mongoose");
const { ObjectId } = mongoose.Schema.Types;

const manufacturerSchema = new mongoose.Schema(
  {
    manufacturerId: {
      type: ObjectId,
      ref: "User",
      required: true
    },
    team: {
      type: String,
    },
    reviews: [{
      type: ObjectId,
      ref: "Review"
  }]
  },
  { timestamps: true }
);

module.exports = mongoose.model("Manufacturer", manufacturerSchema);

