const express = require("express");
const router = express.Router();
const userControllers = require("../controllers/users");

router.post("/sign-up", userControllers.signupUser);

router.post("/log-in", userControllers.loginUser);

module.exports = router;
