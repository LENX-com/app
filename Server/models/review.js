 const mongoose = require("mongoose");
const { ObjectId } = mongoose.Schema.Types

const ReviewSchema = new mongoose.Schema(
  {
     storeId: {
       type: ObjectId,
       ref: "User",
       required: [true, " a valid store must be entered "]
     },
     author: {
        type: ObjectId,
        ref: "User",
        required: true
    },
    title: {
      type: String,
      required: true
    },
    review: {
      type: String,
      required: [true, "Review Description is required"],
      minlength: [10, "Review Description must be 10 characters or longer"]
    },
     responses: [{
       user: {
         type: ObjectId,
         ref: "User",
         required: true,
       },
       response: {
          type : String,
          required: true,
       }
     }],
    rating: {
      type: Number,
      max: [ 5, "rating cannot be higher than 5" ],
      min: [ 1, " rating cannot be lower than 1 "]
    },
    votes: [{
        user: { 
            type: ObjectId,
            required: true,
            ref: 'User'
        },
        vote: { 
            type: Number,
            required: true
        }
    }],
    score: {
        type: Number,
        default: 0
    },
    date: {
    type: Date,
    default: Date.now
    }
  },
  { timestamps: true }
);

ReviewSchema.set('toJSON', { getters: true, virtuals: true });

ReviewSchema.options.toJSON.transform = (doc, ret) => {
  const obj = { ...ret };
  delete obj._id;
  delete obj.__v;
  return obj;
};

ReviewSchema.virtual('upvotePercentage').get(function () {
  if (this.votes.length === 0) return 0;
  const upvotes = this.votes.filter(vote => vote.vote === 1);
  return Math.floor((upvotes.length / this.votes.length) * 100);
});

ReviewSchema.methods.vote = function (user, vote) {
  const existingVote = this.votes.find(item => item.user._id.equals(user));

  if (existingVote) {
    // reset score
    this.score -= existingVote.vote;
    if (vote === 0) {
      // remove vote
      this.votes.pull(existingVote);
    } else {
      // change vote
      this.score += vote;
      existingVote.vote = vote;  
    }
  } else if (vote !== 0) {
    // new vote
    this.score += vote;
    this.votes.push({ user, vote });
  }

  return this.save();
};

module.exports = mongoose.model("Review", ReviewSchema);    