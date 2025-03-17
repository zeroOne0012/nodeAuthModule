const express = require("express");
const router = express.Router();
const UserController = require("../controller/userController");
const userController = UserController.getInstance();
router.post("/login", userController.login);
router.get("/:id", userController.getUser);
router.post("/register", userController.register);

module.exports = router;