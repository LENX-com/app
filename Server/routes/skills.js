const express = require("express");
const router = express.Router();

// middlewares
const { auth, protected } = require("../middlewares/verify");

// controller
const { create, read, update, remove, list } = require("../controller/skills.controller");

// routes
router.post("/skill", auth, protected(1), create);
router.get("/skills", list);
router.get("/skill/:slug", read);
router.put("/skill/:slug", auth, protected(1), update);
router.delete("/skill/:slug", auth, protected(1), remove);


module.exports = router;    