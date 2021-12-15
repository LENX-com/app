const express = require("express");
const router = express.Router();
const multer = require("multer");
const storage = multer.diskStorage({
  filename: (req, file, cb) => {
    cb(null, `${Date.now()}_${file.originalname}`);
  },
});

const upload = multer({ storage })

const {
  getProductReviews,
  AddProductReview,
  AddLike,
  RemoveLike 
} = require("../controller/productReview.controller");

const { auth, protected } = require("../middlewares/verify");
const { userById } = require("../controller/user.controller");
const { uploadImage } = require("../middlewares/cloudinary");
const checkObjectId = require("../middlewares/checkObjectId");
const { check, validationResult } = require("express-validator/check");
const _ = require("lodash");
  

router.get("/product/reviews/:productId", getProductReviews)

router.post(
  "/product/review/:slug",
  check("review", "review is required").not().isEmpty(),
  auth, AddProductReview)

router.put("/product/like/:productReviewId", auth, AddLike )
router.put("/product/unlike/:productReviewId", auth, RemoveLike)


module.exports = router;