const mongoose = require("mongoose");

const verifyMongoId = function (location) {
    switch (location) {
        default:
            return checkUrlParams;
        case "query":
            return checkQueryParams;
    }
};

const checkQueryParams = function (req, res, next) {
    if (!!req.query.user && !mongoose.isValidObjectId(req.query.user)) {
        return res.status(400).send("User id is invalid");
    }
    next();
};

const checkUrlParams = function (req, res, next) {
    if (!mongoose.isValidObjectId(req.params.id)) {
        return res.status(400).send("Please enter valid id");
    }
    next();
};

module.exports = verifyMongoId;
