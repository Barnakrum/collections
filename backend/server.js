const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");

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

app.listen(port, () => {
    console.log("listening on port: " + port);
});
