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
router.get(
    /**
     * #swagger.ignore = true
     */
    '/users',
    handleErrorAsyncWrapper(UsersControllers.getAllUsers)
);

/**
 *  POST (admin)
 */
router.post(
    /**
     * #swagger.ignore = true
     */
    '/user',
    handleErrorAsyncWrapper(UsersControllers.createUser)
);

/**
 *  PATCH (admin)
 */
router.patch(
    /**
     * #swagger.ignore = true
     */
    '/user/:id',
    handleErrorAsyncWrapper(UsersControllers.updateUser)
);

/**
 *  DELETE 單筆 (admin)
 */
router.delete(
    /**
     * #swagger.ignore = true
     */
    '/user/:id',
    handleErrorAsyncWrapper(UsersControllers.deleteOneUser)
);

/**
 *  取得個人資料
 */
router.get(
    /** #swagger.tags = ['User']
      * #swagger.description = '取得個人資料 API'
      * #swagger.security = [{
            "apiKeyAuth": []
        }]
      * #swagger.responses[200] = {
          description: '取得成功',
          schema: {
                      "status": "success",
                      "data": {
                          "_id": "62879351059803b16709db57",
                          "name": "snowChu",
                          "photo": "",
                          "sex": "female"
                      }
                }
        }
      */
    '/user/profile',
    handleErrorAsyncWrapper(isAuth),
    handleErrorAsyncWrapper(UsersControllers.getProfile)
);
/**
 *  更新個人資料
 */
router.patch(
    /** #swagger.tags = ['User']
      * #swagger.description = '更新個人資料 API'
      * #swagger.security = [{
            "apiKeyAuth": []
        }]
      * #swagger.parameters['body'] = {
          in: 'body',
          description: '資料格式',
          required: true,
          schema: {
                  "name": "snow_update",
                  "photo": "",
                  "sex": "female"
            }
        }
      * #swagger.responses[200] = {
          description: '更新成功',
          schema: {
                    "status": "success",
                    "data": {
                        "_id": "62879351059803b16709db57",
                        "name": "snow_update",
                        "photo": "",
                        "sex": "female"
                    }
            }
        }
      */
    '/user/profile',
    handleErrorAsyncWrapper(isAuth),
    handleErrorAsyncWrapper(UsersControllers.updateProfile)
);

module.exports = router;
