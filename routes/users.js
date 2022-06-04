var express = require('express');
var router = express.Router();
// controllers
const UsersControllers = require('../controllers/user.js');

//service
const handleErrorAsyncWrapper = require('../service/handleErrorAsync');

// middlewares
const isAuth = require('../middlewares/isAuth');

/****************************************************************
 *  取得個人資料 /user/profile
 */
router.get(
    /** #swagger.tags = ['會員功能 User']
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
    /** #swagger.tags = ['會員功能 User']
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
/****************************************************************
 *  取得個人按讚列表 /user/likeList
 */
router.get(
    /** #swagger.tags = ['會員按讚追蹤動態 User']
     * #swagger.summary = '取得個人按讚列表'
     * #swagger.description = '取得個人按讚列表 API'
     * #swagger.security = [{
            "apiKeyAuth": []
        }]

      * #swagger.responses[200] = {
          description: '更新成功',
          schema: {
                    "status": "success",
                    "data": [
                        {
                            "_id": "628f92a3392f24b2f7299cc6",
                            "user": {
                                "_id": "628f921f392f24b2f7299cb7",
                                "name": "snow",
                                "photo": ""
                            },
                            "createdAt": "2022-05-26T14:45:55.987Z"
                        },
                        {
                            "_id": "62932c323e235d25404bccb1",
                            "user": {
                                "_id": "628f9251392f24b2f7299cba",
                                "name": "小明",
                                "photo": ""
                            },
                            "createdAt": "2022-05-29T08:17:54.236Z"
                        }
                    ]
                    }
            }
        }
      */
    '/user/likeList',
    handleErrorAsyncWrapper(isAuth),
    handleErrorAsyncWrapper(UsersControllers.getLikeList)
);

/****************************************************************
 *  取得個人追蹤名單 /user/following
 */
router.get(
    /** #swagger.tags = ['會員按讚追蹤動態 User']
       * #swagger.summary = '取得個人追蹤名單'
       * #swagger.description = '取得個人追蹤名單 API'
       * #swagger.security = [{
              "apiKeyAuth": []
          }]

        * #swagger.responses[200] = {
            description: '追蹤成功',
            schema: {
                      "status": "success",
                      "data": "您已成功追蹤！"
                    }
              }
          }
        */
    '/user/following',
    handleErrorAsyncWrapper(isAuth),
    handleErrorAsyncWrapper(UsersControllers.getFollowingList)
);

/**
 *  追蹤朋友  /user/following/:userId
 */
router.post(
    /** #swagger.tags = ['會員按讚追蹤動態 User']
       * #swagger.summary = '追蹤朋友'
       * #swagger.description = '追蹤朋友 API'
       * #swagger.security = [{
              "apiKeyAuth": []
          }]

        * #swagger.responses[200] = {
            description: '追蹤成功',
            schema: {
                      "status": "success",
                      "data": "您已成功追蹤！"
                    }
              }
          }
        */
    '/user/following/:userId',
    handleErrorAsyncWrapper(isAuth),
    handleErrorAsyncWrapper(UsersControllers.createFollow)
);
/**
 *  取消追蹤朋友  /user/following/:userId
 */
router.delete(
    /** #swagger.tags = ['會員按讚追蹤動態 User']
       * #swagger.summary = '取消追蹤朋友'
       * #swagger.description = '取消追蹤朋友 API'
       * #swagger.security = [{
              "apiKeyAuth": []
          }]

        * #swagger.responses[200] = {
            description: '追蹤成功',
            schema: {
                      "status": "success",
                      "data": "您已成功取消追蹤！"
                    }
              }
          }
      */
    '/user/following/:userId',
    handleErrorAsyncWrapper(isAuth),
    handleErrorAsyncWrapper(UsersControllers.deleteFollow)
);

module.exports = router;
