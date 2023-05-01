const User = require("../models/user.model");
const bcrypt = require("bcrypt");

const getUser = async (req, res) => {
  try {
    // Find the user who is currently logged in using their ID
    const user = await User.findById(req.params.id);

    // If the user is not found, return a 404 error
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    // Return the user's name, email, and username
    return res.status(200).json({
      name: user.name,
      email: user.email,
      username: user.username,
    });
  } catch (err) {
    // Handle error
    console.error(err);
    return res.status(500).json({ error: "Internal server error" });
  }
};
const updateUser = async (req, res) => {
  if (req.body.userId === req.params.id || req.body.isAdmin) {
    if (req.body.password) {
      try {
        const salt = await bcrypt.genSalt(10);
        req.body.password = await bcrypt.hash(req.body.password, salt);
      } catch (err) {
        return res.status(500).json(err);
      }
    }
    try {
      const user = await User.findByIdAndUpdate(req.params.id, {
        $set: req.body,
      });
      res.status(200).json("Account has been updated");
    } catch (err) {
      return res.status(500).json(err);
    }
  } else {
    return res.status(403).json("You can update only your account");
  }
};
module.exports = {
  getUser: getUser,
  updateUser: updateUser,
};
