const express = require("express");
const Book = require("../models/books");
const router = express.Router();
router.use(express.urlencoded());

router.get("/", (req, res) => {
  res.status(200).render("home");
});

router.post("/", async (req, res) => {
  const myData = new Book(req.body);
  const savedData = await myData.save();
  res.render("home");
});

module.exports = router;
