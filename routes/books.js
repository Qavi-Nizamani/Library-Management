const express = require("express");
const Book = require("../models/books");
const router = express.Router();
const auth = require("../middleware/auth");
const AppError = require("../middleware/AppError");

router.get("/", auth, (req, res) => {
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

router.post("/", auth, async (req, res, next) => {
  try {
    if (req.user.isAdmin) {
      let params = { isAdmin: true };
      const myData = new Book(req.body);
      const result = await myData.save();
      if (!result) {
        return next(new AppError("Book not Saved", 400));
      }
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
