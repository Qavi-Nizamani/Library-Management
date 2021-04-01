const express = require("express");
const router = express.Router();
const User = require("../models/users");
const auth = require("../middleware/auth");

router.get("/", auth, (req, res) => {
  if (req.user.isAdmin) {
    let params = { isAdmin: true };
    res.status(200).render("users", params);
  } else {
    res.status(404).send(`<strong>Error 404: Page Not Found</strong>`);
  }
});

router.get("/getUsers", (req, res) => {
  User.find({}, { name: 1, phone: 1, email: 1, address: 1 }, (err, data) => {
    res.json(data);
  });
});

module.exports = router;
