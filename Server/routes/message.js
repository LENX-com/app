const express = require('express');
const router = express.Router();
const { auth, protected } = require("../middlewares/verify");
const { MessageSend, conversationID, NewMessageConversation } = require('../controller/messageController')

//add

router.post("/message", auth, MessageSend)

router.post("/message/new", auth, NewMessageConversation)

//get
router.get("/message/:conversationId", conversationID)


module.exports = router;        