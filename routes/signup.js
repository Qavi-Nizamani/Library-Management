const express = require("express");
const wrapAsync = require("../util/wrapAsync");
const User = require("../models/users");
const router = express.Router();

router.get("/", (req, res) => {
  res.status(200).render("signup");
});

//Post methods
router.post(
  "/",
  wrapAsync(async (req, res) => {
    const user = new User(req.body);
    const saved = await user.save();
    if (saved) {
      res.status(201).render("login");
    } else {
      res.render("signup");
    }
  })
);

module.exports = router;
