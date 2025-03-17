// DI
const pool = require('./src/module/pool');
const JwtUtil = require('./src/module/jwtUtil');
const UserService = require('./src/service/userService');
const UserRepository = require('./src/repository/userRepository');
const userController = require('./src/controller/userController');

const userRepository = new UserRepository({pool});
const jwtUtil = JwtUtil.getInstance();
const userService = new UserService({jwtUtil, userRepository});
const controller = new userController({userService});

const express = require("express");
const cors = require("cors");
const app = express();
const port = 29992;

const errorHandler = require("./src/middleware/errorHandler")
const logger = require("./src/middleware/logger");
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());
app.use(logger); // logger middleware

// router
const userRouter = require("./src/router/userRouter")(controller);
app.use('/api/user', userRouter);

// test(temp)
const testRouter = require("./src/router/testRouter");
app.use("/test", testRouter);
// app.get("/", (req, res)=>{
//     res.send("Node Server");
// });
// app.get("/error-test", (req, res, next)=>{
//     next(new Error("TEST"));
// });

app.use(errorHandler); // errorHandler middleware



app.listen(port, ()=>console.log("listening"));