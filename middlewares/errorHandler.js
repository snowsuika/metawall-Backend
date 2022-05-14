// 開發環境錯誤
const resErrorDev = (err, res) => {
    res.status(err.statusCode);
    res.send({
        status: err.status,
        message: err.message,
        error: err,
        stack: err.stack,
    });
};

// 正式環境錯誤
const resErrorProd = (err, res) => {
    // 可預期的錯誤
    if (err.isOperational) {
        res.status(err.statusCode);
        res.send({
            status: 'error',
            message: err.message,
        });
    } else {
        console.error('出現重大錯誤', err);
        // 送出罐頭預設訊息
        res.status(500);
        res.send({
            status: 'error',
            message: '系統錯誤，請恰系統管理員',
        });
    }
};

// export 錯誤處理 function
const errorHandler = (err, req, res, next) => {
    err.statusCode = err.statusCode || 500;

    // dev
    switch (process.env.NODE_ENV) {
        case 'dev':
            return resErrorDev(err, res);

        case 'production':
            // mongoose 欄位格式有誤
            if (err.name === 'ValidationError' || err.name === 'CastError') {
                err.isOperational = true;
                err.message = '資料欄位未填寫正確，請重新輸入！';
                return resErrorProd(err, res);
            }
            return resErrorProd(err, res);

        //預設 production
        default:
            return resErrorProd(err, res);
    }
};

module.exports = errorHandler;
