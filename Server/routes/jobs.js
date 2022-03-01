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
  createJob,
  getJobsByUser,
  getJobById,
  updateJob,
  deleteJob,
  getJobs
} = require("../controller/jobsController");
const { auth, protected } = require("../middlewares/verify");  
const { uploadImage } = require("../middlewares/cloudinary");
const checkObjectId = require("../middlewares/checkObjectId");
const { check, validationResult } = require("express-validator/check");
const _ = require("lodash");


//new implementation route 
router.post(
  "/job/create",
  auth,
  createJob
); 

router.get(
  "/jobs/by/user",
  auth,
  getJobsByUser
);

router.get(
    "/job/:jobId",
    auth,
    getJobById
)

router.post(
  "/job/update/:jobId",
  auth,
  updateJob
); 

router.put(
  "/job/delete/:jobId",
  auth,
  deleteJob
);

router.get(
  "/jobs/list/:page",
  getJobs
);

module.exports = router;
  