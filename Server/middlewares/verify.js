const jwt = require("jsonwebtoken");
// const { JWT_SECRET } = require("../middleware/config");
const {User} = require("../models/user");

const auth = async (req, res, next) => {
  // Get token from header
  let token = req.headers.authorization;

  // Check if not token
  if (!token) {
    return res.status(401).json({ msg: "No tok, authorization denied" });
  }
  const TokenArray = token.split(" ");
  // Verify token
  try {
    const decoded = jwt.verify(TokenArray[1], process.env.JWT_SECRET);
    req.user = await User.findById(decoded._id);
    next();
  } catch (err) {
    console.log(err + " token is not valid || something wrong with token");
    res.status(500).json({ msg: "Server Error" });
  }
};  

// grant access to specific roles

const protected = (...roles) => {
  return (req, res, next) => {
    if (!roles.includes(req.user.role)) {
      return res.status(403).json({
        msg: req.user.role + " cant perform this operation",
      });
    }
    next();
  };
};
module.exports = { auth, protected };
