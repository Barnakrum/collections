const mongoose = require("mongoose");

const schema = new mongoose.Schema({
    email: {
        required: true,
        unique: true,
        type: String,
    },
    username: {
        required: true,
        unique: true,
        type: String,
    },
    password: {
        required: true,
        type: String,
    },
    isAdmin: {
        type: Boolean,
        default: false,
    },
});

const User = mongoose.model("User", schema);
module.exports = User;
