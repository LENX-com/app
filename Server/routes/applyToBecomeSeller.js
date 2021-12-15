const express = require("express");
const router = express.Router();

const { auth } = require("../middlewares/verify");

const {
  send
} = require("../controller/applyToBecomeSeller.controller");

const { userSignupValidator } = require("../validator");

router.put("/send", send);

module.exports = router;
  