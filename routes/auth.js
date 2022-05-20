var express = require('express');
var router = express.Router();
const AuthControllers = require('../controllers/auth.js');
const handleErrorAsyncWrapper = require('../service/handleErrorAsync');

// middlewares
const isAuth = require('../middlewares/isAuth');

/**
 *  註冊
 */
router.post('/register', handleErrorAsyncWrapper(AuthControllers.register));

/**
 *  登入
 */
router.post('/login', handleErrorAsyncWrapper(AuthControllers.login));

/**
 *  更新密碼
 */
router.post(
    '/updatePassword',
    handleErrorAsyncWrapper(isAuth),
    handleErrorAsyncWrapper(AuthControllers.updatePassword)
);

module.exports = router;
