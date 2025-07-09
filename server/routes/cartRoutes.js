const express = require("express");
const { route } = require("./userRoutes");
const { addToCart, removeFromCart, clearCart, getUserCart, incrementCartItemQuantity, decrementCartItemQuantity } = require("../controllers/cartController");
const { protect } = require("../middleware/authMiddleware");

const router = express.Router();

router.post("/addtocart/:id",protect, addToCart)

router.get("/getcart", protect, getUserCart)


router.delete("/removeFromCart",protect, removeFromCart)
router.delete("/clear",protect, clearCart)


router.patch("/add",protect, incrementCartItemQuantity)
router.patch("/reduce",protect, decrementCartItemQuantity)

module.exports = router;