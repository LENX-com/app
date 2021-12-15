const express = require("express");
const router = express.Router();

const { auth } = require("../middlewares/verify");

const {
  signup,
  signin, 
  signout,
  requireSignin,
  authUser,
  googleLogin,
} = require("../controller/auth.controller");

const { userSignupValidator } = require("../validator");

router.get("/auth", auth, authUser);
router.post("/signup", userSignupValidator, signup);
router.post("/signin", signin);
router.get("/signout", signout);
router.post("/google-login", googleLogin);

module.exports = router;
  