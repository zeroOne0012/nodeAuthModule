const UserService = require("../service/userService");

class userController{
    static instance = null;
    #userService; // private

    constructor() {
        this.#userService = UserService.getInstance();
    }

    static getInstance = ()=>{
        if(!userController.instance){
            userController.instance = new userController();
        }
        return userController.instance;
    };

    login = async (req, res, next) => {
        try{
            const id = req.body.id;
            const pswd = req.body.password;
            const resDTO = await this.#userService.login(id,pswd);
            res.status(200).json({resDTO});
        } catch(e){
            next(new Error("userService_error"));
        }
    };
}

module.exports = userController;