const express = require("express");
const User = require("../models/users");
const router = express.Router();

router.get("/", (req, res) => {
  res.status(200).render("signup");
});

//Post methods
router.post("/signup", async (req, res) => {
  const myData = new User(req.body);
  const newUser = await myData.save();
  res.json(newUser);
});

module.exports = router;
