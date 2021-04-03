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

router.get("/:id", auth, async (req, res) => {
  if (req.user.isAdmin) {
    const user = await User.findById({ _id: req.params.id });
    let params = { isAdmin: true, user: user };
    res.status(200).render("showUser", params);
  } else {
    res.status(404).send(`<strong>Error 404: Page Not Found</strong>`);
  }
});

module.exports = router;
