import express from "express";
import cors from "cors";
import errorHandler from "./middleware/errorHandler.js";
import logger from "./middleware/logger.js";

// DI
import pool from './module/pool.js';
import JwtUtil from './module/jwtUtil.js';
import UserService from './service/userService.js';
import UserRepository from './repository/userRepository.js';
import userController from './controller/userController.js';

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
import userRouter from "./router/userRouter.js";
app.use('/api/user', userRouter(controller));

// test(temp)
import testRouter from "./router/testRouter.js";
app.use("/test", testRouter);
app.get("/", (req, res)=>{
    res.send("Node Server");
});
// app.get("/error-test", (req, res, next)=>{
//     next(new Error("TEST"));
// });

app.use(errorHandler); // errorHandler middleware


export default app;