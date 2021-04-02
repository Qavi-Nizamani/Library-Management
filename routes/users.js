const express = require("express");
const router = express.Router();
const User = require("../models/users");
const auth = require("../middleware/auth");

router.get("/", auth, async (req, res) => {
  if (req.user.isAdmin) {
    const users = await User.find();
    let params = { isAdmin: true, users: users };
    res.status(200).render("users", params);
  } else {
    res.status(404).send(`<strong>Error 404: Page Not Found</strong>`);
  }
});

// router.get("/getUsers", (req, res) => {
//   User.find({}, { name: 1, phone: 1, email: 1, address: 1 }, (err, data) => {
//     res.json(data);
//   });
// });

module.exports = router;
