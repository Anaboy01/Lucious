const jwt = require("jsonwebtoken");
const Product = require("../models/productModel");

const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: "1d" });
};

const genrateUniqueId = async () => {
  const latestProduct = await Product.findOne().sort({ id: -1 }).lean();

  let newId = 1000;
  if (latestProduct && !isNaN(latestProduct.id)) {
    newId = parseInt(latestProduct.id) + 1;
  }
  return newId; // return as number
};

module.exports = {
  generateToken,
  genrateUniqueId
};
