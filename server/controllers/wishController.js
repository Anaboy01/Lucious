const Wish = require("../models/wishModel");
const Product = require("../models/productModel");
const asyncHandler = require("express-async-handler");

const addToWish = asyncHandler(async (req, res) => {
  const userId = req.user._id;
  const { id } = req.body;

  let wish = await Wish.findOne({ userId });

  const product = await Product.findOne({ id });

  if (!product) {
    res.status(404);
    throw new Error("Product not found");
  }

  if (!wish) {
    wish = new Wish({
      userId,
      wishList: [product]
    });
  } else {
    const existingWishIndex = wish.wishList.findIndex(
      item => item.id === id
    );

    if (existingWishIndex !== -1) {
      res.status(400);
      throw new Error("Already added to wishlist");
    }

    wish.wishList.push(product);
  }

  const savedWish = await wish.save();
  res.status(200).json({
    message: "Item added to Wish List",
    wishList: savedWish
  });
});


const removeFromWish = asyncHandler(async (req, res) => {
  const userId = req.user._id;
  const { id } = req.body;

  const wish = await Wish.findOne({ userId });

  if (!wish) {
    res.status(404);
    throw new Error("Wish List not found");
  }

  const updatedWishList = wish.wishList.filter(item => item.id !== id);

  if (updatedWishList.length === wish.wishList.length) {
    res.status(404);
    throw new Error("Item not found in wish list");
  }

  wish.wishList = updatedWishList;
  const savedWish = await wish.save();

  res.status(200).json({
    message:"item removed from wishlist",
    wishList: savedWish
  });
});

const clearWish = asyncHandler(async (req, res) => {
  const userId = req.user._id;

  const wish = await Wish.findOne({ userId });

  if (!wish) {
    res.status(404);
    throw new Error("Wish not found");
  }

  wish.wishList = [];
  const clearedWish = await wish.save();

  res.status(200).json(clearedWish);
});

const getUserWish = asyncHandler(async (req, res) => {
  const userId = req.user._id;

  const wish = await Wish.findOne({ userId });

  if (!wish) {
    res.status(404);
    throw new Error("Wish not found");
  }

  res.status(200).json(wish);
});

module.exports = {
    addToWish,
    clearWish,
    getUserWish,
    removeFromWish
}