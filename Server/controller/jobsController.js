const formidable = require("formidable");
const _ = require("lodash");
const fs = require("fs");
const Job = require("../models/jobs");
const Review = require("../models/review");
const ProductReview = require("../models/productReview");
const { User } = require("../models/user");
const { errorHandler } = require("../helpers/dbErrorHandler");
const slugify = require("slugify");
const { check, validationResult } = require("express-validator/check");
const {ObjectId} = require('mongodb');
const cloudinary = require("cloudinary").v2;
    cloudinary.config({
        cloud_name: process.env.CLOUDINARY_NAME,
        api_key: process.env.CLOUDINARY_API,
        api_secret: process.env.CLOUDINARY_SECRET
      })


exports.createJob = async (req, res) => {
  try {
    const { ...args } = req.body;
    args.author = req.user._id;
    const newJob = await Job.create(args);
    return res.status(200).json(newJob);
  } catch (error) {
    console.log(error);
    return res
      .status(500)
      .json({ error: error });
  }
};

exports.getJobsByUser = async (req, res) => {
  try {
    const jobs = await Job.find({ author: req.user._id });
    return res.status(200).json(jobs);
  } catch (error) {
    console.log(error);
    return res
      .status(500)
      .json({ error: error });
  }
};

exports.getJobById = async (req, res) => {
  try {

    const jobId = req.params.jobId;
    if( !jobId ) {
        return res.status(400).json({error: "Job ID is required"});
    }
    // const job = await Job.findById(jobId);
    //  if( ! _.isEqual(job.author, req.user._id) ) { 
    //     return res.status(500).json({error: "You are not authorized to view this job"});
    // }
    return res.status(200).json(job);
  } catch (error) {
    console.log(error);
    return res
      .status(500)
      .json({ error: error });
  }
};

exports.updateJob = async (req, res) => {
  try {

    const jobId = req.params.jobId;

    if( !jobId ) {
        return res.status(400).json({error: "Job ID is required"});
    }
    const job = await Job.findById(jobId);
     if( ! _.isEqual(job.author, req.user._id) ) { 
        return res.status(500).json({error: "You are not authorized to edit this job"});
    }
    const { ...args } = req.body;

    const updated = await Job.findOneAndUpdate({ _id: jobId }, args, {
        new: true,
    })

    console.log("updated", updated);

    return res.status(200).json(updated);
  } catch (error) {
    console.log(error);
    return res
      .status(500)
      .json({ error: error });
  }
};

exports.deleteJob = async (req, res) => {
  try {

    const jobId = req.params.jobId;

    if( !jobId ) {
        return res.status(400).json({error: "Job ID is required"});
    }
    const job = await Job.findById(jobId);
     if( ! _.isEqual(job.author, req.user._id) ) { 
        return res.status(500).json({error: "You are not authorized to remove this job pal"});
    }

    const deleted = await Job.findByIdAndDelete(jobId);

    return res.status(200).json(deleted);
  } catch (error) {
    console.log(error);
    return res
      .status(500)
      .json({ error: error });
  }
};
  
exports.getJobs= async ( req, res ) => { 
  try {
    var perPage = 18;
    var page = req.params.page
    var query = req.query.search ? req.query.search : ""

    var filters = {
      description: { $regex: query , $options: "i" }, 
      category: req.query.category ? req.query.category : undefined
    }

    // Check if categories is undefined and remove it from filter 
    Object.keys(filters).forEach( key => filters[key] === undefined ? delete filters[key] : {} );

    const jobs = await Job.find({...filters})
    .populate("category")
    .populate("author", "name avatar")
    .populate("location")
    .sort("-createdAt")
    .limit(perPage)
    .skip(perPage * page )
    .exec()

    const count = await Job.countDocuments({ ...filters })

    return res.status(200).json({
         jobs,
         count
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ error: error });
  }
};

