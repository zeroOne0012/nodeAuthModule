// const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const customError = require("../module/customError");
require('dotenv').config();

const jwtSecretKey = process.env.JWT_SECRET_KEY;

class jwtUtil{
    static instance = null;

    static getInstance = ()=>{
        if(!jwtUtil.instance){
            jwtUtil.instance = new jwtUtil();
        }
        return jwtUtil.instance;
    };

    // 토큰 생성
    generateToken = async (userData)=>{
        // 헤더는 자동 생성
        try{
            return jwt.sign(userData, jwtSecretKey); // 만료 시간 없음
            // return jwt.sign(userData, jwtSecretKey, { expiresIn: "1h" }); // 3600초 뒤 만료
        } catch(e){
            next(new customError(500, "INTERNAL SERVER ERROR", e));
        }
    };
    // 토큰 검증
    verifyToken = async (token)=>{
        try{
            return jwt.verify(token, jwtSecretKey);
        } catch(e){
            next(new customError(403, "Unauthorized", e));
        }
    };
}

module.exports = jwtUtil;
