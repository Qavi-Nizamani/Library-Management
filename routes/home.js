const express = require("express");
const AppError = require("../middleware/AppError");
const router = express.Router();
const auth = require("../middleware/auth");

router.get("/", auth, (req, res) => {
  try {
    if (req.user.isAdmin) {
      let params = { notLoggedIn: false, isAdmin: true };
      res.status(200).render("home", params);
    } else {
      let params = { isUser: true, message: "", notLoggedIn: false }; // else this is normal user
      params.message = `Welcome ${req.user.name.toUpperCase()} To my First Backend Website `;
      res.status(200).render("home", params);
    }
  } catch (error) {
    console.log("tokenError");
  }
});

module.exports = router;
