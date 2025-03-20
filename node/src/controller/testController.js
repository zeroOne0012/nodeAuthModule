
class testController{
    test = async (req, res) => {
        res.status(200).json({message: "관리자 접근 가능"});
    };
    test2 = async (req, res) => {
        res.status(200).json({message: "특정 회원 접근 가능"});
    };
    test3 = async (req, res) => {
        res.status(200).json({message: "모두 접근 가능"});
    };
}

export default new testController;