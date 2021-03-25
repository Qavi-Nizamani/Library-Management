const mongoose = require("mongoose");
const usersSchema = new mongoose.Schema({
  name: String,
  phone: Number,
  email: String,
  address: String,
  password: String,
  isAdmin: Boolean,
});

module.exports = mongoose.model("User", usersSchema);
