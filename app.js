const express = require("express");
const path = require("path");
const app = express();
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
require("dotenv/config");

//Setting up routes
const homeRoute = require("./routes/home");
const loginRoute = require("./routes/login");
const signupRoute = require("./routes/signup");
const booksRoute = require("./routes/books");
app.use(bodyParser.json());
//MONGOOSE SPECIFIC
mongoose.connect(process.env.DB_CONNECTION, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

//EXPRESS SPECIFIC
app.use("/static", express.static("static"));
app.use(express.urlencoded());

//PUG SPECIFIC
app.set("view engine", "pug");
app.set("views", path.join(__dirname, "views"));

//END POINTS
app.use("/", homeRoute);
app.use("/login", loginRoute);
app.use("/signup", signupRoute);
app.use("/books", booksRoute);
//LISTENING SERVER
app.listen(80, () => {
  console.log("listening");
});

//Checking if connection success
// const db = mongoose.connection;
// db.on("error", console.error.bind(console, "connection error:"));
// db.once("open", function () {
//   // we're connected!
//   // creatingSchema();
// });
