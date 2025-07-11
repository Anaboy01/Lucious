const express = require("express");

const { protect, adminProtect } = require("../middleware/authMiddleware");
const { placeOrder, getAllUserOrders,getAllOrders,getOrderById, updateOrderStatus } = require("../controllers/orderController");
const router = express.Router();

router.post("/", protect,placeOrder)

router.get("/getUserOrder", protect,getAllUserOrders)
router.get("/getOrder/:id", protect,getOrderById)
router.get("/adminOrders", adminProtect, getAllOrders)

router.put("/updateStatus/:id", adminProtect, updateOrderStatus)

module.exports = router;