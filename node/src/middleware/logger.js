const logger = (req, res, next) => {
    // 전처리 로그
    console.log(`[Request] ${req.method} ${req.url} - ${new Date().toLocaleString("ko-KR", { timeZone: "Asia/Seoul" })}`);

    // 후처리 로그
    res.on("finish", () => {
        console.log(`[Response] ${res.statusCode} - ${req.method} ${req.url}`);
    });

    next();
};

module.exports = logger;