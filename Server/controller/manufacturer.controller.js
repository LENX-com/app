const Manufacturer = require("../models/manufacturer");
const { User } = require("../models/user");
const Category = require("../models/category");
const { check, validationResult } = require("express-validator/check");

//routes to get all maunufacturer with the role of 1
exports.getAllManufacturer = async (req, res) => {
  try {
    const manufacturer = await User.find({ role: 1 }).select(
      "-hashed_password -email -salt -history -session"
    );
    return res.json(manufacturer);
  } catch (err) {
    console.log(err);
  }
};

//get single manufacturer by id
exports.getManufacturerById = async (req, res) => {
  try {
    const manufacturer = await User.findById(req.params.manufacturerId)
      .select("-hashed_password -email -salt -history -session")
      .populate("story")
      .populate("blogs")
      .populate("products")
      .populate("categories");
    return res.json(manufacturer);
  } catch (err) {
    console.log(err);
  }
};

//routes to upload avatar
//routes to upload bg image

//create a profile for a team members by an admin
exports.createProfile = async (req, res) => {
  try {
    const { ...args } = req.body;
    args.userId = req.user._id;

    const newProfile = await Manufacturer.create(args);
    return res
      .status(200)
      .json({ data: newProfile, msg: "Profile created sucesfully" });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ error: error });
  }
};

exports.getProfile = async (req, res) => {
  const profile = await Manufacturer.find({ userId: req.user._id });
  try {
    if (!profile.length) {
      return res.status(400).json({ error: "No Profile created Yet " });
    }
    return res.status(200).json({ data: profile, msg: "Success" });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ error: error });
  }
};

exports.getProfileById = async (req, res) => {
  const profile = await Manufacturer.findById(req.params.profileId);
  try {
    if (!profile) {
      return res.status(400).json({ error: "no profile with that Id found" });
    }
    return res.status(200).json({ data: profile, msg: "success" });
  } catch (error) {
    console.log(error);
    return res.status(200).json(error);
  }
};

exports.removeProfile = async (req, res) => {
  try {
    await Manufacturer.findByIdAndDelete(req.params.profileId);
    return res.status(200).json({ msg: "Profile deleted succesfully" });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ error: error });
  }
};

//write review for manufacturer
//write review for product

exports.manufacturerReview = async (req, res) => {
  console.log(req.user);
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  try {
    const comment = {
      manufacturerId: req.params.manufacturerId,
      comments: {
        userId: req.user._id,
        title: req.body.title,
        text: req.body.text,
        name: req.user.name,
        avatar: req.user.avatar,
      },
    };
    

    const newComment = await Manufacturer.create(comment);
    return res
      .status(200)
      .json({ data: newComment, msg: "Comment Posted Succesfully" });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ error: error });
  }
};

exports.reviewByManufacturer = async (req, res) => {
  try {
    const manufacturer = await Manufacturer.find({
      manufacturerId: req.params.manufacturerId,
    });
    if (!manufacturer) {
      return res.status(404).json({ msg: "Review not found" });
    }
    console.log(manufacturer);
    return res.status(200).json(manufacturer);
  } catch (error) {
    console.log(error);
    return res.status(500).json({ error });
  }
};
