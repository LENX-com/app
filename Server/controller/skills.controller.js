const Skill = require("../models/skills");
const Product = require("../models/product");
const slugify = require("slugify");

exports.create = async (req, res) => {
  try {
    const { skill, parent } = req.body;
    res.json(await new Skill({ skill, parent, slug: slugify(skill) }).save());
  } catch (err) {
    console.log("Skill CREATE ERR ----->", err);
    res.status(400).send("Create skill failed");
  }
}; 

exports.list = async (req, res) =>
  res.json(await Skill.find({}).sort({ createdAt: -1 }).exec());

exports.read = async (req, res) => {
  let skill = await Skill.findOne({ slug: req.params.slug }).exec();
  const products = await Product.find({ skills: skill })
    .populate("category")
    .exec();

  res.json({
    skill,
    products,
  });
};

exports.update = async (req, res) => {
  const { name, parent } = req.body;
  try {
    const updated = await Skill.findOneAndUpdate(
      { slug: req.params.slug },
      { name, parent, slug: slugify(name) },
      { new: true }
    );
    res.json(updated);
  } catch (err) {
    res.status(400).send("Skill update failed");
  }
};

exports.remove = async (req, res) => {
  try {
    const deleted = await Skill.findOneAndDelete({ slug: req.params.slug });
    res.json(deleted);
  } catch (err) {
    res.status(400).send("Skill delete failed");
  }
};