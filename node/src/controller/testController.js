
class testController{
    test = async (req, res) => {
        res.status(200).json({message: "모두 접근 가능"});
    };
    test2 = async (req, res) => {
        res.status(200).json({message: "로그인 후 접근 가능"});
    };
    test3 = async (req, res) => {
        res.status(200).json({message: "관리자만 접근 가능"});
    };
}

module.exports = new testController;