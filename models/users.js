const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");

const usersSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  phone: {
    type: Number,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  address: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
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
  try {
    const token = await jwt.sign(
      { _id: this._id },
      "iamfrombaqarnizamanilovetoplayfootball"
    );

    await jwt.verify(token, "iamfrombaqarnizamanilovetoplayfootball");
    this.tokens = this.tokens.concat({ token: token });
    await this.save();
    return token;
  } catch (error) {
    console.log("the error is: " + error);
  }
};

module.exports = mongoose.model("User", usersSchema);
