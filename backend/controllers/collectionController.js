const Collection = require("../models/collectionModel");
const User = require("../models/userModel");

const jwt = require("jsonwebtoken");

const postCollection = async (req, res) => {
    const { name, tags } = req.body;
    const user = await User.findById(jwt.verify(req.cookies.session, process.env.TOKEN_KEY).user_id);

    try {
        const collection = await Collection.create({ name, tags, user: user._id });
        res.status(201).send(collection);
    } catch (error) {
        res.status(400).send(error.message);
    }
};

module.exports = { postCollection };
