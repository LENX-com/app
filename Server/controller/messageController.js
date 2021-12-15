const Message = require("../models/message");
const Conversation = require("../models/conversation");
const { User } = require("../models/user");
const _ = require("lodash");


exports.MessageSend = async (req, res) => {
  
  try {
    const sender = await User.findById(req.user._id)
    if(!sender ){
      console.log("Invalid parameters")
      return res.status(500).json("Invalid parameters")
    }

    const conversation = await Conversation.findById(req.body.conversationId)
    
    const text = req.body.text

    if( !text ){
      return res.status(500).json("No valid text") 
    }

    const newMessage = await Message.create({
                                   sender : sender._id,
                                   conversationId: conversation._id,
                                   text,
                                  });
    
    //update date of conversation to latest message                              
    conversation.updatedAt = Date.now()

    await conversation.save()

    console.log({conversation})
    return res.status(200).json(newMessage);
  } catch (err) {
    res.status(500).json(err);
  }}


exports.conversationID = async (req, res) => {
  try {
    const messages = await Message.find({
      conversationId: req.params.conversationId,
    });
    res.status(200).json(messages);
  } catch (err) {
    res.status(500).json(err);
  }
};  



exports.NewMessageConversation = async (req, res) => {

  console.log(req.body)
  try {

  const sender = await User.findById(req.user._id)
  const receiver = await User.findById(req.body.receiverId)

  if(!receiver ){
    console.log("Invalid parameters")
    return res.status(500).json("Invalid parameters")
  }  

    const text = req.body.text

    var conversation = await Conversation.findOne({ 
      members: [sender._id, receiver._id],
    });

    
    //Create a new conversation if it does not exist
    if (_.isEmpty(conversation)) {
      var conversation = await Conversation.create({
        members: [sender._id, receiver._id],
      });
      if(_.isEmpty(conversation)){
        return res.status(500).json("Conversation invalid")
      }
      const newMessage = await Message.create({
                                     sender : sender._id,
                                     conversationId: conversation._id,
                                     text,
                                    });

      return res.status(200).json({newMessage, conversation});

    } else {
      const newMessage = await Message.create({
                               sender : sender._id,
                               conversationId : conversation._id,
                               text,
                              });
      //update date of conversation to latest message                              
      conversation.updatedAt = Date.now()
  
      await conversation.save()

      return res.status(200).json(newMessage);
    }

  } catch (err) {
    console.log({err})
    res.status(500).json(err);
  }}