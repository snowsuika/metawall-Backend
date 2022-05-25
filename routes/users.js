var express = require('express');
var router = express.Router();
// controllers
const UsersControllers = require('../controllers/user.js');

//service
const handleErrorAsyncWrapper = require('../service/handleErrorAsync');

// middlewares
const isAuth = require('../middlewares/isAuth');

/**
 *  取得個人資料 /user/profile
 */
router.get(
    /** #swagger.tags = ['User']
   * #swagger.summary = '取得個人資料'
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
 *  更新個人資料 /user/profile/:id
 */
router.patch(
    /** #swagger.tags = ['User']
   * #swagger.summary = '更新個人資料'
   * #swagger.description = '更新個人資料 API'
   * #swagger.security = [{
          "apiKeyAuth": []
      }]
   * #swagger.parameters['body'] = {
        in: 'body',
        description: '資料格式。sex : male;female',
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

/**
 *  GET  全部 (admin) /users
 */
router.get(
    /**
     * #swagger.ignore = true
     */
    '/users',
    handleErrorAsyncWrapper(UsersControllers.getAllUsers)
);

/**
 *  POST (admin) /user
 */
router.post(
    /**
     * #swagger.ignore = true
     */
    '/user',
    handleErrorAsyncWrapper(UsersControllers.createUser)
);

/**
 *  PATCH (admin) /user/:id
 */
router.patch(
    /**
     * #swagger.ignore = true
     */
    '/user/:id',
    handleErrorAsyncWrapper(UsersControllers.updateUser)
);

/**
 *  DELETE 單筆 (admin) /user/:id
 */
router.delete(
    /**
     * #swagger.ignore = true
     */
    '/user/:id',
    handleErrorAsyncWrapper(UsersControllers.deleteOneUser)
);

module.exports = router;
