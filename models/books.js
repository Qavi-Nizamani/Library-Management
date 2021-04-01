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
});
module.exports = mongoose.model("Book", booksSchema);
