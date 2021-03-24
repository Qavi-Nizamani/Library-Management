const mongoose = require("mongoose");
const usersSchema = new mongoose.Schema({
  name: String,
  phone: Number,
  email: String,
  address: String,
  password: String,
  isAdmin: Boolean,
});
const User = mongoose.model("User", usersSchema);

//GETTING USER INFO FROM MONGODB
function selectingUser(body, res) {
  User.find(body, (err, users) => {
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
module.exports = {
  users: User,
  find: selectingUser,
};
