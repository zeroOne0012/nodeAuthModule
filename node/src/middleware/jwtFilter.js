const authService = require("../service/authService");
const customError = require("./customError");

// jwt 인증 미들웨어
jwtFilter = async (req) => {
    const authHeader = req.header("Authorization");

    if(!authHeader || !/^Bearer/.test(authHeader)){
        next(new customError(401, "Unauthorized", "Token not found")); // 로그인 X
    }

    const token = authHeader.spli(" ")[1]; // Bearer <TOKEN>

    try{
        req.user = await authService.verifyToken(token); // 반환값: 디코딩된 토큰의 페이로드 (서명한 사용자 객체)
        next();
    }catch(e){
        next(new customError(403, "Forbidden", "Expired token")); // 만료
    }

    // 권한 설정 !
    // try{
    //     //
    //     next();
    // }catch(e){
    //     next(new customError(403, "Forbidden", "Expired token")); // 만료
    // }

};
module.exports=jwtFilter;