const authService = require("../service/authService");

class userController{
    login = async (req, res) => {
        try{
            const testR = await authService.hashPw("TEST");
            console.log("22",testR);
            res.status(200).json({message: testR});
        } catch(e){
            res.status(500).json({message: e});
        }
    };



}

module.exports = new userController;