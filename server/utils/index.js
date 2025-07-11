const jwt = require("jsonwebtoken");
const Product = require("../models/productModel");
const nodemailer = require("nodemailer");

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


const sendEmail =  async (mailOptions) => {
  const trasporter = await nodemailer.createTransport({
    service: "gmail",
    auth:{
      user:process.env.EMAIL_USER,
      pass:process.env.EMAIL_PASS,
    }
  })

  try {
    await trasporter.sendMail(mailOptions);
    console.log("Email sent Successfully");
  } catch (error) {
    console.log("Error sending mail:", error);
  }

}
module.exports = {
  generateToken,
  genrateUniqueId,
  sendEmail
};
