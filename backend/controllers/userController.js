const userLogin = (req, res) => {
    res.send("login route");
};

const userRegister = (req, res) => {
    res.send("register route");
};

module.exports = { userLogin, userRegister };
