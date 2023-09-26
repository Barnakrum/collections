const express = require("express");

const { userLogin, userRegister, userVerifyEmail } = require("../controllers/userController");

const router = express.Router();

router.post("/login", userLogin);

router.post("/register", userRegister);

router.get("/verify/:token/:email", userVerifyEmail);

module.exports = router;
