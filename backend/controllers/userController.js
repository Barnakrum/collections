const User = require("../models/userModel");
const bcrypt = require("bcrypt");

async function userLogin(req, res) {
    try {
        const { email, password } = req.body;

        if (!(email && password)) {
            return res.status(400).send("Please fill all fields");
        }

        const user = await User.findOne({ email });

        if (!user) {
            return res.status(404).send("No user with that email");
        }

        const isPasswordCorrect = await bcrypt.compare(password, user.password);

        if (!isPasswordCorrect) {
            return res.status(400).send("Wrong password");
        }

        const token = User.signJwt(user);
        res.status(200).cookie("session", token, { secure: true, httpOnly: true, sameSite: "none" }).send({ username: user.username });
    } catch (error) {
        res.status(400).send(error.message);
    }
}

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

        const token = User.signJwt(user);
        res.status(201).cookie("session", token, { secure: true, httpOnly: true, sameSite: "none" }).send({ username });
    } catch (error) {
        res.status(400).send(error.message);
    }
};

module.exports = { userLogin, userRegister };
