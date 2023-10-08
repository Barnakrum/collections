const User = require("../models/userModel");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const transporter = require("../services/transporter");

const cookieExpireTime = 24 * 60 * 60 * 1000;

async function userLogin(req, res) {
    try {
        const { email, password } = req.body;

        if (!(email && password)) {
            return res.status(400).send({ message: "Please fill all fields" });
        }

        const user = await User.findOne({ email });

        if (!user) {
            return res.status(404).send({ message: "No user with that email" });
        }

        if (!user.isEmailVerifed) {
            return res.status(400).send({ message: "Please confirm your email" });
        }

        const isPasswordCorrect = await bcrypt.compare(password, user.password);

        if (!isPasswordCorrect) {
            return res.status(400).send({ message: "Wrong password" });
        }

        const token = User.signJwt(user);
        res.status(200)
            .cookie("session", token, { httpOnly: true, sameSite: "none", secure: true, maxAge: cookieExpireTime, path: "/" })
            .cookie("isLoggedIn", "", { httpOnly: false, sameSite: "none", secure: true, maxAge: cookieExpireTime, path: "/" })
            .send({ username: user.username, id: user._id });
    } catch (error) {
        res.status(400).send({ message: error.message });
    }
}

const userLogout = async (req, res) => {
    try {
        if (!req.cookies.session) {
            return res.status(401).send({ message: "Not logged in" });
        }

        res.status(200).clearCookie("session").clearCookie("isLoggedIn").send({ message: "Logged out" });
    } catch (error) {
        res.status(400).send({ message: error.message });
    }
};

const userRegister = async (req, res) => {
    try {
        const { username, email, password } = req.body;

        if (!(username && email && password)) {
            return res.status(400).send({ message: "Please fill all fields" });
        }

        const collidingEmail = await User.findOne({ email });
        const collidingUsername = await User.findOne({ username });
        if (!!collidingEmail) {
            return res.status(400).send({ message: "User with that email already exists" });
        }
        if (!!collidingUsername) {
            return res.status(400).send({ message: "User with that username already exists" });
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        let emailVerifyHash = await bcrypt.hash(username + email + process.env.TOKEN_KEY, 10);

        emailVerifyHash = emailVerifyHash.replaceAll("/", "_");

        const linkForVerification = `${process.env.FRONTEND_ORIGIN}/verify-email/${encodeURIComponent(`${emailVerifyHash}`)}/${email}/`;

        await transporter.sendMail({
            from: `Collections <${process.env.SMTP_USER}>`,
            to: email,
            subject: "Verify Email",
            html: `<h4>Use this link to verify your email</h4><a href="${linkForVerification}">${linkForVerification}</a>`,
        });
        await User.create({ username, email, password: hashedPassword });

        res.status(201).send({ message: "User created. Verify your adress email" });
    } catch (error) {
        res.status(400).send({ message: error.message });
    }
};

const userVerifyEmail = async (req, res) => {
    try {
        const user = await User.findOne({ email: req.params.email });

        if (!user) {
            return res.status(404).send({ message: "No user with that email" });
        }

        if (user.isEmailVerifed) {
            return res.status(400).send({ message: "Your email is already verifed" });
        }

        let hashFromRequest = decodeURIComponent(req.params.token);
        hashFromRequest = hashFromRequest.replaceAll("_", "/");

        const isHashCorrect = await bcrypt.compare(user.username + req.params.email + process.env.TOKEN_KEY, hashFromRequest);
        if (isHashCorrect) {
            user.isEmailVerifed = true;
            await user.save();
            res.status(200).send({ message: "Email verifed, You may login now" });
        } else {
            res.status(400).send({ message: "Wrong code" });
        }
    } catch (error) {
        res.status(400).send({ message: error.message });
    }
};

const getRefreshToken = async (req, res) => {
    try {
        if (!req.cookies.session) {
            return res.status(401).send({ message: "Not logged in" });
        }

        const { email } = await jwt.verify(req.cookies.session, process.env.TOKEN_KEY);

        const user = await User.findOne({ email });

        if (!user) {
            return res.status(404).send({ message: "User not found" });
        }

        const token = User.signJwt(user);
        res.status(200)
            .cookie("session", token, { httpOnly: true, sameSite: "none", secure: true, maxAge: cookieExpireTime, path: "/" })
            .cookie("isLoggedIn", "", { httpOnly: false, sameSite: "none", secure: true, maxAge: cookieExpireTime, path: "/" })
            .send({ username: user.username, id: user._id });
    } catch (error) {
        res.status(400).send({ message: error.message });
    }
};

const getUser = async (req, res) => {
    try {
        const user = await User.findById(req.params.id);
        if (!user) {
            return res.status(404).send({ message: "User not found" });
        }

        res.status(200).send({ username: user.username, isAdmin: user.isAdmin, id: user._id });
    } catch (error) {
        res.status(400).send({ message: error.message });
    }
};

module.exports = { userLogin, userRegister, userVerifyEmail, getRefreshToken, userLogout, getUser };
