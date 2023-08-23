const express = require("express");
const auth = require("../middlewares/auth");

const { postCollection, getAllCollections, getCollection, patchCollection, deleteCollection } = require("../controllers/collectionController");

const router = express.Router();

router.get("/", getAllCollections);
router.get("/:id", getCollection);

router.post("/", auth("collection"), postCollection);

router.delete("/:id", auth("collection"), deleteCollection);

router.patch("/:id", auth("collection"), patchCollection);

module.exports = router;
