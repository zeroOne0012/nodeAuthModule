import express from "express";
import TestController from "../controller/testController.js";
import jwtFilter from "../middleware/jwtFilter.js";
const router = express.Router();

router.get("/test", jwtFilter("admin"), TestController.test);
router.get("/test2", jwtFilter(100), TestController.test2);
router.get("/test3", TestController.test3);

export default router;