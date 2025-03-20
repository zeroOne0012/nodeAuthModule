const express = require("express");
const cors = require("cors");
const errorHandler = require("./middleware/errorHandler")
const logger = require("./middleware/logger");

// DI
const pool = require('./module/pool');
const JwtUtil = require('./module/jwtUtil');
const UserService = require('./service/userService');
const UserRepository = require('./repository/userRepository');
const userController = require('./controller/userController');

const userRepository = new UserRepository({pool});
const jwtUtil = JwtUtil.getInstance();
const userService = new UserService({jwtUtil, userRepository});
const controller = new userController({userService});


const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());
app.use(logger); // logger middleware

// router
const userRouter = require("./router/userRouter")(controller);
app.use('/api/user', userRouter);

// test(temp)
const testRouter = require("./router/testRouter");
app.use("/test", testRouter);
app.get("/", (req, res)=>{
    res.send("Node Server");
});
// app.get("/error-test", (req, res, next)=>{
//     next(new Error("TEST"));
// });

app.use(errorHandler); // errorHandler middleware


module.exports = app;
