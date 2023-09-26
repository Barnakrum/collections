const mongoose = require("mongoose");

const verifyMongoId = function (location) {
    switch (location) {
        default:
            return checkUrlParams;
        case "query":
            return checkQueryParams;
        case "both":
            return checkBoth;
    }
};

const checkQueryParams = function (req, res, next) {
    if (!!req.query.user && !mongoose.isValidObjectId(req.query.user)) {
        return res.status(400).send({ message: "User id is invalid" });
    }
    next();
};

const checkUrlParams = function (req, res, next) {
    if (!mongoose.isValidObjectId(req.params.id)) {
        return res.status(400).send({ message: "Please enter valid id" });
    }
    next();
};

const checkBoth = function (req, res, next) {
    checkQueryParams(req, res, () => {});
    checkUrlParams(req, res, next);
};

module.exports = verifyMongoId;
