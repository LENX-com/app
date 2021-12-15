const { check, validationResult } = require("express-validator/check");
const Question = require("../models/question");
const { User } = require("../models/user");

exports.postQuestion = async (req, res, next) => {
  try {
    const author = req.user._id;

    if(!author) {
        throw new Error ("User not found")
    }

    const question = await Question.create({
      question: req.body.question,
      productId: req.params.productId,
      author: {
        id: req.user._id,
        name: req.user.name,
        avatar: req.user.avatar
      },
      is_anonymous: false,
    })

     if (!question) {
      return res.status(400).json({ error: "Question failed" });
    }

    res.status(201).json({data: question, msg: "Question posted succesfully"});
  } catch (err) {
    next(err);
  }
};

//write review for product
exports.answer =  async (req, res) => {

    try {
      const user = await User.findById(req.user._id).select("-password");
      const question = await Question.findById(req.params.questionId);

      if(!user || !question ){
          throw new Error(" User does not exist ")
      }

      console.log(req.body)


      const newComment = {
        answer: req.body.answer,
        name: user.name,
        avatar: user.avatar,
        user: req.user._id,
      };

      question.answers.unshift(newComment);
      question.is_answered = true

      await question.save();

      res.json(question);
    } catch (err) {
      console.error(err.message);
      res.status(500).send("Server Error");
    }
  }

  exports.listAll = async (req, res) => {
  try {    
  let questions = await Question.find({ productId : req.params.productId })
    .sort([["createdAt", "desc"]])
    .exec();

    if(!questions){
        throw new Error("Questions could not be found")
    }

    res.json(questions);
  } catch(err) {
      console.log(err.message);
      res.status(500).send("Questions not found")
  }
};

exports.load = async (req, res, next, id) => {
  try {
    req.question = await Question.findById(id);
    if (!req.question) return res.status(404).json({ message: 'Question not found' });
  } catch (err) {
    if (err.name === 'CastError')
      return res.status(400).json({ message: 'invalid question id' });
    return next(err);
  }
  next();
};

exports.upvote = async (req, res) => {
  const question = await req.question.vote(req.user._id, 1);
  res.json(question);
};

exports.downvote = async (req, res) => {
  const question = await req.question.vote(req.user._id, -1);
  res.json(question);
};

exports.unvote = async (req, res) => {
  const question = await req.question.vote(req.user._id, 0);
  res.json(question);
};