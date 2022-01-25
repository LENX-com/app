const Product = require("../models/product");
const { User } = require("../models/user");
const Review = require("../models/review");
const cloudinary = require("cloudinary").v2;
const { check, validationResult } = require("express-validator/check");
 const mongoose = require("mongoose");
cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.CLOUD_API_KEY,
  api_secret: process.env.API_SECRET,
});
const _ = require("lodash")


exports.addReview = async (req, res) => {
  try {
    const review = await Review.find({ storeId: req.body.userId });
    
    const user = await User.findById(req.body.userId);
    if( !user ) {
      throw new Error (" This user does not exist")
    }
    
    //check if user has already reviewed the store
    var hasReviewed = false;
    for (var i = 0; i < review.length; i++) {
      if (_.isEqual(review[i].author, req.user._id)) {
          hasReviewed = true;
          break;
        }
    }
    if ( hasReviewed ) {
      throw new Error("You have already reviewed pal")
    }

    const file = req.file;
    if (file) {
      const result = await cloudinary.uploader.upload(req.file.path, {
        resource_type: "auto",
      });
    }

    const { ...args } = req.body;
    args.storeId = user._id;
    args.author = req.user._id
    

    const newReview = await Review.create(args);
      //  const newReview = "cool";
    return res.status(200).json({ data: newReview });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ error });
  }
};

exports.getSingleReview = async (req, res) => {
  try {
    const storeId = req.body.storeId
    const user = await User.findById(req.user._id);
    if( !user ) {
      throw new Error (" This user does not exist")
    }
    if(!storeId) {
      console.log("no parameters")
      return res.status(500).json("Parameters not valid")
    }
    
    const review = await Review.find({
      storeId: storeId,
      author: user._id
    })
    
    if(!review) {
      return res.status(500).json("Review not found")
    }

    return res.status(200).json({review})
  } catch(err){
    console.log(err)
    return res.status(500).json({err })
  }
}

exports.deleteReview = async (req, res) => {

  const review = await Review.findByIdAndDelete(req.params.reviewId);
  try {
    if (!review) {
      return res.status(404).json({ msg: "review not found" });
    }
    // Check user
    if (!_.isEqual(req.user._id, review.author)) {
      return res.status(401).json({ msg: "User not authorized" });
    }

    return res.json({ msg: "review removed" });
  } catch (err) {
    console.log(err)
    // res.status(500).send("Server Error");
  }
};


exports.getReviewsByManufacturer = async (req, res) => {
  try {
    const user = await User.find({ slug: req.params.storeSlug })
    if ( !user ) {
      throw new Error ( "This user does not exist" ) 
    }

    const review = await Review.find({ storeId: user[0]._id })
    .populate(
      "author", " _id name avatar "
    );

    // if ( !review || review.length === 0 ){
    //   throw new Error ( "This review does not exist" )
    // }

    return res.json({ data: review });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ error });
  }
};

exports.addResponse =  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }  

    try {
      const review = await Review.findById(req.params.reviewId);

      if(!review) {
        throw new Error ("This review does not exist")
      }

         
    //check if user has already responded the review
    var hasResponded = false;
    for (var i = 0; i < review.responses.length; i++) {
      if (_.isEqual(review.responses[i].user._id, req.user._id)) {
          hasResponded = true;
          break;
        }
    }
    if ( hasResponded ) {
      throw new Error("You have already responded pal")
    }

      const newResponse = {
         response: req.body.response,
         user: req.user._id
      }
      review.responses.unshift(newResponse);

      await review.save();

      res.json(review.responses);
    } catch (err) {
      console.error(err.message);
      res.status(500).send("Server Error");
    }
  }

  exports.removeResponse = async (req, res) => {
  try {
    const review = await Review.findById(req.params.reviewId);
    console.log(review)
    if(!review ){
      throw new Error ("This review does not exist")
    }

    console.log(req.user._id)
    
    // Check the review has not been responded yet
    if (!review.responses.some((response) => _.isEqual(response.user, req.user._id))) {
      return res.status(400).json({ msg: "Review has not yet been responded" });
    }

    // remove the response
    review.responses = review.responses.filter(
      ({ user }) => !_.isEqual(user, req.user._id)
    );

    await review.save();

    return res.json(review.responses);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
}


// exports.upVote = async (req, res) => {
//   try {
//     const review = await Review.find({ _id: req.body.reviewId });
//     const { ...args } = req.body;
//     const upvote = await Upvote.find({
//       $and: [{ userId: req.user.id }, { reviewId: req.body.reviewId }],
//     });
//     console.log(upvote)
//     const downvote = await Downvote.find({
//       $and: [{ userId: req.user.id }, { reviewId: req.body.reviewId }],
//     });
//     if (downvote.length > 0) {
//       await Downvote.findByIdAndDelete({ _id: downvote[0]._id });
//     }
//     const fields = {
//       userId: req.user._id,
//       reviewId: review[0]._id,
//     };
//     if (upvote.length > 0) {
//       return res.json({ error: "already upvoted" });
//     }
//     await Upvote.create(fields);
//     const resp = await Review.findOneAndUpdate(
//       { _id: req.body.reviewId },
//       {
//         $inc: { votes: args.increase },
//       },
//       { new: true, upsert: true, setDefaultsOnInsert: true }
//     );
//     return res.json(resp);
//   } catch (error) {
//     return res.json({ error: error });
//   }
// };

// exports.downVote = async (req, res) => {
//   try {
//     const review = await Review.find({ _id: req.body.reviewId });

//     const { ...args } = req.body;
//     const upvote = await Upvote.find({
//       $and: [{ userId: req.user.id }, { reviewId: req.body.reviewId }],
//     });
//     const downvote = await Downvote.find({
//       $and: [{ userId: req.user._id }, { reviewId: req.body.reviewId }],
//     });
//     if (upvote.length > 0) {
//       await Upvote.findByIdAndDelete({ _id: upvote[0]._id });
//     }
//     const fields = {
//       userId: req.user._id,
//       reviewId: review[0]._id,
//     };
//     if (downvote.length > 0) {
//       return res.json({ error: "already downvoted" });
//     }
//     await Downvote.create(fields);
//     const resp = await Review.findOneAndUpdate(
//       { _id: req.body.reviewId },
//       {
//         $inc: { votes: args.decrease },
//       },
//       { new: true, upsert: true, setDefaultsOnInsert: true }
//     );
//     return res.json(resp);
//   } catch (error) {
//     return res.json({ error: error });
//   }
// };

exports.upVote = async (req, res) => {

  try {
    const review = await Review.findById(req.params.reviewId);

    // Check if the Blog has already been liked
    if (review.likes.length !== 0 && review.likes.some((like) => like.user.toString() === req.user.id)) {
      return res.status(400).json({ msg: "Review already liked" });
    }

    review.likes.unshift({ user: req.user.id });

    await review.save();

    console.log('review.likes', review.likes)
    return res.json(review.likes);
  } catch (err) {
    console.error(err);
    res.status(500).send("Server Error");
  }
}


// @route    PUT api/Blogs/unlike/:id
// @desc     Unlike a Blog
// @access   Private

exports.downVote = async (req, res) => {
  try {
    const review = await Review.findById(req.params.reviewId);

    // Check if the Blog has not yet been liked
    if (!review.likes.some((like) => _.isEqual(like.user, req.user._id))) {
      return res.status(400).json({ msg: "Product Review has not yet been liked" });
    }

    // remove the like
    review.likes = review.likes.filter(
      ({ user }) => !_.isEqual(user,  req.user._id)
    );

    await review.save();

    return res.json(review.likes);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
}

exports.deleteReview = async () => {};
