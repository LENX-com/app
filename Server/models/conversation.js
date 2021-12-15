const mongoose = require("mongoose");
const { ObjectId } = mongoose.Schema.Types;

const ConversationSchema = new mongoose.Schema(
  {
    members: [{
      type: ObjectId,
      ref: 'User'
    }],
    lastMessage: {
      type: String
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Conversation", ConversationSchema);       