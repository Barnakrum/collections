const express = require("express");
const mongoose = require("mongoose");

const dotenv = require("dotenv");
const cors = require("cors");
const cookieParser = require("cookie-parser");

const logger = require("./middlewares/logger");

const userRouter = require("./routes/userRoutes");
const collectionRouter = require("./routes/collectionRoutes");

dotenv.config();

port = process.env.PORT;

const app = express();

app.use(cookieParser());
app.use(express.json());

if (process.env.ENV === "DEVELOPMENT") {
    app.use(cors({ origin: "*" }));
    app.use(logger());
} else {
    app.use(cors({ origin: process.env.FRONTEND_ORIGIN }));
}

app.get("/", (req, res) => {
    res.send("hello");
});

app.use("/api/user", userRouter);
app.use("/api/collection", collectionRouter);

const start = async () => {
    await mongoose.connect(process.env.MONGO_URI);
    console.log("connect to DB");

    app.listen(port, () => {
        console.log("listening on port: " + port);
    });
};

start();
