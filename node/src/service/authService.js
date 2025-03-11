const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const customError = require("../module/customError");
require('dotenv').config();

const jwtSecretKey = process.env.JWT_SECRET_KEY;

class authService{
    hashPw = async (password) => {
        const salt = 10;
        // const salt_ = await bcrypt.genSalt(salt);
        return await bcrypt.hash(password, salt);
    };

    comparePw = async (password, hashedPassword) =>{
        return await bcrypt.compare(password,hashedPassword);
    };
    // 토큰 생성
    generateToken = async (userData)=>{
        // 헤더는 자동 생성
        try{
            return jwt.sign(userData, jwtSecretKey, { expiresIn: "1h" }); // 3600초 뒤 만료
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

/*
        if (e.name === "TokenExpiredError") {
            next(new customError(401, "Token expired", e)); // 만료된 토큰 → 401 Unauthorized
        } else {
            next(new customError(403, "Invalid token", e)); // 잘못된 토큰 → 403 Forbidden
        }
*/

module.exports = new authService();


// res.cookie("token", token, {
//     httpOnly: true, // JavaScript에서 접근 불가 (보안 강화)
//     secure: false, // HTTPS에서만 전송 (개발 환경에서는 false)
//     maxAge: 3600000, // 1시간
// });


/*
// ✅ 로그인 시 JWT 생성 후 쿠키에 저장
app.post("/login", (req, res) => {
    const userData = { userId: 1, role: "user" };
    const token = jwt.sign(userData, SECRET_KEY, { expiresIn: "1h" });

    res.cookie("token", token, {
        httpOnly: true, // ✅ JavaScript에서 접근 불가 (보안 강화)
        secure: false, // ❌ HTTPS에서만 전송 (개발 환경에서는 false)
        maxAge: 3600000, // 1시간
    });

    res.json({ message: "Logged in" });
});

// ✅ 쿠키에서 JWT 인증 정보 자동 검증
app.get("/protected", (req, res) => {
    const token = req.cookies.token;
    if (!token) return res.status(401).json({ message: "Unauthorized" });

    try {
        const user = jwt.verify(token, SECRET_KEY);
        res.json({ message: "Access granted", user });
    } catch (error) {
        res.status(403).json({ message: "Invalid token" });
    }
});
*/



/*

    async login(req, res) {
        try {
            const { email, password } = req.body;
            
            // 1️⃣ 유저 확인 (DB 조회)
            const user = await UserService.findByEmail(email);
            if (!user) {
                return res.status(401).json({ message: "Invalid credentials" });
            }

            // 2️⃣ 비밀번호 검증
            const isPasswordValid = await bcrypt.compare(password, user.password);
            if (!isPasswordValid) {
                return res.status(401).json({ message: "Invalid credentials" });
            }

            // 3️⃣ JWT 생성
            const token = jwt.sign(
                { userId: user.id, role: user.role },
                jwtSecretKey,
                { expiresIn: "1h" }
            );

            // 4️⃣ 헤더에 토큰 추가 (클라이언트에서 헤더를 읽을 수 있도록)
            res.setHeader("Authorization", `Bearer ${token}`);

            // 5️⃣ 응답 (토큰을 JSON으로도 반환)
            res.json({ message: "Login successful", token });
        } catch (error) {
            console.error("Login error:", error);
            res.status(500).json({ message: "Server error" });
        }
    }


*/