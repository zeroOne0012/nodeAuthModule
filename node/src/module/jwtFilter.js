const authService = require("../service/authService");
const customError = require("./customError");

// jwt 인증 미들웨어
jwtFilter = async (req) => {
    const authHeader = req.header("Authorization");

    if(!authHeader || !/^Bearer/.test(authHeader)){
        next(new customError(401, "Unauthorized", "token not found"));
    }

    const token = authHeader.spli(" ")[1]; // Bearer <TOKEN>

    try{
        req.user = await authService.verifyToken(token); // 반환값: 디코딩된 토큰의 payload (서명한 사용자 객체)
        next();
    }catch(e){
        new customError(403, "Invalid Token", "faild: verify-token");
    }

};
module.exports=jwtFilter;