const mongoose = require("mongoose");

const verifyMongoId = function (location) {
    switch (location) {
        default:
            return function (req, res, next) {
                if (!mongoose.isValidObjectId(req.params.id)) {
                    return res.status(400).send("Please enter valid id");
                }
                next();
            };
        case "query":
            return function (req, res, next) {
                if (!!req.query.user && !mongoose.isValidObjectId(req.query.user)) {
                    return res.status(400).send("User id is invalid");
                }
                next();
            };
    }
};

module.exports = verifyMongoId;
