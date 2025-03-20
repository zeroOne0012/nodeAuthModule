import customError from "../module/customError.js";

class userController{
    static #instance = null;
    #userService; // private

    constructor({userService}) {
        this.#userService = userService; // 외부에서 DI
    }

    login = async (req, res, next) => {
        try{
            const { id, password } = req.body;
            const token = await this.#userService.getAccessToken(id,password);
            // 헤더 토큰 추가
            res.setHeader("Authorization", `Bearer ${token}`);
            res.status(200).json({ message: "Login successful", token });
        } catch(e){
            next(e);
        }
    };

    getUser = async (req, res, next) => {
        try{
            const id = req.params.id;
            const user = await this.#userService.getUser(id);
            // res.status(200).json({id:user.id, nickname:user.nickname}); // 비밀번호 제외
            const {password, ...userDTO} = user;
            res.status(200).json(userDTO); // 비밀번호 제외
        } catch (e){
            next(e);
        }
    };

    register = async (req, res, next) =>{
        try{
            const id = req.body.id;
            const pswd = req.body.password;
            const nickname = req.body.nickname;
            if(!id || !pswd || !nickname){
                throw new customError(400, "Bad Request", "비어있는 항목이 있습니다.");
            }
            await this.#userService.register(id,pswd, nickname);
            res.status(201).json();
        } catch (e){
            next(e);
        }
    };
}

export default userController;