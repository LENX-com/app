const express = require('express');
const router = express.Router();
let { getChannels, getChat } = require('../controller/chat.controller');


router.get('/getChannels', getChannels);

router.get('/historicChat/:receiverID', getChat);

module.exports = router;      