const express = require("express");
const User = require("../models/users");
const router = express.Router();

router.get("/", (req, res) => {
  res.status(200).render("signup");
});

//Post methods
router.post("/", async (req, res) => {
  try {
    const user = new User(req.body);
    await user.save();

    res.status(201).render("login");
  } catch (error) {
    res.render("signup");
  }
});

module.exports = router;
