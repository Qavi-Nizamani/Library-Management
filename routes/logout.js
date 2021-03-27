const express = require("express");
const router = express.Router();
const auth = require("../middleware/auth");
router.get("/", auth, async (req, res) => {
  try {
    req.user.tokens = req.user.tokens.filter((element) => {
      return element.token !== req.token;
    });
    res.clearCookie("jwt");
    await req.user.save();
    res.status(200).render("login");
  } catch (error) {
    res.status(404).send(error);
  }
});

module.exports = router;
