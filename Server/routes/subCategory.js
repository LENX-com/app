  
const express = require("express");
const router = express.Router();

// middlewares
const { auth, protected } = require("../middlewares/verify");

// controller
const { create, read, update, remove, list } = require("../controller/subCategoryController");

// routes
router.post("/sub", auth, protected(1), create);
router.get("/subs", list);
router.get("/sub/:slug", read);
router.put("/sub/:slug", auth, protected(1), update);
router.delete("/sub/:slug", auth, protected(1), remove);


module.exports = router;  