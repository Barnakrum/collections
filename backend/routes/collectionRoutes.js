const express = require("express");

const { postCollection } = require("../controllers/collectionController");

const router = express.Router();

router.post("/", postCollection);

module.exports = router;
