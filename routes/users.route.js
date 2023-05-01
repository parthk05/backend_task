const router = require("express").Router();
const { getUser, updateUser } = require("../controllers/users.controller");

//get user data
// Route for getting user information
router.get("/:id", getUser);
//update user
router.put("/:id", updateUser);

module.exports = router;
