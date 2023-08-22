const mongoose = require("mongoose");

const schema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    tags: {
        type: [String],
        required: false,
    },
});

const Collection = mongoose.model("Collection", schema);
module.exports = Collection;
