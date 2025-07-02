const Product = require("../models/productModel");
const asyncHandler = require("express-async-handler");
const { genrateUniqueId } = require("../utils");

// @desc    Register a new product
// @route   POST /api/product/register
// @access  Private/Admin
const registerProduct = asyncHandler(async (req, res) => {
  const {
    name,
    price,
    originalPrice,
    images,
    coverImage,
    category,
    rating,
    description,
    features,
    colors,
    sizes, // expecting array with numeric amountOfSiize
  } = req.body;

  // Validate required fields
  if (!name || !price || !category || !description || !sizes || sizes.length === 0) {
    res.status(400);
    throw new Error("Required fields missing or sizes not provided");
  }

  // Check for duplicate product name (case-insensitive)
  const existingProduct = await Product.findOne({
    name: { $regex: `^${name}$`, $options: "i" },
  });
  if (existingProduct) {
    res.status(409);
    throw new Error("Product name already exists");
  }

  // Calculate total stock from sizes
  const totalStock = sizes.reduce((acc, curr) => {
    const amount = Number(curr.amountOfSiize);
    return acc + (isNaN(amount) ? 0 : amount);
  }, 0);

  const newId = await genrateUniqueId();

  const product = new Product({
    id: newId,
    name: name.trim(),
    price,
    rating,
    originalPrice,
    images,
    coverImage,
    category,
    description,
    features,
    colors,
    sizes,
    stock: totalStock,
    dateAdded: new Date(),
  });

  const savedProduct = await product.save();

  res.status(201).json({
    message: "Product created successfully",
    product: savedProduct,
  });
});

module.exports = { registerProduct };
