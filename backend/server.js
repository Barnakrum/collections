const express = require("express");
const dotenv = require("dotenv");

dotenv.config();

port = process.env.PORT;

const app = express();

app.get("/", (req, res) => {
    res.send("hello");
});

app.listen(port, () => {
    console.log("listening on port: " + port);
});
