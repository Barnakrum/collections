const mongoose = require("mongoose");
const User = require("../models/userModel");
const Item = require("../models/itemModel");

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
    items: {
        type: [mongoose.Types.ObjectId],
        required: false,
        ref: Item,
    },
    stringFieldsNames: {
        type: [String],
    },
    numberFieldsNames: {
        type: [String],
    },
    dateFieldsNames: {
        type: [String],
    },
    booleanFieldsNames: {
        type: [String],
    },
    colorFieldsNames: {
        type: [String],
    },
});

const Collection = mongoose.model("Collection", schema);
module.exports = Collection;
