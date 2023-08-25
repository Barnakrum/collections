const express = require("express");
const auth = require("../middlewares/auth");
const verifyMongoId = require("../middlewares/verifyMongoId");

const { postCollection, getAllCollections, getCollection, patchCollection, deleteCollection } = require("../controllers/collectionController");

const router = express.Router();

router.get("/", verifyMongoId("query"), getAllCollections);
router.get("/:id", verifyMongoId(), getCollection);

router.post("/", auth("collection"), postCollection);

router.delete("/:id", verifyMongoId(), auth("collection"), deleteCollection);

router.patch("/:id", verifyMongoId(), auth("collection"), patchCollection);

module.exports = router;
