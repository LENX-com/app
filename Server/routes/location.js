const express = require("express");
const router = express.Router();

// middlewares
const { auth, protected } = require("../middlewares/verify");

// controller
const { create, update, remove, list } = require("../controller/locationController");

// routes
router.post("/location", auth, protected(1), create);
router.get("/locations", list);
// router.get("/location/:slug", read);
router.put("/location/:slug", auth, protected(1), update);
router.delete("/location/:slug", auth, protected(1), remove);


module.exports = router;    