const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");
const joi = require("joi");
const bcrypt = require("bcrypt");
const passportLocalMongoose = require("passport-local-mongoose");
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
    unique: true,
  },
  address: {
    type: String,
    required: true,
  },
  // password: {
  //   type: String,
  //   required: true,
  //   min: 8,
  // },
  isAdmin: Boolean,
  books: [
    {
      book: {
        bookName: {
          type: String,
          requried: true,
        },
        bookAuther: {
          type: String,
          requried: true,
          min: 6,
        },
        language: {
          type: String,
          requried: true,
        },
        issueDate: {
          type: Date,
          default: Date.now,
        },
        returnDate: {
          type: Date,
          requried: true,
        },
      },
    },
  ],
  tokens: [
    {
      token: {
        type: String,
        required: true,
      },
    },
  ],
});

//USER PLUGINS
usersSchema.plugin(passportLocalMongoose);

//USER VALIDATION
usersSchema.statics.userValidate = async function (user) {
  try {
    const userSchema = joi
      .object({
        username: joi.string().required().min(2),
        name: joi.string().required().min(2),
        phone: joi.number().required().min(3000000000),
        email: joi.string().required(),
        address: joi.string().required(),
        password: joi.string().required().min(8),
        confirmPassword: joi.string().required().min(8),
      })
      .required();
    const passwordMatch = user.password === user.confirmPassword ? true : false;
    const validation = await userSchema.validate(user);

    if (!validation.error && passwordMatch) {
      return true;
    } else {
      return false;
    }
  } catch (error) {
    console.log("uservalidation" + error);
  }
};
//HASHING PASSWORD ON SAVE USER DATA
usersSchema.pre("save", async function (next) {
  if (!this.isModified("password")) return next();
  this.password = await bcrypt.hash(this.password, 12);
  this.confirmPassword = await bcrypt.hash(this.confirmPassword, 12);
  next();
});

//USER VALIDATION
usersSchema.statics.findAndValidate = async function (email, password) {
  const user = await this.findOne({ email });
  const isValid = await bcrypt.compare(password, user.password);
  return isValid ? user : false;
};

//METHOD TO GENERATE AUTHENTICATION TOKEN FOR VERIFICATION
usersSchema.methods.generateAuthToken = async function () {
  try {
    const token = await jwt.sign(
      { _id: this._id },
      "iamfrombaqarnizamanilovetoplayfootball"
    );

    await jwt.verify(token, "iamfrombaqarnizamanilovetoplayfootball");
    this.tokens.push({ token: token });
    await this.save();
    console.log(token);
    return token;
  } catch (error) {
    console.log("the error is: " + error);
  }
};

module.exports = mongoose.model("User", usersSchema);
