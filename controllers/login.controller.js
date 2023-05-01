const User = require("../models/user.model");
const bcrypt = require("bcrypt");
const login = async (req, res) => {
  try {
    const user = await User.findOne({ username: req.body.username });
    !user && res.status(404).json("user not found");

    const validPassword = await bcrypt.compare(
      req.body.password,
      user.password
    );
    !validPassword && res.status(400).json("wrong password");

    res.status(200).json(user);
    console.log("Successfully logged in");
  } catch (err) {
    res.status(500).json(err);
  }
};
module.exports = login;
