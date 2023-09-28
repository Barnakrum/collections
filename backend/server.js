const express = require("express");
const mongoose = require("mongoose");

const dotenv = require("dotenv");
const cors = require("cors");
const cookieParser = require("cookie-parser");

const logger = require("./middlewares/logger");

const userRouter = require("./routes/userRoutes");
const collectionRouter = require("./routes/collectionRoutes");
const itemRouter = require("./routes/itemRoutes");

dotenv.config();

port = process.env.PORT;

const app = express();

app.use(cookieParser());
app.use(express.json());

if (process.env.ENV === "DEVELOPMENT") {
    app.use(cors({ origin: ["http://127.0.0.1:5173", "http://localhost:5173"], credentials: true }));
    app.use(logger());
} else {
    app.use(cors({ origin: process.env.FRONTEND_ORIGIN, credentials: true }));
}

app.get("/", (req, res) => {
    res.send("hello");
});

app.use("/api/user", userRouter);
app.use("/api/collection", collectionRouter);
app.use("/api/item", itemRouter);

const start = async () => {
    await mongoose.connect(process.env.MONGO_URI);
    console.log("connect to DB");

    app.listen(port, () => {
        console.log("listening on port: " + port);
    });
};

start();
