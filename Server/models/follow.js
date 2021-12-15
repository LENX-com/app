const mongoose = require("mongoose");
const { ObjectId } = mongoose.Schema.Types;

const FollowersSchema = new mongoose.Schema({
  user: {
    type: ObjectId,
    ref: 'User'
  },
  followers: [
    {
      user: {
        type: ObjectId,
        ref: 'User'
      }
    }
  ]
});

const FollowingSchema = new  mongoose.Schema({
  user: {
    type: ObjectId,
    ref: 'User'
  },
  following: [
    {
      user: {
        type: ObjectId,
        ref: 'User'
      }
    }
  ]
});

const Followers = mongoose.model('Followers', FollowersSchema);
const Following = mongoose.model('Following', FollowingSchema);


module.exports = { Followers, Following };
