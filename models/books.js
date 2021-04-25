const mongoose = require("mongoose");
const booksSchema = new mongoose.Schema({
  bookName: {
    type: String,
    requried: true,
  },
  bookAuther: {
    type: String,
    requried: true,
    min: 6,
  },
  language: {
    type: String,
    requried: true,
  },
  details: String,
  bookImg: String,
  comments: [
    {
      comment: {
        type: String,
      },
    },
  ],
});
module.exports = mongoose.model("Book", booksSchema);
