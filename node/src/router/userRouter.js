import express from "express";
const router = express.Router();

export default (controller) => {
    router.post("/login", controller.login);
    router.get("/:id", controller.getUser);
    router.post("/register", controller.register);

    return router;
};
