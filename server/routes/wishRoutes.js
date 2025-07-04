const express = require("express");
const { protect } = require("../middleware/authMiddleware");
const { addToWish, clearWish,getUserWish,removeFromWish } = require("../controllers/wishController");


const router = express.Router();

router.post("/add", protect, addToWish)

router.delete("/removeWish", protect, removeFromWish)
router.delete("/clear", protect, clearWish)


router.get("/", protect, getUserWish)


module.exports = router;
