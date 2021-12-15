const mongoose = require("mongoose");

const chatSchema = new mongoose.Schema({
    messageID: {
        type: Number,
        required: true
    },
    senderID: {
        type: String // mongoose.Schema.Types.ObjectId,
        // ref: "User",
    },
    receiverID: {
        type: String // mongoose.Schema.Types.ObjectId,
        // ref: "User",
    },
    message: {
        type: String
    },
    audio: {
        type: String,
    },
    media: {
        type: String
    }, // This is for testing
    senderName: {
        type: String  
    }
}, 
{
    timestamps: true
});

module.exports =  mongoose.model("Chat", chatSchema);