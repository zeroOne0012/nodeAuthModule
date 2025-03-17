const express = require("express");
const router = express.Router();
const UserController = require("../controller/userController");
const userController = UserController.getInstance();
router.post("/login", userController.login);

module.exports = router;