const express = require("express");
const Book = require("../models/books");
const router = express.Router();
const { auth } = require("../middleware/auth");
const AppError = require("../middleware/AppError");

//SHOW ALL BOOKS
router.get("/", auth, async (req, res) => {
  try {
    const books = await Book.find();
    let params = { books: books };
    res.status(200).render("books", params);
  } catch (error) {
    res.send(error);
  }
});

//ADD A NEW BOOK
router.put("/", auth, async (req, res, next) => {
  try {
    if (req.user.isAdmin) {
      const myData = new Book(req.body);
      const result = await myData.save();
      //If any error Throw a new ERROR
      if (!result) {
        return next(new AppError("Book not Saved", 400));
      }
      const books = await Book.find();
      req.flash("success", "Book Added Successfully!");
      res.redirect("/books");
    } else {
      const books = await Book.find();
      res.status(200).render("books", { books: books });
    }
  } catch (error) {
    console.log(error);
  }
});

//GET THE BOOK
router.get("/:id", auth, async (req, res) => {
  try {
    const book = await Book.findById((_id = req.params.id));
    let params = { user: req.user, books: book };
    res.status(200).render("showBook", params);
  } catch (error) {
    res.send(error);
  }
});

//UPDATE THE BOOK
router.patch("/:id", async (req, res, next) => {
  console.log("patch working");
  try {
    if (true || req.user.isAdmin) {
      const result = await Book.findByIdAndUpdate(
        { _id: req.params.id },
        req.body
      );
      console.log(req.body, req.params.id);
      //If any error Throw a new ERROR
      if (!result) {
        return next(new AppError("Book not Saved", 400));
      }
      res.redirect("/books");
    } else {
      const books = await Book.find();
      res.status(200).render("books", { books: books });
    }
  } catch (error) {
    console.log(error);
  }
});

//DELETE THE BOOK
router.delete("/:id", async (req, res) => {
  try {
    const result = await Book.findByIdAndDelete({ _id: req.params.id });
    res.redirect("/books");
  } catch (error) {
    res.send(error);
  }
});

//CREATE A NEW COMMENT ON A BOOK
router.post("/:id/comments", async (req, res) => {
  try {
    const { id } = req.params;
    const book = await Book.findById(id);
    if (!book) {
      return next(new AppError("Book not found", 400));
    } else {
      await book.comments.push({ comment: req.body.comment });
      await book.save();
      res.redirect("/books/" + id);
    }
  } catch (error) {
    res.send(error);
  }
});

//SHOW ALL COMMENTS ON THE BOOK
// router.get("/:id/comments", auth, async (req, res) => {
//   try {
//     const { id } = req.params.id;
//     const result = await Book.findById(id);
//     res.status(200).render("showBook");
//   } catch (error) {
//     res.send(error);
//   }
// });

//FIND A BOOK BY NAME
// router.get("/api/name/:bookName", auth, async (req, res) => {
//   try {
//     const book = await Book.findMany({ bookName: req.params.bookName });
//     if (req.user.isAdmin) {
//       res.send(book);
//     } else {
//       // res.status(200).render("showBook", { books: books });
//     }
//   } catch (error) {
//     res.send(error);
//   }
// });

module.exports = router;
