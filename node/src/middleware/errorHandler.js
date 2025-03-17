const errorHandler = (err, req, res, next) => {
    const statusCode = err.statusCode || 500; // 기본값 500
    if(Math.floor(statusCode/100)===5){ // 500~ 에러 콘솔 출력
        console.error(`[Error] ${err.message || "Undefined_Error"}`);
        console.error(`[Error.stack] ${err.stack}`);
    }
    res.status(statusCode).json({
        error: err.name || "Error",
        message: err.message || "Internal Server Error",
    });
};

module.exports = errorHandler;