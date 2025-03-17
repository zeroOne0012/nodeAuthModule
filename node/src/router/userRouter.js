const express = require("express");
const router = express.Router();

module.exports = (controller) => {
    router.post("/login", controller.login);
    router.get("/:id", controller.getUser);
    router.post("/register", controller.register);

    return router;
};
