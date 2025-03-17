const bcrypt = require("bcrypt");
const customError = require("../module/customError");
const JwtUtil = require("../module/jwtUtil");
const UserRepository = require("../repository/userRepository");

class userService{
    static #instance = null;
    #jwtUtil;
    #userRepository;

    constructor(){
        this.#jwtUtil = JwtUtil.getInstance();
        this.#userRepository = UserRepository.getInstance();
    }

    static getInstance = ()=>{
        if(!userService.#instance){
            userService.#instance = new userService();
        }
        return userService.#instance;
    };

    hashPw = async (password) => {
        const salt = 10;
        // const salt_ = await bcrypt.genSalt(salt);
        return await bcrypt.hash(password, salt);
    };

    comparePw = async (password, hashedPassword) =>{
        return await bcrypt.compare(password,hashedPassword);
    };

    login = async (id,pswd)=>{
        // console.log(id," ",pswd);
        // id/pswd 검증 필요
        const token = await this.#jwtUtil.generateToken({id:id, pswd:pswd});
        // header 설정 필요
        return token;
    };

    getUser = async (id) => {
        const user = await this.#userRepository.getUserById(id);
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

