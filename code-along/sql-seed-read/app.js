const cors = require("cors");
const express = require("express");

const colorsController = require("./controllers/colorsController");

const app = express();

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.send("Welcome to Colors App");
});

app.use("/colors", colorsController);

app.get("*", (req, res) => {
  res.status(404).send("Page not found");
});

module.exports = app;
