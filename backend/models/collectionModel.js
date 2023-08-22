const mongoose = require("mongoose");

const schema = new mongoose.Schema({
    name: {
        type: mongoose.Types.ObjectId,
        required: true,
    },
    tags: {
        type: [String],
        required: false,
    },
});

const Collection = mongoose.model("Collection", schema);
module.exports = Collection;
