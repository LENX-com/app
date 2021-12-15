const Conversation = require("../models/conversation");
const { User } = require("../models/user");
const mongoose = require("mongoose");
const Message = require("../models/message");
const _ = require('lodash')


exports.newConv = async (req, res) => {
  try {
    const sender = await User.findById(req.user._id)
    const receiver = await User.findById(req.body.receiverId)
  
    if(!sender || !receiver){
      throw new Error("Users not found")
    }
  
    const conversation = await Conversation.find({ 
      members: [sender._id, receiver._id],
    });
    
    //Check whether the conversation already exists
    if (!_.isEmpty(conversation)) {
      return res.status(401).json("Conversation already exists")
    }

    const newConversation = await Conversation.create({
      members: [sender._id, receiver._id],
    });
    const savedConversation = await newConversation.save();
    res.status(200).json(savedConversation);
  } catch (err) {
    console.log(err)
    res.status(500).json(err);
  }
};

exports.Conversations = async (req, res) => {
  try {
    const conversation = await Conversation.find({
      members: { $in: [mongoose.Types.ObjectId(req.params.userId)] },
    })
    .populate('members', 'name avatar slug')
    .sort("-updatedAt")

    for (let i = 0; i < conversation.length; i++ ){
      var lastMessage = []
      var message = await Message.findOne({conversationId: conversation[i]._id})
      .sort('-createdAt')
      conversation[i].lastMessage = message.text
    }

    res.status(200).json(conversation);
  } catch (err) {
    res.status(500).json(err);
  }
};
   
exports.findConversation = async (req, res) => {
  try {
    const conversation = await Conversation.findOne({
      members: { $all: [req.params.firstUserId, req.params.secondUserId] },
    });
    res.status(200).json(conversation);
  } catch (err) {
    res.status(500).json(err);
  }
};

exports.createConv = async (req, res) => {
  try {
    const newConv = await Message.create(req.body);
    return res.json(newConv);
  } catch (err) {
    console.log(err);
  }
};

exports.getConv = async (req, res) => {
  try {
    const resp = await Message.find({
      $and: [
        {
          senderId: req.body.senderId,
        },
        {
          senderId: req.body.receiverId,
        },
      ],
    });
    return res.json(resp);
  } catch (err) {
    console.log(err);
  }
};
