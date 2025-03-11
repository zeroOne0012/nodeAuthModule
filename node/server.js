const express = require("express");
const cors = require("cors");
const app = express();
const port = 29992;
const userRouter = require("./src/router/userRouter");
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());
app.use("/api/user", userRouter);

app.get("/", (req, res)=>{
    res.send("Node Server");
});
app.use(errorHandler);

app.listen(port, ()=>console.log("listening"));