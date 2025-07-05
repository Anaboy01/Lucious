const mongoose = require('mongoose');



const orderSchema = new mongoose.Schema({
    user:{
        type: Object,
    },
    amount_paid:{
        type: Number,
    },
    cartList:{
        type: Array,
        default: []
    },
    status:{
        type: String,
        enum: ["pending", "processing", "shipped", "delivered","cancelled"],
        default: "pending",
    },
    orderDate:{
        type: Date,
    },

})

module.exports = mongoose.model("Order", orderSchema)