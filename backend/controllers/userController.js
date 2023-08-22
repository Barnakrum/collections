const User = require("../models/userModel");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

const userLogin = (req, res) => {
    res.send("login route");
};

const userRegister = async (req, res) => {
    try {
        const { username, email, password } = req.body;

        if (!(username && email && password)) {
            return res.status(400).send("Please fill all fields");
        }

        const collidingEmail = await User.findOne({ email });
        const collidingUsername = await User.findOne({ username });
        if (!!collidingEmail) {
            return res.status(400).send("User with that email already exists");
        }
        if (!!collidingUsername) {
            return res.status(400).send("User with that username already exists");
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        const user = await User.create({ username, email, password: hashedPassword });

        const token = jwt.sign({ user_id: user._id, email }, process.env.TOKEN_KEY, { expiresIn: "1d" });

        res.status(201).cookie("session", token, { secure: true, httpOnly: true, sameSite: "strict" }).send({ username });
    } catch (error) {
        res.status(400).send(error.message);
    }
};

module.exports = { userLogin, userRegister };
