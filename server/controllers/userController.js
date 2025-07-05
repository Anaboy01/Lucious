const asyncHandler = require("express-async-handler");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { generateToken } = require("../utils");
const User = require("../models/userModel");


const registerUser = asyncHandler(async (req, res) => {
     const { name, email, password } = req.body;

     // validate input
     if (!name || !email || !password) {
        res.status(400);
        throw new Error("All fields are required");
     }

     if (password.length < 6) {
        throw new Error("Password must be at least 6 characters");
     }

     // check if user exists
     const userExist = await User.findOne({ email });

     if (userExist) {
        res.status(400);
        throw new Error("Email already in use");
     }

     // hash the password
     const salt = await bcrypt.genSalt(10);
     const hashedPassword = await bcrypt.hash(password, salt);

     // create the user
     const user = await User.create({
        name,
        email,
        password: hashedPassword,
     });

     const token = generateToken(user._id);

     // send http-only cookie
     res.cookie('token', token, {
          path: '/',
          httpOnly: true,
          expires: new Date(Date.now() + 1000 * 86400), // 1 day
          sameSite: 'none',
          secure: true,
     });

     if (user) {
          const { _id, name, email } = user;
          res.status(201).json({
            message: "registration successful",
            data:{
               _id,
            name,
            email,
            }
          });
     } else {
          res.status(400);
          throw new Error('Invalid user data');
     }
});


const registerAdmin = asyncHandler(async (req, res) => {
     const { name, email, password } = req.body;

     // validate input
     if (!name || !email || !password) {
        res.status(400);
        throw new Error("All fields are required");
     }

     if (password.length < 6) {
        throw new Error("Password must be at least 6 characters");
     }

     // check if user exists
     const userExist = await User.findOne({ email });

     if (userExist) {
        res.status(400);
        throw new Error("Email already in use");
     }

     // hash the password
     const salt = await bcrypt.genSalt(10);
     const hashedPassword = await bcrypt.hash(password, salt);

     // create the user
     const user = await User.create({
        name,
        email,
        password: hashedPassword,
        isAdmin: true
     });

     const token = generateToken(user._id);

     // send http-only cookie
     res.cookie('token', token, {
          path: '/',
          httpOnly: true,
          expires: new Date(Date.now() + 1000 * 86400), // 1 day
          sameSite: 'none',
          secure: true,
     });

     if (user) {
          const { _id, name, email, isAdmin} = user;
          res.status(201).json({
            message: "admin registered",
          data:{
              _id,
            name,
            email,
            isAdmin,
          }
          });
     } else {
          res.status(400);
          throw new Error('Invalid user data');
     }
});

const loginUser = asyncHandler(async (req, res) => {
    const { email, password } = req.body;

 

    
    if (!email || !password) {
        res.status(400);
        throw new Error("Email and password are required");
    }

    
    const user = await User.findOne({ email });

    

    if (!user) {
        res.status(400);
        throw new Error("Invalid credentials");
    }

    // Compare password
    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
        res.status(401);
        throw new Error("Invalid email or password");
    }

    // Generate token
    const token = generateToken(user._id);

    // Send HTTP-only cookie
    res.cookie('token', token, {
        path: '/',
        httpOnly: true,
        expires: new Date(Date.now() + 1000 * 86400), // 1 day
        sameSite: 'none',
        secure: true,
    });

    // Send user data
    const { _id, name, isAdmin} = user;
    res.status(200).json({
      message:"Login Successful",
        data: {
         _id,
        name,
        email,
        isAdmin,
        }
    });
});

const logout = asyncHandler (async (req, res)=> { 
      res.cookie('token', '',{
            path:'/',
            httpOnly: true,
            expires: new Date(0), 
            sameSite: 'none',
            secure: true,
      });
      return res.status(200).json ({message: 'Logout successful'})
})

const loginStatus = asyncHandler(async (req, res) => {
  const token = req.cookies.token;
  if (!token) {
    return res.json(false);
  }



  const verified = jwt.verify(token, process.env.JWT_SECRET);

  if (verified) {
    return res.json(true);
  }

  return res.json(false);
});

const getUserProfile = asyncHandler(async (req, res) => {
  const user = await User.findById(req.user._id).select("-password");

  if (!user) {
    res.status(404);
    throw new Error("User not found");
  }

  res.status(200).json(user);
});

const getCustomers = asyncHandler(async (req, res) => {
 const users = await User.find({
    $or: [
      { isAdmin: { $exists: false } }, // users without isAdmin
      { isAdmin: false }               // users with isAdmin set to false
    ]
  }).select("-password");

  if (!users || users.length === 0) {
    return res.status(404).json({ message: "No non-admin users found" });
  }

  res.status(200).json(users);
});




module.exports = {
    registerUser,
     loginUser,
    logout,
    registerAdmin,
    loginStatus,
    getUserProfile,
    getCustomers
}