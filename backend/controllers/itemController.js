const Item = require("../models/itemModel");
const Collection = require("../models/collectionModel");

const getItem = async (req, res) => {
    try {
        const item = await Item.findById(req.params.id);
        res.status(200).send(item);
    } catch (error) {
        res.status(400).send(error.message);
    }
};

const postItem = async (req, res) => {
    try {
        const { name, description } = req.body;
        const { user } = req;
        const collection = await Collection.findById(req.params.id);

        const item = await Item.create({ name, description, collectionId: collection._id, user: user._id });
        collection.items.unshift(item);
        await collection.save();
        res.status(201).send(item);
    } catch (error) {
        res.status(400).send(error.message);
    }
};

const patchItem = async (req, res) => {
    try {
        const item = await Item.findOneAndUpdate({ _id: req.params.id }, { ...req.body }, { new: true });
        res.status(200).send(item);
    } catch (error) {
        res.status(400).send(error.message);
    }
};
const deleteItem = async (req, res) => {
    try {
        const item = await Item.findOneAndDelete({ _id: req.params.id });
        res.status(200).send(item);
    } catch (error) {
        res.status(400).send(error.message);
    }
};

module.exports = { postItem, deleteItem, patchItem, getItem };
