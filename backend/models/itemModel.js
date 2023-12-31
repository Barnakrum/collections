const mongoose = require("mongoose");

const User = require("../models/userModel");

const schema = mongoose.Schema({
    name: {
        type: String,
        required: true,
        unique: false,
    },
    description: {
        type: String,
        required: true,
        unique: false,
    },
    user: {
        type: mongoose.Types.ObjectId,
        ref: User,
    },
    collectionId: {
        type: mongoose.Types.ObjectId,
        ref: "Collection",
    },
    stringFields: {
        type: [String],
    },
    numberFields: {
        type: [Number],
    },
    dateFields: {
        type: [Date],
    },
    booleanFields: {
        type: [Boolean],
    },
    colorFields: {
        type: [String],
    },
});

const Item = mongoose.model("Item", schema);

module.exports = Item;
