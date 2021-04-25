const express = require("express");
const router = express.Router();
const passport = require("passport");
const wrapAsync = require("../util/wrapAsync");
const { auth, loginVerification } = require("../middleware/auth");

//GET THE LOGIN PAGE
router.get("/", (req, res) => {
  if (req.isAuthenticated()) {
    return res.redirect("/");
  }
  res.render("login");
});

//AUTHENTICATE THE USER
router.post(
  "/",
  passport.authenticate("local", {
    failureFlash: true,
    failureRedirect: "/login",
  }),
  (req, res) => {
    req.flash("success", "Welcome Back!");
    res.send("Login success");
  }
);

module.exports = router;
