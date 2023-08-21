const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");
const mongoose = require("mongoose");

const userRouter = require("./routes/userRoutes");

dotenv.config();

port = process.env.PORT;

const app = express();

if (process.env.ENV === "DEVELOPMENT") {
    app.use(cors({ origin: "*" }));
} else {
    app.use(cors({ origin: process.env.FRONTEND_ORIGIN }));
}

app.get("/", (req, res) => {
    res.send("hello");
});

app.use("/api/user", userRouter);

const start = async () => {
    await mongoose.connect(process.env.MONGO_URI);
    console.log("connect to DB");

    app.listen(port, () => {
        console.log("listening on port: " + port);
    });
};

start();
