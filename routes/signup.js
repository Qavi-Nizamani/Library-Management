const express = require("express");
const User = require("../models/users");
const router = express.Router();

router.get("/", (req, res) => {
  res.status(200).render("signup");
});

//Post methods
router.post("/signup", (req, res) => {
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

module.exports = router;
