const express = require("express");
const auth = require("../middlewares/auth");
const verifyMongoId = require("../middlewares/verifyMongoId");

const path = require("path");
const multer = require("multer");
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, "imagesForUpload/");
    },
    filename: function (req, file, cb) {
        cb(null, req.params.id + path.extname(file.originalname));
    },
});
const upload = multer({ storage: storage });

const { postCollection, getAllCollections, getCollection, patchCollection, deleteCollection, postCollectionImage } = require("../controllers/collectionController");

const router = express.Router();

router.get("/", verifyMongoId("query"), getAllCollections);
router.get("/:id", verifyMongoId(), getCollection);

router.post("/", auth("collection"), postCollection);
router.post("/:id/image", verifyMongoId(), auth("collection"), upload.single("image"), postCollectionImage);

router.delete("/:id", verifyMongoId(), auth("collection"), deleteCollection);

router.patch("/:id", verifyMongoId(), auth("collection"), patchCollection);

module.exports = router;
