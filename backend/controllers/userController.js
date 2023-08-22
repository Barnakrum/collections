const User = require("../models/userModel");

const userLogin = (req, res) => {
    res.send("login route");
};

const userRegister = async (req, res) => {
    try {
        const user = await User.create({ ...req.body });
        res.status(200).send(user);
    } catch (error) {
        res.status(400).send(error.message);
    }
};

module.exports = { userLogin, userRegister };
