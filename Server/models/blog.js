const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const BlogSchema = new Schema({
  user: {
    type: Schema.Types.ObjectId
  },
  title:{
    type: String,
    required: true,
    trim: true,
  },
  text: {
    type: String,
    required: true,
    trim: true,
  },
  name: {
    type: String 
  },
  tags: {
    type: Array,
    required: true 
  },
  avatar: {
    type: String
  },
  status: {
      type: String,
      enum: ["active", "draft", "inactive"],
      default: "active",
  },

  photo: [
      {
      url :{
        type: String
      },
      public_id: {
        type:String
      },
      },
    ],
  likes: [
    {
      user: { 
        type: Schema.Types.ObjectId
      }
    }
  ],
  comments: [
    {
      user: {
        type: Schema.Types.ObjectId
      },
      text: {
        type: String,
        required: true
      },
      name: {  
        type: String
      },
      avatar: {
        type: String
      },
      date: {
        type: Date,
        default: Date.now
      }
    }
  ],
  date: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('blog', BlogSchema);