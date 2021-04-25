const express = require("express");
const router = express.Router();
const wrapAsync = require("../util/wrapAsync");
const User = require("../models/users");
const AppError = require("../middleware/AppError");

//SIGN UP PAGE
router.get("/", (req, res) => {
  if (req.isAuthenticated()) {
    res.redirect("/");
  } else {
    res.status(200).render("signup");
  }
});

//CREATE A NEW ACCOUNT
router.post(
  "/",
  wrapAsync(async (req, res, next) => {
    if (!req.isAuthenticated()) {
      const { username, name, email, phone, address, password } = req.body;
      const isValidate = await User.userValidate(req.body);
      if (isValidate) {
        try {
          const user = new User({ username, name, email, phone, address });
          const registeredUser = await User.register(user, password);
          req.login(registeredUser, (err) => next(err));
          req.flash("success", "Congratulations");
          res.send();
        } catch (error) {
          errorMessage = error.message;
          if (error.code === 11000) {
            errorMessage = "User already registered with the email";
          }
          res.status(203).send(errorMessage);
        }
      } else {
        res.status(203).send("Password Mismatch.");
      }
    } else {
      res.redirect("/");
    }

    //   const userExist = await User.findOne({ email: req.body.email });
    //   const validation = await userValidate(req.body);

    //   if (!validation.error && !userExist) {
    //     const user = new User(req.body);
    //     const saved = await user.save();
    //     if (saved) {
    //       req.flash("success", "Congrats, Account Created");
    //       res.status(200).send();
    //     } else {
    //       res.status(203).send("Account Not Registered!");
    //     }
    //   } else {
    //     let msg = "";
    //     if (userExist) {
    //       msg = "Your email already registered!";
    //     } else {
    //       msg = validation.error.details[0].message;
    //     }
    //     res.status(203).send(msg);
    //   }
  })
);

module.exports = router;
