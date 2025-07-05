const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const cookieParser = require("cookie-parser");
const userRoutes = require("./routes/userRoutes");
const productRoutes = require("./routes/productRoutes");
const cartRoutes = require("./routes/cartRoutes");
const wishRoutes = require("./routes/wishRoutes");
const orderRoutes = require("./routes/orderRoutes");
// const cors = require("cors");

dotenv.config();
const app = express();

// Enable CORS for all origins
// app.use(cors({
//   origin: 'http://localhost:5173',
//   credentials: true
// }));

// Middlewares
app.use(express.json());
app.use(cookieParser());
app.use(express.urlencoded({ extended: true }));

// Routes
app.use('/api/users', userRoutes);
app.use('/api/products', productRoutes);
app.use('/api/cart', cartRoutes);
app.use('/api/wish', wishRoutes);
app.use('/api/order', orderRoutes);



// Database connection & server start
mongoose.connect(process.env.MONGO_URI).then(() => {
    console.log('MongoDB connected');
    app.listen(process.env.PORT, () => {
        console.log(`Server running on port ${process.env.PORT}`);
    });
}).catch(err => console.error(err));
