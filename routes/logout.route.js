const express = require("express");
const router = express.Router();
const session = require("express-session");
const logout = require("../controllers/logout.controller");

router.use(
  session({
    secret: "secret-key",
    resave: false,
    saveUninitialized: true,
  })
);
// Route for logging out the user
router.post("/", logout);
module.exports = router;
