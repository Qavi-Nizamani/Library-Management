const express = require("express");
const Book = require("../models/books");
const router = express.Router();
const auth = require("../middleware/auth");
const AppError = require("../middleware/AppError");

router.get("/", auth, async (req, res) => {
  try {
    const books = await Book.find();
    if (req.user.isAdmin) {
      let params = { isAdmin: true, books: books };
      res.status(200).render("books", params);
    } else {
      res.status(200).render("books", { books: books });
    }
  } catch (error) {
    res.send(error);
  }
});

router.post("/", auth, async (req, res, next) => {
  try {
    if (req.user.isAdmin) {
      const myData = new Book(req.body);
      const result = await myData.save();
      //If any error Throw a new ERROR
      if (!result) {
        return next(new AppError("Book not Saved", 400));
      }
      const books = await Book.find();
      const params = { isAdmin: true, books: books };
      res.status(200).render("books", params);
    } else {
      const books = await Book.find();
      res.status(200).render("books", { books: books });
    }
  } catch (error) {
    console.log(error);
  }
});

router.get("/:id", auth, async (req, res) => {
  try {
    const book = await Book.findById((_id = req.params.id));
    console.log(book);
    if (req.user.isAdmin) {
      let params = { isAdmin: true, books: book };
      res.status(200).render("showBook", params);
    } else {
      res.status(200).render("showBook", { books: books });
    }
  } catch (error) {
    res.send(error);
  }
});

//Update Book
router.post("/:id", auth, async (req, res, next) => {
  try {
    if (req.user.isAdmin) {
      const result = await Book.findByIdAndUpdate(
        { _id: req.params.id },
        req.body
      );
      //If any error Throw a new ERROR
      if (!result) {
        return next(new AppError("Book not Saved", 400));
      }
      const books = await Book.find();
      const params = { isAdmin: true, books: books };
      res.status(200).render("books", params);
    } else {
      const books = await Book.find();
      res.status(200).render("books", { books: books });
    }
  } catch (error) {
    console.log(error);
  }
});


module.exports = router;
