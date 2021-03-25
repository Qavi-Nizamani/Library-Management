const express = require("express");
const Book = require("../models/books");
const router = express.Router();
router.use(express.urlencoded());

router.get("/", (req, res) => {
  res.status(200).render("home");
});

router.post("/", (req, res) => {
  const myData = new Book(req.body);
  myData
    .save()
    .then(() => {
      Book.find((err, data) => {
        console.log(data);
        let params = { rows: data };
        res.render("home", params);
      });
    })
    .catch(() => {
      res.status(400).send("error");
    });
});

module.exports = router;
