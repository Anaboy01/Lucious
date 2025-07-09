const Product = require("../models/productModel");
const asyncHandler = require("express-async-handler");
const { genrateUniqueId } = require("../utils");
const User = require("../models/userModel");

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

const updateProduct = asyncHandler(async (req, res) => {
  const product = await Product.findOne({ id: req.params.id });

  if (!product) {
    res.status(404);
    throw new Error("Product not found");
  }

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
    sizes,
  } = req.body;

  const totalStock = sizes
    ? sizes.reduce((acc, curr) => {
        const amount = Number(curr.amountOfSiize);
        return acc + (isNaN(amount) ? 0 : amount);
      }, 0)
    : product.stock;

  product.name = name || product.name;
  product.price = price || product.price;
  product.originalPrice = originalPrice || product.originalPrice;
  product.images = images || product.images;
  product.coverImage = coverImage || product.coverImage;
  product.category = category || product.category;
  product.rating = rating || product.rating;
  product.description = description || product.description;
  product.features = features || product.features;
  product.colors = colors || product.colors;
  product.sizes = sizes || product.sizes;
  product.stock = totalStock;

  const updatedProduct = await product.save();

  res.status(200).json({
    message: "Product updated successfully",
    product: updatedProduct,
  });
});

const bulkRegisterProducts = asyncHandler(async (req, res) => {
  const { products } = req.body;


  if (!products || !Array.isArray(products) || products.length === 0) {
    res.status(400);
    throw new Error("No products provided for bulk registration");
  }

  const preparedProducts = [];

  const latestProduct = await Product.findOne().sort({ id: -1 }).lean();
  let newId = latestProduct?.id && !isNaN(latestProduct.id) ? parseInt(latestProduct.id) : 1000;

  for (const p of products) {
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
      sizes,
    } = p;

    if (!name || !price || !category || !description || !sizes || sizes.length === 0) {
      continue; // Skip invalid product
    }

    const existing = await Product.findOne({ name: { $regex: `^${name}$`, $options: "i" } });
    if (existing) {
      continue; // Skip duplicates
    }

    const stock = sizes.reduce((acc, curr) => {
      const amount = Number(curr.amountOfSiize);
      return acc + (isNaN(amount) ? 0 : amount);
    }, 0);

    newId += 1;

    preparedProducts.push({
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
      stock,
      dateAdded: new Date(),
    });
  }

  if (preparedProducts.length === 0) {
    res.status(400);
    throw new Error("No valid or unique products to register");
  }

  const inserted = await Product.insertMany(preparedProducts);

  res.status(201).json({
    message: `${inserted.length} product(s) registered successfully`,
    products: inserted,
  });
});

const getAllProducts = asyncHandler(async (req, res) => {
    const products = await Product.find()

    if(!products){
        res.status(500)
        throw new Error("Something went wrong")

    }

    res.status(200).json(products)
})


const getAProduct = asyncHandler(async (req, res) => {
    const {id} = req.params
    const product = await Product.findOne({id})

    if(product){
      res.status(200).json(product)
    }else{
       res.status(400).json({
        message: "Product not found"
       })
        throw new Error("Product not found")
    }

})

const addProductReview = asyncHandler(async (req, res) => {
  const user = req.user
  const {id} = req.params
  const {review}= req.body

  
  if (!review) {
    res.status(400);
    throw new Error("Required review fields are missing");
  }


  const product = await Product.findOne({id});
  if (!product) {
    res.status(404);
    throw new Error("Product not found");
  }


const alreadyReviewed = product.reviews.find(
  (r) => r.userId.toString() === user._id.toString()
);
if (alreadyReviewed) {
  res.status(400);
  throw new Error("You have already reviewed this product");
}


  product.reviews.push({
    userId: user._id,
    userName: user.name,
    review: review.trim(),
  });

  await product.save();

  res.status(201).json({
    message: "Review added successfully",
    reviews: product.reviews,
  });
});

const getProductsByCategory = asyncHandler(async (req, res) => {
  const { category } = req.params;

  if (!category) {
    res.status(400);
    throw new Error("Category parameter is required");
  }

  const products = await Product.find({
    category: { $regex: new RegExp(`^${category}$`, "i") },
  });

  if (!products || products.length === 0) {
    res.status(404);
    throw new Error(`No products found in category: ${category}`);
  }

  res.status(200).json(products);
});





module.exports = { registerProduct, updateProduct, bulkRegisterProducts, getAllProducts, getAProduct,addProductReview, getProductsByCategory };
