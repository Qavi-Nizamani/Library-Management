const express = require("express");
const AppError = require("../middleware/AppError");
const router = express.Router();
const { auth } = require("../middleware/auth");
const books = require("../models/books");

//GET ADMIN PAGE
router.get("/", auth, async (req, res) => {
  try {
    if (req.user.isAdmin) {
      res.status(200).render("admin");
    }
  } catch (error) {
    console.log(error);
  }
});

module.exports = router;
