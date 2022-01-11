const mongoose = require("mongoose");
const { ObjectId } = mongoose.Schema;

const locationsSchema = new mongoose.Schema(
  {
    location: {
      type: String,
      trim: true,
      required: [true, "Location is required"],
      minlength: [2, "Too short"],
      maxlength: [32, "Too long"],
    },
    city: {
      type: String,
      trim: true,
      required: [true, "Location is required"],
      default: "London",
      minlength: [2, "Too short"],
      maxlength: [32, "Too long"],
    },
    slug: {
      type: String,
      unique: true,
      lowercase: true,
      index: true,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Locations", locationsSchema);