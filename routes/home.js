const express = require("express");
const AppError = require("../middleware/AppError");
const router = express.Router();
const { auth } = require("../middleware/auth");
const books = require("../models/books");

//GET HOME PAGE
router.get("/", auth, async (req, res) => {
  try {
    if (req.user) {
      const book = await books.find({});
      res.render("home", {
        books: book,
      });
    } else {
      res.redirect("/login");
    }
  } catch (error) {
    console.log(error);
  }
});

module.exports = router;
