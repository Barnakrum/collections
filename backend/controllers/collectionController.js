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

const postCollectionImage = async (req, res) => {
    try {
        const collection = await Collection.findById({ _id: req.params.id });
        const imagePath = "./imagesForUpload/" + collection._id + req.fileExtension;

        if (!!collection.imageUrl) cloudinary.uploader.destroy(collection._id);
        const result = await cloudinary.uploader.upload(imagePath, { public_id: collection._id });
        collection.imageUrl = result.secure_url;

        await fs.promises.unlink(imagePath);

        await collection.save();
        res.status(200).send(collection);
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

module.exports = { postCollection, deleteCollection, patchCollection, getAllCollections, getCollection, postCollectionImage };
