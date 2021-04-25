const express = require("express");
const router = express.Router();
const { auth } = require("../middleware/auth");

//LOGOUT THE USER
router.get("/", auth, async (req, res) => {
  try {
    // req.user.tokens = req.user.tokens.filter((element) => {
    //   return element.token !== req.token;
    // });
    // req.session.jwt = "";
    // await req.user.save();
    req.logout();
    req.flash("success", "Logout Successful!");
    res.redirect("/login");
  } catch (error) {
    res.status(404).send(error);
  }
});

module.exports = router;
