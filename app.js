const express = require("express");
const app = express();
const path = require("path");
const methodOverride = require("method-override");
const session = require("express-session");
const flash = require("connect-flash");
const AppError = require("./middleware/AppError");
const mongoose = require("mongoose");
const passport = require("passport");
const LocalStrategy = require("passport-local");
const User = require("./models/users");
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
  useCreateIndex: true,
  useFindAndModify: false,
});

//PUG SPECIFIC
app.set("view engine", "pug");
app.set("views", path.join(__dirname, "views"));

//EXPRESS SPECIFIC
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(methodOverride("_method"));
app.use("/static", express.static("static"));

const sessionConfig = {
  secret: "thisismysecretkey",
  resave: false,
  saveUninitialized: true,
  cookie: {
    httpOnly: true,
    expires: Date.now() + 1000 * 60 * 60 * 24 * 7,
    maxAge: 1000 * 60 * 60 * 24 * 7,
  },
};
app.use(session(sessionConfig));
app.use(flash());
app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStrategy(User.authenticate()));

passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());
// END POINTS
// app.get("/newuser", async (req, res) => {
//   const user = new User({
//     username: "qavi123",
//     name: "qavi",
//     phone: 1234567895,
//     email: "qaviniz111@gmail.com",
//     address: "asdf",
//     password: "123123123",
//     confirmPassword: "123123123",
//   });
//   const newUser = await User.register(user, "12345678");
//   res.send(newUser);
// });
app.use((req, res, next) => {
  res.locals.user = req.user;
  res.locals.success = req.flash("success");
  res.locals.error = req.flash("error");
  next();
});

app.use("/", homeRoute);
app.use("/login", loginRoute);
app.use("/signup", signupRoute);
app.use("/books", booksRoute);
app.use("/logout", logoutRoute);
app.use("/users", usersRoute);

// app.get("/admin", (req, res) => {
//   throw new AppError("You are not an Admin!", 403);
// });

app.get("*", (req, res) => {
  req.flash("error", "Page Not Found!");
  res.redirect("/");
  // throw new AppError("Error! Page Not Found..", 404, "404 PAGE NOT FOUND!");
});

//UNIVERSAL ERROR HANDLER
app.use((err, req, res, next) => {
  const { message = "Something went wrong!", status = 500 } = err;
  res.status(status).send("<strong>Page Not Found</strong>" + message);
});

//LISTENING SERVER
app.listen(80, () => {
  console.log("listening");
});
