require('dotenv').config();
const cloudinary = require('cloudinary').v2;


exports.uploadImage = (req, res, next) => {
    
    cloudinary.config({ 
        cloud_name: process.env.CLOUD_NAME, 
        api_key: process.env.CLOUD_KEY, 
        api_secret: process.env.CLOUD_SECRET 
    });

    let filename = req.files[0].originalname;
    
    cloudinary.uploader.upload(`C:/Users/34641/Desktop/Proyectos/LenX/test-products/${filename}`, {
        folder: `products/${req.params.userId}/`,
        public_id: `${filename.slice(0, filename.lastIndexOf("."))}`
    }, function(error, result) {
        if (error) throw error;

        req.body.photo = result.secure_url;
        
        next();
    });
    
}

exports.uploadChatMedia = (message, callback) => {
    
    cloudinary.config({ 
        cloud_name: process.env.CLOUD_NAME, 
        api_key: process.env.CLOUD_KEY, 
        api_secret: process.env.CLOUD_SECRET 
    });

    
    cloudinary.uploader.upload(message.path, {
        folder: `chat/${message.channel_id}/`,
        resource_type: 'auto'
    }).then(({secure_url}) => {
        if (message.audio){
            message.audio = secure_url;
        } else if (message.media) {
            message.media = secure_url;
        }

        callback(message);

    }).catch((error) => console.log(error))
    

}

