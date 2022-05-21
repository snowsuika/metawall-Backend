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
    // 有被 appError 攔截。自定義可預期錯誤
    if (err.isOperational) {
        err.message = err.message;
        err.statusCode = err.statusCode;
    }
    // 沒有被 appError 攔截。但可預期的 mongoose 欄位有誤
    else if (err.name === 'ValidationError' || err.name === 'CastError') {
        err.isOperational = true;
        err.message = 'id 或欄位格式錯誤';
        err.statusCode = 400;
    }
    //捕捉 SyntaxError 錯誤
    else if (err.name === 'SyntaxError') {
        err.isOperational = true;
        err.statusCode = 404;
        err.message = err.message;
    } else {
        err.statusCode = 500;
    }

    // dev
    switch (process.env.NODE_ENV) {
        case 'dev':
            return resErrorDev(err, res);

        case 'production':
            return resErrorProd(err, res);

        //預設 production
        default:
            return resErrorProd(err, res);
    }
};

module.exports = errorHandler;
