const { default: mongoose } = require("mongoose");
const Collection = require("../models/collectionModel");
const User = require("../models/userModel");

const jwt = require("jsonwebtoken");

const postCollection = async (req, res) => {
    const { name, tags } = req.body;
    const { user } = req;

    try {
        const collection = await Collection.create({ name, tags, user: user._id });
        res.status(201).send(collection);
    } catch (error) {
        res.status(400).send(error.message);
    }
};

const deleteCollection = async (req, res) => {
    try {
        const collection = await Collection.findOneAndDelete({ _id: req.params.id });
        res.status(200).send(collection);
    } catch (error) {
        res.status(400).send(error.message);
    }
};

const patchCollection = async (req, res) => {
    try {
        const collection = await Collection.findOneAndUpdate({ _id: req.params.id }, { ...req.body }, { new: true });
        res.status(200).send(collection);
    } catch (error) {
        res.status(400).send(error.message);
    }
};

const getCollection = async (req, res) => {
    try {
        const collection = await Collection.findById(req.params.id);
        res.status(200).send(collection);
    } catch (error) {
        res.status(400).send(error.message);
    }
};

const getAllCollections = async (req, res) => {
    try {
        const collections = await Collection.find({ ...req.query }).setOptions({ sanitizeFilter: true });
        res.status(200).send(collections);
    } catch (error) {
        res.status(400).send(error.message);
    }
};

module.exports = { postCollection, deleteCollection, patchCollection, getAllCollections, getCollection };
