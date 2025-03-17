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
            return rows[0];
        }catch(e){
            throw new Error(`Internal Server Error: ${e}`);
        }
    };

    create = async (id, pswd, nickname) => {
        try{
            const query = "INSERT INTO USERS(id, password, nickname) VALUES($1, $2, $3) RETURNING *;";
            const {rows} = await pool.query(query, [id, pswd, nickname]);
            return rows[0];
        }catch(e){
            throw new customError(409, "Conflict", "User with this ID already exists");
        }
    };
}

module.exports = userRepository;