const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");

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
    isEmailVerifed: {
        type: Boolean,
        default: false,
    },
    isAdmin: {
        type: Boolean,
        default: false,
    },
});

schema.statics.signJwt = function (user) {
    const token = jwt.sign({ user_id: user._id, email: user.email, isAdmin: user.isAdmin }, process.env.TOKEN_KEY, { expiresIn: "1d" });
    return token;
};

const User = mongoose.model("User", schema);
module.exports = User;
