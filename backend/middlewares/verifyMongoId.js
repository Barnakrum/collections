const mongoose = require("mongoose");

const verifyMongoId = function () {
    return (req, res, next) => {
        if (!mongoose.isValidObjectId(req.params.id)) {
            return res.status(400).send("Please enter valid id");
        }
        next();
    };
};
