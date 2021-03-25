const { json } = require("body-parser");
const express = require("express");
const User = require("../models/users");
const router = express.Router();
router.use(express.urlencoded());

router.get("/", (req, res) => {
  res.status(200).render("login");
});

router.post("/", (req, res) => {
  login(req, res);
});

function login(req, res) {
  //GETTING USER INFO FROM MONGODB
  User.find(req.body, (err, users) => {
    //Fetching matched user
    let isLoginSuccessful = false; //Make true if user matches
    let params = { isAdmin: false, isUser: false, message: "" };
    for (let user of users) {
      //Iterate all users of USER MODEL
      if (
        user.email === req.body.email && //Check if emails match or not
        user.password === req.body.password // --------password------------
      ) {
        if (user.isAdmin === true) {
          //If the user is Admin
          params.isAdmin = true;
          res.status(200).render("home", params);
        } else {
          params.isUser = true;
          params.message = `Welcome ${user.name.toUpperCase()} To my First Backend Website `;
          res.status(200).render("home", params);
        }
      } else {
        false;
      }
    }
    if (isLoginSuccessful) {
    } else {
      res.status(200).render("login");
    }
  });
}
module.exports = router;
