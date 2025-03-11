class customError extends Error {
    constructor(statusCode, type, message) {
        super(message);
        this.statusCode = statusCode;
        this.type = type;
    }
}

module.exports = customError;