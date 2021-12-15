const Chat = require('../models/chat');
let { STATIC_CHANNELS } = require('../utils/channels');

exports.getChannels = (req, res) => {
    res.json({
        channels: STATIC_CHANNELS
    });
}

exports.getChat = (req, res) => {
    let {receiverID} = req.params;

    Chat.find({receiverID}, (err, messages) => {
        if (err) throw err;

        let response = []

        messages.forEach((single) => {
            let message = {
                id: single.messageID,
                senderId: single.senderID,
                channel_id: single.receiverID,
                text: single.message,
                senderName: single.senderName,
                audio: single.audio,
                media: single.media
            }  

            response.push(message);
        });

        res.json(response);
    });
}