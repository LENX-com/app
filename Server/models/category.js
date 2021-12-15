const mongoose = require("mongoose");
const { ObjectId } = mongoose.Schema.Types;

const brandSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      trim: true,
      required: true,
      maxlength: 32,
      unique: true,
    },
    userId: {
      type: ObjectId,
    },
  },
  { timestamps: true }
);
const opts = { toJSON: { virtuals: true } };
const categorySchema = new mongoose.Schema(  
  {
    name: {
      type: String,
      trim: true,
      required: true,
      maxlength: 32,
      unique: true,
    },
    userId: {
      type: ObjectId,
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
  },
  opts,
  { timestamps: true }
);
categorySchema.virtual("products", {
  localField: "_id",
  ref: "Product",
  foreignField: "category",
  justOne: false,
});

const Category = mongoose.model("Category", categorySchema);
const Brand = mongoose.model("Brand", brandSchema);

module.exports = { Category, Brand };
