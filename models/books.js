const mongoose = require("mongoose");
const booksSchema = new mongoose.Schema({
  bookName: String,
  bookAuther: String,
  language: String,
});
module.exports = mongoose.model("Book", booksSchema);
