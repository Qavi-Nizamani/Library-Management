const express = require("express");
const Book = require("../models/books");
const router = express.Router();
router.use(express.urlencoded());

router.get("/", (req, res) => {
  Book.find((err, data) => {
    res.render("books");
  });
});
router.post("/", async (req, res) => {
  const myData = new Book(req.body);
  const savedData = await myData.save();
  res.render("books");
});
router.get("/getBooks", (req, res) => {
  Book.find((err, data) => {
    res.json(data);
  });
});

module.exports = router;
