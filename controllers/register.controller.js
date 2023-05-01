const User = require("../models/user.model");
const bcrypt = require("bcrypt");

const register = async (req, res) => {
  try {
    //generate new password into gibberish form
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(req.body.password, salt);
    //create new user
    const newUser = new User({
      username: req.body.username,
      name: req.body.name,
      email: req.body.email,
      password: hashedPassword,
      profileVideoPath: req.body.profileVideoPath,
    });
    //save user and return response
    const user = await newUser.save();
    res.status(200).json(user);
    console.log("User registered successfully");
  } catch (err) {
    res.status(500).json(err);
  }
};
module.exports = register;
