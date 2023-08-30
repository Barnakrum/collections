const express = require("express");

const router = express.Router();

const auth = require("../middlewares/auth");
const verifyMongoId = require("../middlewares/verifyMongoId");

const { getItem, deleteItem, postItem, patchItem } = require("../controllers/itemController");

router.get("/:id", verifyMongoId(), getItem);

router.delete("/:id", verifyMongoId(), deleteItem);

router.post("/:id", verifyMongoId(), auth("collection"), postItem);

router.patch("/:id", verifyMongoId(), patchItem);

module.exports = router;
