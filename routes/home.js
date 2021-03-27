const express = require("express");
const router = express.Router();
const auth = require("../middleware/auth");

router.get("/", auth, (req, res) => {
  try {
    if (req.user.isAdmin) {
      let params = { isAdmin: true };
      res.status(200).render("home", params);
    } else {
      let params = { isUser: true, message: "" }; // else this is normal user
      params.message = `Welcome ${req.user.name.toUpperCase()} To my First Backend Website `;
      res.status(200).render("home", params);
    }
  } catch (error) {
    console.log("error " + req.user.isAdmin);
  }
});

module.exports = router;
