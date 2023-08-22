const mongoose = require("mongoose");

const schema = mongoose.Schema({
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

module.exoprts = Collection;
