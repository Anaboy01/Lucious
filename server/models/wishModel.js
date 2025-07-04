const mongoose = require('mongoose');



const wishSchema = new mongoose.Schema({
    userId:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
        unique: true
    },
    wishList:{
        type: Array,
        default: []
    }
})

module.exports = mongoose.model("Wish", wishSchema)