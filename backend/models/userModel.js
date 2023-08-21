const mongoose = require("mongoose");

const schema = new mongoose.Schema({
    email: {
        required: true,
        type: string,
    },
    username: {
        required: true,
        type: string,
    },
    password: {
        required: true,
        type: string,
    },
});

const User = mongoose.model("User", schema);
module.exports = User;
