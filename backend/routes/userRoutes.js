const express = require("express");

const { userLogin, userRegister, userVerifyEmail, getRefreshToken, userLogout } = require("../controllers/userController");

const router = express.Router();

router.post("/login", userLogin);

router.get("/logout", userLogout);

router.post("/register", userRegister);

router.get("/verify/:token/:email", userVerifyEmail);

router.get("/get-refresh-token", getRefreshToken);

module.exports = router;
