const express = require("express");
const app = express();
const AppError = require("./middleware/AppError");
const cookieParser = require("cookie-parser");
const path = require("path");
const mongoose = require("mongoose");
require("dotenv/config");

//Setting up routes
const homeRoute = require("./routes/home");
const loginRoute = require("./routes/login");
const signupRoute = require("./routes/signup");
const logoutRoute = require("./routes/logout");
const usersRoute = require("./routes/users");
const booksRoute = require("./routes/books");

//MONGOOSE SPECIFIC
mongoose.connect(process.env.DB_CONNECTION, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

//EXPRESS SPECIFIC
app.use("/static", express.static("static"));
app.use(cookieParser());
//PUG SPECIFIC
app.set("view engine", "pug");
app.set("views", path.join(__dirname, "views"));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
//END POINTS
app.use("/", homeRoute);
app.use("/login", loginRoute);
app.use("/signup", signupRoute);
app.use("/books", booksRoute);
app.use("/logout", logoutRoute);
app.use("/users", usersRoute);

app.get("/admin", (req, res) => {
  throw new AppError("You are not an Admin!", 403);
});
app.get("/Qavi", (req, res) => {
  asdfsdqavi.namafasde();
});

app.get("*", (req, res) => {
  throw new AppError("Error! Page Not Found..", 404, "404 PAGE NOT FOUND!");
});

//UNIVERSAL ERROR HANDLER
app.use((err, req, res, next) => {
  const { message = "Something went wrong!", status = 500 } = err;
  res.status(status).send(message);
});

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
