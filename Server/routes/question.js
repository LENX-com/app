const express = require("express");
const router = express.Router();
const { auth } = require("../middlewares/verify");
const { check, validationResult } = require("express-validator/check");
const {
 postQuestion,
 answer,
 listAll,
 load,
 upvote,
 downvote,
 unvote
} = require("../controller/question.controller");
const checkObjectId = require("../middlewares/checkObjectId");

const Check = check("text", "Text is required").not().isEmpty()

router.param('question', load);

router.post("/question/:productId", auth, Check, postQuestion);

router.post("/answer/:questionId", check("answer", "Text is required").not().isEmpty(), auth, Check, answer );

router.get("/questions/:productId", listAll);

// upvote and downvote
router.get('/question/:question/upvote', auth, upvote);
router.get('/question/:question/downvote', auth, downvote);
router.get('/question/:question/unvote', auth , unvote);

module.exports = router;
   