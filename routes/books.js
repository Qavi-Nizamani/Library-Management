const express = require("express");
const Book = require("../models/books");
const router = express.Router();
const auth = require("../middleware/auth");

router.get("/", auth, async (req, res) => {
  try {
    if (req.user.isAdmin) {
      let params = { isAdmin: true };
      res.status(200).render("books", params);
    } else {
      res.status(200).render("books");
    }
  } catch (error) {
    res.send(error);
  }
});

router.post("/", auth, async (req, res) => {
  try {
    if (req.user.isAdmin) {
      let params = { isAdmin: true };
      const myData = new Book(req.body);
      await myData.save();
      res.status(200).render("books", params);
    } else {
      res.status(200).render("books");
    }
  } catch (error) {
    console.log(error);
  }
});

router.get("/getBooks", (req, res) => {
  Book.find((err, data) => {
    res.json(data);
  });
});

module.exports = router;
