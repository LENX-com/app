 const mongoose = require("mongoose");
const { ObjectId } = mongoose.Schema.Types

const ProductReviewSchema = new mongoose.Schema(
  {
     productId: {
       type: ObjectId,
       ref: "Product",
       required: [true, " a valid product must be entered "]
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
    likes: [
    {
      user: { 
        type: ObjectId,
      }
    }
  ],
    date: {
    type: Date,
    default: Date.now
    }
  },
  { timestamps: true }
);

// ProductReviewSchema.set('toJSON', { getters: true, virtuals: true });

// ProductReviewSchema.options.toJSON.transform = (doc, ret) => {
//   const obj = { ...ret };
//   delete obj._id;
//   delete obj.__v;
//   return obj;
// };

// ProductReviewSchema.virtual('upvotePercentage').get(function () {
//   if (this.votes.length === 0) return 0;
//   const upvotes = this.votes.filter(vote => vote.vote === 1);
//   return Math.floor((upvotes.length / this.votes.length) * 100);
// });

// ProductReviewSchema.methods.vote = function (user, vote) {
//   const existingVote = this.votes.find(item => item.user._id.equals(user));

//   if (existingVote) {
//     // reset score
//     this.score -= existingVote.vote;
//     if (vote === 0) {
//       // remove vote
//       this.votes.pull(existingVote);
//     } else {
//       // change vote
//       this.score += vote;
//       existingVote.vote = vote;  
//     }
//   } else if (vote !== 0) {
//     // new vote
//     this.score += vote;
//     this.votes.push({ user, vote });
//   }

//   return this.save();
// };

module.exports = mongoose.model("ProductReview", ProductReviewSchema);    