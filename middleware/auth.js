const jwt = require("jsonwebtoken");
const User = require("../models/users");
const wrapAsync = require("../util/wrapAsync");
//USER AUTHENTICATION
// const auth2 = async function (req, res, next) {
//   try {
//     const token = await req.session.jwt;
//     const verifyToken = await jwt.verify(
//       token,
//       "iamfrombaqarnizamanilovetoplayfootball"
//     );
//     req.token = token;
//     req.user = await User.findOne({ _id: verifyToken._id });
//     next();
//   } catch (error) {
//     next();
//   }
// };
const auth = function (req, res, next) {
  if (!req.isAuthenticated()) {
    req.flash("error", "You must be logged in first.");
    return res.redirect("/login");
  }
  next();
};
// const isAuther = async function (req,res,next){
//   const {id} = req.params;

// }
//METHOD FOR AUTHENTICATION
const loginVerification = wrapAsync(async function (req, res, next) {
  //GETTING USER INFO FROM MONGODB
  const { email, password } = req.body;
  const user = await User.findAndValidate(email, password);
  if (user) {
    const token = await user.generateAuthToken();
    req.session.jwt = token;
    req.user = user;
    console.log("logged in");
    next();
  } else {
    res.status(203).send("Wrong Email or Password");
  }
});

module.exports = { auth, loginVerification };
