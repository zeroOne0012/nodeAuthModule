const customError = require("../module/customError");

class userRepository{
    #pool;

    constructor({pool}){
        this.#pool = pool;
    }

    findUserById = async (id) =>{
        try{
            const query = `
            SELECT 
                u.id, 
                u.nickname, 
                u.password,
                r.role_name
            FROM users u
            LEFT JOIN roles r ON u.role_id = r.id
            WHERE u.id = $1;
            `;
            const {rows} = await this.#pool.query(query, [id]);
            return rows[0];
        }catch(e){
            throw new Error(`Internal Server Error: ${e}`);
        }
    };

    create = async (id, password, nickname) => {
        try{
            const query = "INSERT INTO USERS(id, password, nickname) VALUES($1, $2, $3) RETURNING *;";
            const {rows} = await this.#pool.query(query, [id, password, nickname]);
            return rows[0];
        }catch(e){
            throw new customError(409, "Conflict", "User with this ID already exists");
        }
    };
}

module.exports = userRepository;