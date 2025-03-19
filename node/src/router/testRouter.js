const express = require("express");
const router = express.Router();
const TestController = require("../controller/testController");
const jwtFilter = require("../middleware/jwtFilter");

router.get("/test", jwtFilter("admin"), TestController.test);
router.get("/test2", jwtFilter(100), TestController.test2);
router.get("/test3", TestController.test3);

module.exports = router;