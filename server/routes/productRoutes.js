const express = require("express");
const { adminProtect } = require("../middleware/authMiddleware");
const { registerProduct } = require("../controllers/productController");

const router = express.Router();

router.post("/registerProduct", adminProtect, registerProduct)

module.exports = router;