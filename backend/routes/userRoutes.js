const express = require("express");

const { userLogin, userRegister, userVerifyEmail, getRefreshToken, userLogout, getUser } = require("../controllers/userController");
const verifyMongoId = require("../middlewares/verifyMongoId");

const router = express.Router();

router.post("/login", userLogin);

router.get("/logout", userLogout);

router.post("/register", userRegister);

router.get("/verify/:token/:email", userVerifyEmail);

router.get("/get-refresh-token", getRefreshToken);

router.get("/:id", verifyMongoId(), getUser);

module.exports = router;
