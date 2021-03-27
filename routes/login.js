const express = require("express");
const User = require("../models/users");
const router = express.Router();

router.get("/", (req, res) => {
  res.status(200).render("login");
});

router.post("/", (req, res) => {
  login(req, res);
});

function login(req, res) {
  //GETTING USER INFO FROM MONGODB
  User.findOne({ email: req.body.email }, async (err, user) => {
    let params = { isAdmin: false, isUser: false, message: "" };
    // TRY IF THE USER EXIST
    try {
      if (
        user.email === req.body.email && //Check if email matches or not.
        user.password === req.body.password // --------password------------
      ) {
        if (user.isAdmin === true) {
          //If the user is Admin
          params.isAdmin = true;
          const token = await user.generateAuthToken();
          res.cookie("jwt", token, {
            expires: new Date(Date.now() + 1000 * 300),
            httpOnly: true,
          });
          res.status(201).render("home", params);
        } else {
          // else this is normal user
          params.isUser = true;
          params.message = `Welcome ${user.name.toUpperCase()} To my First Backend Website `;
          const token = await user.generateAuthToken();
          res.cookie("jwt", token);
          res.status(201).render("home", params);
        }
      } else {
        // else log an error
        params = {
          error: "Email or Password is Wrong! Please enter the correct data.",
        };
        res.status(200).render("login", params);
      }
    } catch (error) {
      // CATCH ERROR IF NO SUCH USER EXIST
      params = {
        error: "Email or Password is Wrong! Please enter the correct data.",
      };
      console.log("error catch block?");
      res.status(200).render("login", params);
    }
  });
}

module.exports = router;
