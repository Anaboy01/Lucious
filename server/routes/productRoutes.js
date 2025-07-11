const express = require("express");
const { adminProtect,protect } = require("../middleware/authMiddleware");
const { registerProduct, updateProduct, addProductReview,bulkRegisterProducts,getAProduct,getAllProducts, getProductsByCategory } = require("../controllers/productController");

const router = express.Router();

router.post("/registerProduct", adminProtect, registerProduct)
router.post("/bulkRegister", adminProtect,bulkRegisterProducts)
router.post("/review/:id", protect, addProductReview)


router.get("/getProducts", getAllProducts)
router.get("/:id", getAProduct)
router.get("/categories/:category", getProductsByCategory)


router.put("/updateProduct/:id", adminProtect, updateProduct)

module.exports = router;