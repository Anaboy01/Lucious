const asyncHandler = require("express-async-handler");
const Cart = require("../models/cartModel");
const Order = require("../models/orderModel");
const Product = require("../models/productModel");

const placeOrder = asyncHandler(async (req, res) => {
  const user = req.user;

  const cart = await Cart.findOne({ userId: user._id });
  if (!cart || cart.cartList.length === 0) {
    res.status(400);
    throw new Error("Your cart is empty");
  }

  const cartList = cart.cartList;

 
  for (const item of cartList) {
    const product = await Product.findOne({ id: item.productId });
    if (!product) {
      res.status(404);
      throw new Error(`Product ${item.name} not found`);
    }

    const sizeEntry = product.sizes.find((s) => s.size === item.size);
    if (!sizeEntry) {
      res.status(400);
      throw new Error(`Size ${item.size} not available for product ${item.name}`);
    }

    if (sizeEntry.amountOfSiize < item.quantity) {
      res.status(400);
      throw new Error(`Insufficient stock for ${item.name} - Size ${item.size}`);
    }


    sizeEntry.amountOfSiize -= item.quantity;

  
    const totalStock = product.sizes.reduce((sum, s) => sum + s.amountOfSiize, 0);
    product.stock = totalStock;
    if (totalStock === 0) {
      product.status = "out_of_stock";
    } else if (totalStock < 10) {
      product.status = "low_stock";
    } else {
      product.status = "in_stock";
    }

    await product.save();
  }

  const amount_paid = cartList.reduce((acc, item) => acc + item.price * item.quantity, 0);

  const newOrder = new Order({
    user: {
      name: user.name,
      email: user.email,
      id: user._id,
    },
    cartList,
    amount_paid,
    orderDate: Date.now(),
  });

  const savedOrder = await newOrder.save();


  cart.cartList = [];
  await cart.save();

  res.status(201).json(savedOrder);
});

const getAllUserOrders = asyncHandler(async (req, res) => {
  const userId = req.user._id

  const orders = await Order.find({ "user.id": userId });

  if (!orders || orders.length === 0) {
    return res.status(404).json({ message: "No orders found for this user" });
  }

  res.status(200).json(orders);
});


const getOrderById = asyncHandler(async (req, res) => {
  const orderId = req.params.id;

  const order = await Order.findById(orderId);

  if (!order) {
    res.status(404);
    throw new Error("Order not found");
  }

  res.status(200).json(order);
});

const getAllOrders = asyncHandler(async (req, res) => {
    const orders = await Order.find()

    if(!orders){
        res.status(500)
        throw new Error("Something went wrong")

    }

    res.status(200).json(orders)
})

const updateOrderStatus = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const { status } = req.body;

  if (!status) {
    res.status(400);
    throw new Error("Status is required");
  }

  const order = await Order.findById(id);
  if (!order) {
    res.status(404);
    throw new Error("Order not found");
  }


  if (order.status === "cancelled") {
    return res.status(400).json({ message: "Order is already cancelled" });
  }

    if (order.status === "delivered") {
    return res.status(400).json({ message: "Order is already delivered" });
  }


  if (status === "cancelled") {
    for (const item of order.cartList) {
      const product = await Product.findOne({ name: item.name });
      if (!product) continue;

      const sizeEntry = product.sizes.find((s) => s.size === item.size);
      if (sizeEntry) {
        sizeEntry.amountOfSiize += item.quantity;
      }


      const totalStock = product.sizes.reduce((sum, s) => sum + s.amountOfSiize, 0);
      product.stock = totalStock;

      
      if (totalStock === 0) {
        product.status = "out_of_stock";
      } else if (totalStock < 10) {
        product.status = "low_stock";
      } else {
        product.status = "in_stock";
      }

      await product.save();
    }
  }


  order.status = status;
  await order.save();

  res.status(200).json({ message: "Order status updated", order });
});


module.exports = {
  placeOrder,
  getAllUserOrders,
  getOrderById,
  getAllOrders,
  updateOrderStatus

};
