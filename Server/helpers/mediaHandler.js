const Chat = require('../models/chat');
const fs = require('fs');
const path = require('path');
const { uploadChatMedia } = require('../middlewares/cloudinary');

exports.storeMedia = (media, io) => {
    const buffer = media.media != undefined ? Buffer.from(media.media) : Buffer.from(media.audio);

    let folder = media.type == 'mp3' ? 'audio' : 'images';

    fs.createWriteStream(path.join(__dirname + `../../public/${folder}/${media.senderName.toLowerCase().replace(' ', '_')}-${media.id}.${media.type}`)).write(buffer);
            
    media.filename = `${media.senderName.toLowerCase().replace(' ', '_')}-${media.id}.${media.type}`;
    media.path = path.join(__dirname + `../../public/${folder}/${media.senderName.toLowerCase().replace(' ', '_')}-${media.id}.${media.type}`);

    uploadChatMedia(media, (media) => {
        fs.unlink(media.path, (err, res) => {
            if (err) throw err;

            let chat = new Chat({
                messageID: media.id,
                senderID: media.senderId,
                receiverID: media.channel_id,
                media: media.media,
                audio: media.audio,
                senderName: media.senderName
            });
                    
            chat.save((err, result) => {
                if (err) throw err;
                    io.emit(media.media != undefined ? 'media' : 'audio', media);
                })
            })
                
        });
}