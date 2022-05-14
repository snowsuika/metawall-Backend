var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var cors = require('cors'); // 解決跨域問題

// router
var postRouter = require('./routes/posts');
var userRouter = require('./routes/users');

// middlewares
const errorHandler = require('./middlewares/errorHandler.js');

// 處理未捕獲的異常，沒有寫 try catch
process.on('uncaughtException', (err, origin) => {
    console.error('======== uncaught Exception! =========');
    console.log(err);
    process.exit(1); //用於結束 process 的方法
});

require('./connections');
var app = express();

app.use(cors());
app.use(logger('dev'));
app.use(express.json({ limit: '1mb' }));
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use('/', express.static(path.join(__dirname, 'public')));

app.use('/posts', postRouter);
app.use('/users', userRouter);

// 未匹配到路由，顯示 404 Not Found
app.use((req, res, next) => {
    res.status(404);
    res.send({
        status: 'error',
        message: '404 Not Found',
    });
    res.end();
    next();
});

// 統一管理錯誤
app.use(errorHandler);

// 有使用到 promise。處理沒有捕獲到的 catch
process.on('unhandledRejection', (reason, promise) => {
    console.log('====== 沒有捕獲到的 catch =====');
    console.log('Unhandled Rejection at:', promise, 'reason:', reason);
});

module.exports = app;
