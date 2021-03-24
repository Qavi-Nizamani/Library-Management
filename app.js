const express = require("express");
const path = require("path");
const mongoose = require("mongoose");
const User = require("./models/users");
const app = express();

const port = 80;
//MONGOOSE SPECIFIC
mongoose.connect("mongodb://localhost/libraryManagement", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

//Checking if connection success
const db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error:"));
db.once("open", function () {
  // we're connected!
  // creatingSchema();
});

const booksSchema = new mongoose.Schema({
  bookName: String,
  bookAuther: String,
  language: String,
});
const Book = mongoose.model("Book", booksSchema);

function login(req, res) {
  //GETTING USER INFO FROM MONGODB
  User.users.find(req.body, (err, users) => {
    //Fetching matched user
    let isLoginSuccessful = false; //Make true if user matches
    let params = { isAdmin: false, isUser: false, message: "" };
    for (let user of users) {
      //Iterate all users of USER MODEL
      if (
        user.email === req.body.email && //Check if emails match or not
        user.password === req.body.password // --------password------------
      ) {
        if (user.isAdmin === true) {
          //If the user is Admin
          params.isAdmin = true;
          res.status(200).render("home", params);
        } else {
          params.isUser = true;
          params.message = `Welcome ${user.name.toUpperCase()} To my First Backend Website `;
          res.status(200).render("home", params);
        }
      } else {
        false;
      }
    }
    if (isLoginSuccessful) {
    } else {
      res.status(200).render("login");
    }
  });
}

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

app.get("/login", (req, res) => {
  //Login
  res.status(200).render("login");
});

app.get("/signup", (req, res) => {
  //Sign Up
  res.status(200).render("signup");
});

//Post methods
app.post("/signup", (req, res) => {
  const myData = new User(req.body);
  myData
    .save()
    .then(() => {
      res.send("data saved: ");
    })
    .catch(() => {
      res.status(400).send("error");
    });
});

app.post("/login", (req, res) => {
  login(req, res);
});

app.post("/", (req, res) => {
  const myData = new Book(req.body);
  myData
    .save()
    .then(() => {
      Book.find((err, data) => {
        console.log(data);
        let params = { rows: data };
        res.render("home", params);
      });
    })
    .catch(() => {
      res.status(400).send("error");
    });
});

//LISTENING SERVER
app.listen(port, () => {
  console.log("listening");
});
