const Location = require("../models/locations");
const Product = require("../models/product");
const slugify = require("slugify");

exports.create = async (req, res) => {
  try {
    const { location } = req.body;
    res.json(await new Location({ location, slug: slugify(location) }).save());
  } catch (err) {
    console.log("location CREATE ERR ----->", err);
    res.status(400).send("Create location failed");
  }
}; 

exports.list = async (req, res) =>
  res.json(await Location.find({}).sort({ createdAt: -1 }).exec());

// exports.read = async (req, res) => {
//   let skill = await Skill.findOne({ slug: req.params.slug }).exec();
//   const products = await Product.find({ skills: skill })
//     .populate("category")
//     .exec();

//   res.json({
//     skill,
//     products,
//   });
// };

exports.update = async (req, res) => {
  const { name } = req.body;
  try {
    const updated = await Location.findOneAndUpdate(
      { slug: req.params.slug },
      { name, slug: slugify(name) },
      { new: true }
    );
    res.json(updated);
  } catch (err) {
    res.status(400).send("location update failed");
  }
};

exports.remove = async (req, res) => {
  try {
    const deleted = await Location.findOneAndDelete({ slug: req.params.slug });
    res.json(deleted);
  } catch (err) {
    res.status(400).send("Location delete failed");
  }
};