class AppError extends Error {
    constructor(message, statusCode) {
        super(message);
        this.statusCode = statusCode;
        this.status = `${statusCode}`.startsWith('4') ? 'fail' : 'error';
        this.isOperational = true;
        // 當 catch 到 error 時會取得 error.stack
        Error.captureStackTrace(this, this.constructor); //Stack Trace 堆疊追蹤
    }
}
module.exports = AppError;
