const express = require("express");
const router = express.Router();
const User = require("../models/users");
const Book = require("../models/books");
const { auth } = require("../middleware/auth");

//THIS ROUTE IS FOR ADMIN ONLY

//GET ALL THE USERS
router.get("/", auth, async (req, res) => {
  if (req.user.isAdmin) {
    const users = await User.find();
    let params = { users: users, user: req.user };
    res.status(200).render("admin", params);
  } else {
    res.status(404).send(`<strong>Error 404: Page Not Found</strong>`);
  }
});

//GET THE USER
router.get("/:id", auth, async (req, res) => {
  try {
    const userData = await User.findById({ _id: req.params.id });
    let params = { user: req.user, userData: userData, books: [] };
    if (req.query.bookName) {
      const books = await Book.find({ bookName: req.query.bookName });
      params.books = books;
    }
    res.status(200).render("showUser", params);
  } catch (error) {
    console.log(error);
  }
});
// //SHOW ISSUED BOOKS OF THE USER
// router.get("/:id", auth, async (req, res) => {
//   const userData = await User.findById({ _id: req.params.id });
//   let params = { user: req.user, userData, books: userData.books };
//   res.status(200).render("showUserBooks", params);
// });

//UPDATE THE USER
router.patch("/:id", auth, (req, res) => {
  const user = User.findByIdAndUpdate(req.body);
  console.log(user);
  res.redirect("/users/" + req.params.id);
});

//ASSIGN A BOOK TO THE USER
router.post("/:id/books/:bookId", async (req, res) => {
  const user = await User.findById({ _id: req.params.id });
  const book = await Book.findById({ _id: req.params.bookId });
  const newBook = {
    bookName: book.bookName,
    bookAuther: book.bookAuther,
    language: book.language,
  };
  await user.books.push({ book: newBook });
  await user.save();
  res.redirect("/users/" + user._id + "/books");
});

//RETURN THE BOOK
router.delete("/:id/books/:bookId", async (req, res) => {
  console.log("delte");
  const { id, bookId } = req.params;
  const user = await User.findById({ _id: id });
  user.books = user.books.filter((data) => data._id != bookId);
  await user.save();
  res.redirect("/users/" + id + "/books");
});
module.exports = router;
