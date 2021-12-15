const mongoose = require("mongoose");
const { ObjectId } = mongoose.Schema;

const subSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      trim: true,
      required: "Name is required",
      minlength: [2, "Too short"],
      maxlength: [32, "Too long"],
    },
    slug: {
      type: String,
      unique: true,
      lowercase: true,
      index: true,
    },
    bg: {
      type: String,
      default:
        "https://res.cloudinary.com/lenx/image/upload/v1619714832/avatar_g2cc3h.png",
    },
    parent: { type: ObjectId, ref: "Category", required: true },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Sub", subSchema);