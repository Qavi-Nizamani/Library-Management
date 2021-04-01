const jwt = require("jsonwebtoken");
const User = require("../models/users");
const AppError = require("./AppError");
//USER AUTHENTICATION
const auth = async function (req, res, next) {
  try {
    const token = await req.cookies.jwt;
    const verifyToken = await jwt.verify(
      token,
      "iamfrombaqarnizamanilovetoplayfootball"
    );
    req.token = token;
    req.user = await User.findOne({ _id: verifyToken._id });

    next();
  } catch (error) {
    res.status(200).render("login");
  }
};

module.exports = auth;
