const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");

const usersSchema = new mongoose.Schema({
  name: String,
  phone: Number,
  email: String,
  address: String,
  password: String,
  isAdmin: Boolean,
  tokens: [
    {
      token: {
        type: String,
        required: true,
      },
    },
  ],
});

usersSchema.methods.generateAuthToken = async function () {
  console.log(this._id);
  try {
    const token = await jwt.sign(
      { _id: this._id },
      "iamfrombaqarnizamanilovetoplayfootball"
    );

    const userVerify = await jwt.verify(
      token,
      "iamfrombaqarnizamanilovetoplayfootball"
    );
    this.tokens = this.tokens.concat({ token: token });
    await this.save();
    return token;
  } catch (error) {
    console.log("the error is: " + error);
  }
};

module.exports = mongoose.model("User", usersSchema);
