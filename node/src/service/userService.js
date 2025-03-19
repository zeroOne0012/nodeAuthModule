const bcrypt = require("bcrypt");
const customError = require("../module/customError");
const JwtUtil = require("../module/jwtUtil");
const UserRepository = require("../repository/userRepository");

class userService{
    #jwtUtil;
    #userRepository;

    constructor({jwtUtil, userRepository}){
        this.#jwtUtil = jwtUtil;
        this.#userRepository = userRepository;
    }

    hashPw = async (password) => {
        const salt = 10;
        // const salt_ = await bcrypt.genSalt(salt);
        return await bcrypt.hash(password, salt);
    };

    comparePw = async (password, hashedPassword) =>{
        return await bcrypt.compare(password,hashedPassword);
    };

    getAccessToken = async (id,pswd)=>{
        // id,pswd 확인
        const user = await this.#userRepository.findUserById(id);
        if(!user){
            throw new customError(404, "Not Found", "Wrong pswd or id");
        }

        // pswd
        if(!await this.comparePw(pswd, user.password)){
            throw new customError(404, "Not Found", "Wrong pswd or id");
        }

        // 페이로드
        const payload = {
            id: user.id,
            nickname: user.nickname,
            role_id: user.role_id,
            role: user.role
        };

        const token = await this.#jwtUtil.generateToken(payload);
        if(!token){
            throw new Error();
        }
        return token;
    };

    getUser = async (id) => {
        const user = await this.#userRepository.findUserById(id);
        if(!user){
            throw new customError(404, "Not Found", "User with this ID not found");
        }
        return user;
    };
    
    register = async (id, pswd, nickname)=>{
        const pswdHashed = await this.hashPw(pswd);
        await this.#userRepository.create(id, pswdHashed, nickname);
    }
}

module.exports = userService;

