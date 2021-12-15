const formidable = require("formidable");
const _ = require("lodash");
const fs = require("fs");
const Product = require("../models/product");
const ProductReview = require("../models/productReview");
const { User } = require("../models/user");
const { errorHandler } = require("../helpers/dbErrorHandler");
const slugify = require("slugify");
const { check, validationResult } = require("express-validator/check");
const cloudinary = require("cloudinary").v2;
cloudinary.config({
    cloud_name: process.env.CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET
})  



exports.AddProductReview = async (req, res) => {
  try {
    const review = await ProductReview.find({ author: req.user._id });
    const user = await User.findById(req.user._id);
    const product = await Product.findOne({slug: req.params.slug})
    
    if(!product){
        throw new Error("This product does not exist")
    }

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

    const { ...args } = req.body;
    args.productId = product._id;
    args.author = req.user._id
    
    
    let ratingAdded = await Product.findByIdAndUpdate(
      product._id,
      {
        $push: { ratings: { rating: args.rating,  postedBy: user._id } },
      },
      { new: true }
    ).exec();
    console.log("ratingAdded", ratingAdded);

    const newReview = await ProductReview.create(args);
    return res.status(200).json(newReview);
  } catch (error) {
    console.log(error);
    return res.status(500).json({ error });
  }
};


//Get reviews by product Id
exports.getProductReviews =  async (req, res) => { 

    try {
      const reviews = await ProductReview.find({productId: req.params.productId}).
      populate("author", "name avatar")
      
      if (!reviews){
        throw new Error ("Server Error")
      }

      return res.status(200).json(reviews);
    } catch (err) {
      console.error(err);
      res.status(500).send(err);
    }
  }


exports.addResponse =  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }  

    try {
      const review = await ProductReview.findById(req.params.reviewId);

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


exports.AddLike = async (req, res) => {
  try {
    const productReview = await ProductReview.findById(req.params.productReviewId);

    // Check if the Blog has already been liked
    if (productReview.likes.some((like) => like.user.toString() === req.user.id)) {
      return res.status(400).json({ msg: "Product Review already liked" });
    }

    productReview.likes.unshift({ user: req.user.id });

    await productReview.save();

    return res.json(productReview.likes);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
}


// @route    PUT api/Blogs/unlike/:id
// @desc     Unlike a Blog
// @access   Private

exports.RemoveLike = async (req, res) => {
  try {
    const productReview = await ProductReview.findById(req.params.productReviewId);

    // Check if the Blog has not yet been liked
    if (!productReview.likes.some((like) => _.isEqual(like.user, req.user._id))) {
      return res.status(400).json({ msg: "Product Review has not yet been liked" });
    }

    // remove the like
    productReview.likes = productReview.likes.filter(
      ({ user }) => !_.isEqual(user,  req.user._id)
    );

    await productReview.save();

    return res.json(productReview.likes);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
}