const customError = require("../module/customError");
const jwtUtil = require("../module/jwtUtil").getInstance();

// jwt 인증 미들웨어
jwtFilter = (requiredRole) => async (req,res,next) => {
    const authHeader = req.header("Authorization");

    if(!authHeader || !/^Bearer/.test(authHeader)){
        return next(new customError(401, "Unauthorized", "Token not found")); // 로그인 X
    }
    const token = authHeader.split(" ")[1]; // Bearer <TOKEN>

    try{
        req.user = await jwtUtil.verifyToken(token); // 반환값: 디코딩된 토큰의 페이로드 (서명한 사용자 객체)
        console.log("인증 토큰!", req.user);
    }catch(e){
        return next(new customError(403, "Forbidden", "Expired token")); // 만료
    }

    // 권한 확인
    if(!isNaN(requiredRole)){ // requiredRole이 id로 주어질 때: 2면 [1, 2] 허용 (1: admin, ...)
        if(req.user.role_id<=requiredRole){
            next();
        } else{
            next(new customError(403, "Forbidden", `Access denied: You don't have permission`)); // 권한 X
        }
    }else{
        if(req.user.role===requiredRole){
            next();
        } else{
            next(new customError(403, "Forbidden", `Access denied: ${requiredRole} only`)); // 권한 X
        }
    }
};
module.exports=jwtFilter;