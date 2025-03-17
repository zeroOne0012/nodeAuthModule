const express = require("express");
const cors = require("cors");
const app = express();
const port = 29992;
const userRouter = require("./src/router/userRouter");
const errorHandler = require("./src/middleware/errorHandler")
const logger = require("./src/middleware/logger");
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());
app.use(logger);
app.use("/api/user", userRouter);


const testRouter = require("./src/router/testRouter");
app.use("/test", testRouter);


app.get("/", (req, res)=>{
    res.send("Node Server");
});
// app.get("/error-test", (req, res, next)=>{
//     next(new Error("TEST"));
// });
app.use(errorHandler);



app.listen(port, ()=>console.log("listening"));