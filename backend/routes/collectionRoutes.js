const express = require("express");
const auth = require("../middlewares/auth");
const verifyMongoId = require("../middlewares/verifyMongoId");

const path = require("path");
const multer = require("multer");
const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

const { postCollection, getAllCollections, getCollection, patchCollection, deleteCollection, postCollectionImage, deleteCollectionImage } = require("../controllers/collectionController");

const router = express.Router();

router.get("/", verifyMongoId("query"), getAllCollections);
router.get("/:id", verifyMongoId(), getCollection);

router.post("/", auth("collection"), postCollection);
router.post("/:id/image", verifyMongoId(), auth("collection"), upload.single("image"), postCollectionImage);

router.delete("/:id", verifyMongoId(), auth("collection"), deleteCollection);
router.delete("/:id/image", verifyMongoId(), auth("collection"), deleteCollectionImage);

router.patch("/:id", verifyMongoId(), auth("collection"), patchCollection);

module.exports = router;
