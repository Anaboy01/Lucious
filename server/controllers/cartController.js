const asyncHandler = require("express-async-handler");
const Cart = require("../models/cartModel");
const Product = require("../models/productModel");

const addToCart = asyncHandler(async (req, res) => {
  const userId = req.user._id;
  const { id } = req.params;
  const { size, color, quantity, image } = req.body;

  const product = await Product.findOne({ id: Number(id) }); // or use findById if _id
  if (!product) {
    res.status(404);
    throw new Error("Product not found");
  }

  let cart = await Cart.findOne({ userId });

  // Determine next cartItemId
  let nextItemId = 1;
  if (cart && cart.cartList.length > 0) {
    const lastItem = cart.cartList.reduce((max, item) => {
      return item.cartItemId > max ? item.cartItemId : max;
    }, 0);
    nextItemId = lastItem + 1;
  }

  const newCartItem = {
    cartItemId: nextItemId,
    productId: product.id,
    name: product.name,
    price: product.price,
    originalPrice: product.originalPrice,
    image,
    color,
    size,
    quantity,
  };

  if (!cart) {
    cart = new Cart({
      userId,
      cartList: [newCartItem],
    });
  } else {
    cart.cartList.push(newCartItem);
  }

  const savedCart = await cart.save();

  res.status(200).json({
    message: "Item added to cart",
    cart: savedCart,
  });
});



const removeFromCart = asyncHandler(async (req, res) => {
  const userId = req.user._id;
  const { id } = req.body;
  console.log(id)

  const cart = await Cart.findOne({ userId });
  console.log(cart);

  if (!cart) {
    res.status(404);
    throw new Error("Cart not found");
  }

  const updatedCartList = cart.cartList.filter(item => item.cartItemId !== id);

  if (updatedCartList.length === cart.cartList.length) {
    res.status(404);
    throw new Error("Item not found in cart");
  }

  cart.cartList = updatedCartList;
  const savedCart = await cart.save();

  res.status(200).json({
     message: "Cart Cleard",
    cart: savedCart,
  });
});

const clearCart = asyncHandler(async (req, res) => {
  const userId = req.user._id;

  const cart = await Cart.findOne({ userId });

  if (!cart) {
    res.status(404);
    throw new Error("Cart not found");
  }

  cart.cartList = [];
  const clearedCart = await cart.save();

  res.status(200).json({
    message: "Cart Cleard",
    cart: clearedCart,
  });
});

const getUserCart = asyncHandler(async (req, res) => {
  const userId = req.user._id;

  const cart = await Cart.findOne({ userId });

  if (!cart) {
    res.status(404);
    throw new Error("Cart not found");
  }

  res.status(200).json(cart);
});

module.exports = {
    addToCart,
    removeFromCart,
    clearCart,
    getUserCart
}
