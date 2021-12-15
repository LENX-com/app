 const mongoose = require("mongoose");
const { ObjectId } = mongoose.Schema.Types

const QuestionSchema = new mongoose.Schema(
  {
    productId: { 
        type: ObjectId,
        ref: "Product",
        required : true 
     },
     author: {
         id: {
            type: ObjectId,
            ref: "User",
            required: true
         },
         name: {
            type: String,
            required: true 
         },
         avatar: {
             type: String
         },
    },
    question: {
      type: String,
      required: true
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
    answers: [{
        answer : {
            type: String,
            required: true
        },
        user: {
            type: ObjectId,
            ref: 'User',
            required: true
        },
        avatar: {
            type: String
        },
        name: {
            type: String,
            required: true
        },
        upvotes: {
            type: Number
        },
        downvotes : {
            type: Number
        },
        score: {
            type: Number,
            default: 0
        },
        is_anonymous : {
            type: Boolean
        },
         date: {
            type: Date,
            default: Date.now
        }
    }],
    is_answered : {
        type: Boolean,
        default: false
    },
    is_anonymous : {
        type: Boolean
    },
    date: {
    type: Date,
    default: Date.now
    }
  },
  { timestamps: true }
);

QuestionSchema.set('toJSON', { getters: true, virtuals: true });

QuestionSchema.options.toJSON.transform = (doc, ret) => {
  const obj = { ...ret };
  delete obj._id;
  delete obj.__v;
  return obj;
};

QuestionSchema.virtual('upvotePercentage').get(function () {
  if (this.votes.length === 0) return 0;
  const upvotes = this.votes.filter(vote => vote.vote === 1);
  return Math.floor((upvotes.length / this.votes.length) * 100);
});

QuestionSchema.methods.vote = function (user, vote) {
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

module.exports = mongoose.model("Question", QuestionSchema);    