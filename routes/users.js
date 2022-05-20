var express = require('express');
var router = express.Router();
// controllers
const AuthControllers = require('../controllers/auth.js');
const UsersControllers = require('../controllers/user.js');

//service
const handleErrorAsyncWrapper = require('../service/handleErrorAsync');

// middlewares
const isAuth = require('../middlewares/isAuth');

/**
 *  GET  全部 (admin)
 */
router.get('/users', handleErrorAsyncWrapper(UsersControllers.getAllUsers));

/**
 *  POST (admin)
 */
router.post('/user', handleErrorAsyncWrapper(UsersControllers.createUser));

/**
 *  PATCH (admin)
 */
router.patch('/user/:id', handleErrorAsyncWrapper(UsersControllers.updateUser));

/**
 *  DELETE 單筆 (admin)
 */
router.delete('/user/:id', handleErrorAsyncWrapper(UsersControllers.deleteOneUser));

/**
 *  取得個人資料
 */
router.get('/user/profile', handleErrorAsyncWrapper(isAuth), handleErrorAsyncWrapper(UsersControllers.getProfile));
/**
 *  更新個人資料
 */
router.post('/user/profile', handleErrorAsyncWrapper(isAuth), handleErrorAsyncWrapper(UsersControllers.updateProfile));

module.exports = router;
