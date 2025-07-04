const express = require("express");
const { route } = require("./userRoutes");
const { addToCart, removeFromCart, clearCart, getUserCart } = require("../controllers/cartController");
const { protect } = require("../middleware/authMiddleware");

const router = express.Router();

router.post("/addtocart/:id",protect, addToCart)

router.get("/getcart", protect, getUserCart)


router.delete("/removeFromCart/:id",protect, removeFromCart)
router.delete("/clear",protect, clearCart)

module.exports = router;