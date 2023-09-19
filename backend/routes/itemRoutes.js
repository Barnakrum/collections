const express = require("express");

const router = express.Router();

const auth = require("../middlewares/auth");
const verifyMongoId = require("../middlewares/verifyMongoId");

const { getItem, deleteItem, postItem, patchItem } = require("../controllers/itemController");

//item id
router.get("/:id", verifyMongoId(), getItem);

//item id
router.delete("/:id", verifyMongoId(), deleteItem);

//collection id
router.post("/:id", verifyMongoId(), auth("collection"), postItem);

//item id
router.patch("/:id", verifyMongoId(), patchItem);

module.exports = router;
