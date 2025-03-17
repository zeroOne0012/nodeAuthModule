const pool = require("../module/pool");
const customError = require("../module/customError");


class userRepository{
    static #instance = null;
    constructor(){}
    static getInstance = () => {
        if(!userRepository.#instance){
            userRepository.#instance = new userRepository();
        }
        return userRepository.#instance;
    };

    getUserById = async (id) =>{
        try{
            const query = "SELECT * FROM USERS WHERE id = $1";
            const {rows} = await pool.query(query, [id]);
            if(rows.length===0){
                throw new customError(404, "Not Found", "User with ID not found");
            }
            return rows[0];
        }catch(e){
            throw e;
        }
    }
}

module.exports = userRepository;