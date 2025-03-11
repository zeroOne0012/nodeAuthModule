const express = require("express");
const router = express.Router();
const TestController = require("../controller/testController");

router.post("/test", TestController.test);
router.post("/test2", TestController.test2);
router.post("/test3", TestController.test3);

module.exports = router;