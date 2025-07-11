const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
   email: {
        type: String,
        required: [true, "Please add an email"],
        trim: true,
    },
    isAdmin: {
        type: Boolean,
    },
    password: {
        type: String,
        required: [true, "Please add a password"],
    },
    name: {
        type: String,
        required: true,
    },
    phoneNo: {
        type: String,
        required: true
    }
});

module.exports = mongoose.models.User || mongoose.model('User', userSchema);
