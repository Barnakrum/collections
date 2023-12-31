const { default: mongoose } = require("mongoose");
const jwt = require("jsonwebtoken");
const cloudinary = require("cloudinary").v2;
const fs = require("fs");

//This is needed for cloudinary, otherwise it doesn't access the .env variables. I don't know why this happens because they are still avaiable for console.log
const dotenv = require("dotenv");
dotenv.config();
//======================================================
cloudinary.config({
    cloud_name: "dggllsmjp",
    api_key: "223753184872267",
    api_secret: process.env.CLOUDINARY_API_SECRET,
});

const Collection = require("../models/collectionModel");
const User = require("../models/userModel");
const Item = require("../models/itemModel");

const postCollection = async (req, res) => {
    const { name, tags, stringFieldsNames, numberFieldsNames, dateFieldsNames, booleanFieldsNames, colorFieldsNames } = req.body;
    const { user } = req;
    if (!name) {
        return res.status(400).send({ message: "Please provide name for your collection" });
    }

    try {
        const collection = await Collection.create({ name, tags, user: user._id, stringFieldsNames, numberFieldsNames, dateFieldsNames, booleanFieldsNames, colorFieldsNames });
        res.status(201).send(collection);
    } catch (error) {
        res.status(400).send({ message: error.message });
    }
};

const postCollectionImage = async (req, res) => {
    try {
        const collection = await Collection.findById({ _id: req.params.id });

        const b64 = Buffer.from(req.file.buffer).toString("base64");
        let dataURI = "data:" + req.file.mimetype + ";base64," + b64;

        if (!!collection.imageUrl) cloudinary.uploader.destroy(collection._id);
        const result = await cloudinary.uploader.upload(dataURI, { public_id: collection._id, width: 1280, height: 720, crop: "scale" });
        collection.imageUrl = result.secure_url;

        await collection.save();

        res.status(200).send(collection);
    } catch (error) {
        res.status(400).send({ message: error.message });
    }
};

const deleteCollectionImage = async (req, res) => {
    try {
        const collection = await Collection.findById(req.params.id);
        await cloudinary.uploader.destroy(collection._id);
        collection.imageUrl = null;
        await collection.save();
        collection.imageUrl = process.env.PLACEHOLDER_IMAGE_URL;
        res.status(200).send(collection);
    } catch (error) {
        res.status(400).send({ message: error.message });
    }
};

const deleteCollection = async (req, res) => {
    try {
        const collection = await Collection.findOneAndDelete({ _id: req.params.id });
        if (!!collection.imageUrl && !collection.imageUrl.includes("placeholder")) {
            await cloudinary.uploader.destroy(collection._id);
            collection.imageUrl = "removed";
        }
        for (let i = 0; i < collection.items.length; i++) {
            await Item.findOneAndDelete(collection.items[i]._id);
        }
        res.status(200).send(collection);
    } catch (error) {
        res.status(400).send({ message: error.message });
    }
};

const patchCollection = async (req, res) => {
    try {
        const collection = await Collection.findOneAndUpdate({ _id: req.params.id }, { ...req.body }, { new: true });
        res.status(200).send(collection);
    } catch (error) {
        res.status(400).send({ message: error.message });
    }
};

const getCollection = async (req, res) => {
    try {
        const collection = await Collection.findById(req.params.id);
        if (!collection) {
            return res.status(400).send({ message: "There is no collection with that id" });
        }
        if (!collection.imageUrl) {
            collection.imageUrl = process.env.PLACEHOLDER_IMAGE_URL;
        }
        res.status(200).send(collection);
    } catch (error) {
        res.status(400).send({ message: error.message });
    }
};

const getAllCollections = async (req, res) => {
    try {
        const collections = await Collection.find({ ...req.query }).setOptions({ sanitizeFilter: true });
        for (let i = 0; i < collections.length; i++) {
            if (!collections[i].imageUrl) {
                collections[i].imageUrl = process.env.PLACEHOLDER_IMAGE_URL;
            }
        }

        res.status(200).send(collections);
    } catch (error) {
        res.status(400).send({ message: error.message });
    }
};

module.exports = { postCollection, deleteCollection, patchCollection, getAllCollections, getCollection, postCollectionImage, deleteCollectionImage };
