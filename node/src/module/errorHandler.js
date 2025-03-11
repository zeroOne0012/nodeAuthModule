const errorHandler = (err, req, res, next) => {
    console.error(`[Error] ${err.message}`);

    const statusCode = err.statusCode || 500; // 기본값 500
    res.status(statusCode).json({
        error: err.name || "Error",
        message: err.message || "Internal Server Error",
    });
};

module.exports = errorHandler;