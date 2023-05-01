const router = require("express").Router();
const register = require("../controllers/register.controller");

//register user
router.post("/", register);
module.exports = router;
