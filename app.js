const express = require("express");
const path = require("path");
const mongoose = require("mongoose");
const app = express();

const port = 80;

//EXPRESS SPECIFIC
app.use("/static", express.static("static"));
app.use(express.urlencoded());

//PUG SPECIFIC
app.set("view engine", "pug");
app.set("views", path.join(__dirname, "views"));

//END POINTS
app.get("/", (req, res) => {
  res.status(200).render("home");
});

//LISTENING SERVER
app.listen(port, () => {
  console.log("listening");
});
