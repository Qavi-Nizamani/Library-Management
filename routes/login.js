const express = require("express");
const User = require("../models/users");
const router = express.Router();
const wrapAsync = require("../util/wrapAsync");
router.get("/", (req, res) => {
  res.status(200).render("login");
});

router.post(
  "/",
  wrapAsync(async (req, res, next) => {
    login(req, res);
  })
);

async function login(req, res) {
  //GETTING USER INFO FROM MONGODB
  let params = { isAdmin: false, isUser: false, message: "" };
  const user = await User.findOne({ email: req.body.email });
  if (user) {
    if (
      user.email === req.body.email && //Check if email matches or not.
      user.password === req.body.password // --------password------------
    ) {
      if (user.isAdmin === true) {
        //If the user is Admin
        params.isAdmin = true;
        await generateToken();
        res.status(201).render("home", params);
      } else {
        // else this is normal user
        params.isUser = true;
        params.message = `Welcome ${user.name.toUpperCase()} To my First Backend Website `;
        await generateToken();
        res.status(201).render("home", params);
      }
    } else {
      // else log an error
      params = {
        error: "Email or Password is Wrong! Please enter the correct data.",
      };
      res.status(200).render("login", params);
    }
  }

  async function generateToken() {
    const token = await user.generateAuthToken();
    res.cookie("jwt", token, {
      httpOnly: true,
    });
  }
}

module.exports = router;
