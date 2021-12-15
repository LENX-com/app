const express = require("express");
const router = express.Router();
const {
  newConv,
  Conversations,
  findConversation,
  createConv,
  getConv
} = require("../controller/conversationController");
const { auth } = require("../middlewares/verify");

//new conv

router.post("/conversation", auth, newConv);
router.post("/new_conv", auth, createConv);
router.post("/get_conv", auth, getConv);

//get conv of a user

router.get("/conversation/:userId", auth, Conversations);

// get conv includes two userId

router.get("/conversation/find/:firstUserId/:secondUserId", auth, findConversation);

module.exports = router;
   