const express = require("express");
const router = express.Router();
const multer = require("multer");
const { check, validationResult } = require("express-validator/check");
const { auth, protected } = require("../middlewares/verify");
const checkObjectId = require("../middlewares/checkObjectId");
const _ = require('lodash')
const Review = require("../models/review");
 const {
  addReview,
  upVote,
  downVote,
  addResponse,
  getReviewsByManufacturer,
  removeResponse,
  getSingleReview,
  deleteReview 
} = require("../controller/review.controller");

const storage = multer.diskStorage({
  filename: (req, file, cb) => {
    cb(null, `${Date.now()}_${file.originalname}`);
  },
});

const upload = multer({ storage });

router.post(
  "/review/create/manufacturer/",
  upload.single("file"),  
  auth,
  addReview
);

router.delete("/remove/review/:reviewId" , auth, async (req, res) => {

  try {
    const review = await Review.findById(req.params.reviewId);
    if (!review) {
      return res.status(404).json({ msg: "review not found" });
    }
    // Check user
    if (!_.isEqual(req.user._id, review.author)) {
      return res.status(401).json({ msg: "User not authorized" });
    }

    await review.remove()
    
    return res.json({ msg: "review removed" });
  } catch (err) {
    console.log(err)
    // res.status(500).send("Server Error");
  }
})

router.get("/reviews/manufacturer/:storeSlug", getReviewsByManufacturer);

router.post("/single/review/manufacturer/", auth, getSingleReview);

router.post(
  "/review/response/:reviewId",
  auth,
  addResponse
);

router.put("/review/remove/response/:reviewId", auth, removeResponse)

router.put("/review/vote/:reviewId", auth, upVote);
router.put("/review/downvote/:reviewId", auth, downVote);

module.exports = router;
