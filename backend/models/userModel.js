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
});

const User = mongoose.model("User", schema);
module.exports = User;
