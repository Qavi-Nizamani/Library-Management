const express = require("express");
const router = express.Router();
const auth = require("../middleware/auth");
router.get("/", auth, (req, res) => {
  try {
    res.clearCookie("jwt");
    res.status(200).render("login");
  } catch (error) {
    res.status(404).send(error);
  }
});

module.exports = router;
