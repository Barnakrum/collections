const mongoose = require("mongoose");
const User = require("../models/userModel");

const schema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    tags: {
        type: [String],
        required: false,
    },
    imageUrl: {
        type: String,
        required: false,
    },
    user: {
        type: mongoose.Types.ObjectId,
        required: true,
        ref: User,
    },
});

const Collection = mongoose.model("Collection", schema);
module.exports = Collection;
