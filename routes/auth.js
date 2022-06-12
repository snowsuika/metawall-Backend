const express = require('express');
const router = express.Router();
const passport = require('passport');

// controllers
const AuthControllers = require('../controllers/auth.js');

// middlewares
const isAuth = require('../middlewares/isAuth');

// service
const { generateUrlJWT } = require('../service/auth');

/**
 *  註冊
 */
router.post(
    /**#swagger.tags = ['註冊登入、改密碼 Auth']
     * #swagger.summary = '註冊新會員'
     * #swagger.description = '註冊新會員 API'
     * #swagger.parameters['body'] = {
        in: 'body',
          description: '資料格式',
          required: true,
          schema: {
                "$name":"snow",
                "$email":"snow@gmail.com",
                "$password":"abcd12345",
                "$confirmPassword":"abcd12345",
                "$sex":"female",
                "photo":""
            }
        }
     * #swagger.responses[200] = {
          description: '註冊成功',
          schema: {
                    "status": "success",
                    "data": {
                        "name": "snow",
                        "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYyODhiMDE3ZDkyZTU0NTIxNWJlZGFkOCIsImlhdCI6MTY1MzEyNTE0MywiZXhwIjoxNjUzNzI5OTQzfQ.NCBwgh2jc4a_DrMoDlDM8dgIlvY6dqZmpMkeSGXB4x4"
                    }
                }
        }
     */
    '/register',
    AuthControllers.register
);

/**
 *  登入
 */
router.post(
    /**#swagger.tags = ['註冊登入、改密碼 Auth']
     * #swagger.summary = '會員登入'
     * #swagger.description = '會員登入 API'
     * #swagger.parameters['body'] = {
          in: 'body',
          description: '資料格式',
          required: true,
          schema: {
                "$email":"snow@gmail.com",
                "$password":"abcd1234"
            }
        }
     * #swagger.responses[200] = {
          description: '註冊成功',
          schema: {
                    "status": "success",
                    "data": {
                        "name": "snow",
                        "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYyODc5MzUxMDU5ODAzYjE2NzA5ZGI1NyIsImlhdCI6MTY1MzE0MjE4NSwiZXhwIjoxNjUzNzQ2OTg1fQ.2f2wdB84w1B-b1nobRSN6t4h9oB2dTmYUSEC8yJooQU"
                    }
                }
        }
     */
    '/login',
    AuthControllers.login
);

/**
 *  更新密碼
 */
router.post(
    /**#swagger.tags = ['註冊登入、改密碼 Auth']
     * #swagger.summary = '更新密碼'
     * #swagger.description = '更改密碼 API'
     * #swagger.security = [{
            "apiKeyAuth": []
        }]
     * #swagger.parameters['body'] = {
          in: 'body',
          description: '資料格式',
          required: true,
          schema: {
                    "$password":"1231",
                    "$confirmPassword":"1231"
            }
        }
      * #swagger.responses[200] = {
          description: '更新密碼成功',
          schema: {
                    "status": "success",
                    "data": {
                        "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYyODc5MzUxMDU5ODAzYjE2NzA5ZGI1NyIsImlhdCI6MTY1MzE0MjMxMiwiZXhwIjoxNjUzNzQ3MTEyfQ.YkUQROOjX36htQNgGpop5_vq-I_IgUh04HPiX24SYO4"
                    }
                }
        }
     */
    '/updatePassword',
    isAuth,
    AuthControllers.updatePassword
);

/********************************************************************************************
 *  Google 第三方登入
 */

// 指定 google 驗證策略驗證請求
router.get(
    /**
     * #swagger.ignore = true
     */
    '/google',
    passport.authenticate('google', { scope: ['email', 'profile'] })
);

// 設定已授權的重新導向 URI
router.get(
    /**
     * #swagger.ignore = true
     */
    '/google/callback',
    passport.authenticate('google', { session: false }),
    (req, res, next) => generateUrlJWT(req.user, res)
);

module.exports = router;
