const jwt = require("jsonwebtoken");
const mongoose = require("mongoose");

const User = require("../models/userModel");
const Collection = require("../models/collectionModel");

const authMiddleware = function (resource) {
    return async function (req, res, next) {
        const isThereParamId = !!req.params.id;

        if (!req.cookies.session) {
            return res.status(401).send("Please log in");
        }
        if (isThereParamId && !mongoose.isValidObjectId(req.params.id)) {
            return res.status(400).send("Please enter valid id");
        }
        const userId = jwt.verify(req.cookies.session, process.env.TOKEN_KEY).user_id;
        const user = await User.findById(userId);
        req.user = user;

        if (user.isAdmin) {
            return next();
        }

        let ownerId;
        if (!!resource && isThereParamId) {
            switch (resource) {
                case "collection":
                    const collection = await Collection.findById(req.params.id);
                    ownerId = collection.user;
            }
            if (!ownerId.equals(user._id)) {
                return res.status(403).send("You are not the owner of that");
            }
        }

        next();
    };
};

module.exports = authMiddleware;
