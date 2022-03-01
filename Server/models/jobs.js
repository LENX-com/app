const mongoose = require("mongoose");
const { ObjectId } = mongoose.Schema.Types;

const jobSchema = new mongoose.Schema(
  {
    author: {
      type: ObjectId,
      ref: "User",
      required: true,
    },
    title: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
      //maxlength: 2000
    },
    location: {
        type: ObjectId,
        ref: "Location",
        required: true
    },    
    status: {
      type: String,
      enum: [ "active", "draft", "inactive" ],
      default: "active",
      required: true
    },
    budget: {
      type: Number,
      required: true
    },  
    category:
      {
        type: ObjectId,
        ref: "Category",
        required: true
      },
  },
  { timestamps: true }
); 

module.exports = mongoose.model("Job", jobSchema);
