var express = require('express');
var router = express.Router();
const PostsControllers = require('../controllers/post.js');
const handleErrorAsyncWrapper = require('../service/handleErrorAsync');

// middlewares
const isAuth = require('../middlewares/isAuth');

/**
 *  GET  全部
 */
router.get(
    /** #swagger.tags = ['Post']
      * #swagger.description = '取得所有貼文 API'
      * #swagger.security = [{
            "apiKeyAuth": []
        }]
      * #swagger.responses[200] = {
          description: '取得成功',
          schema: {
                    "status": "success",
                    "data": [
                        {
                            "_id": "628793ae059803b16709db60",
                            "user": {
                                "_id": "62879351059803b16709db57",
                                "name": "snowChu",
                                "photo": ""
                            },
                            "image": "",
                            "content": "123",
                            "likes": 0,
                            "createdAt": "2022-05-20T13:12:14.229Z"
                        }
                      ]
                }
        }
      */
    '/posts',
    handleErrorAsyncWrapper(isAuth),
    handleErrorAsyncWrapper(PostsControllers.getAllPost)
);

/**
 *  GET  單筆
 */
router.get(
    /** #swagger.tags = ['Post']
      * #swagger.description = '取得單筆貼文 API'
      * #swagger.security = [{
            "apiKeyAuth": []
        }]
      * #swagger.responses[200] = {
          description: '取得成功',
          schema: {
                    "status": "success",
                    "data": {
                        "_id": "628793ae059803b16709db60",
                        "user": "62879351059803b16709db57",
                        "image": "",
                        "content": "123",
                        "likes": 0,
                        "createdAt": "2022-05-20T13:12:14.229Z"
                    }
                }
        }
      */
    '/post/:id',
    handleErrorAsyncWrapper(isAuth),
    handleErrorAsyncWrapper(PostsControllers.getOnePost)
);
/**
 *  POST
 */
router.post(
    /**#swagger.tags = ['Post']
      * #swagger.description = '新增貼文 API'
      * #swagger.security = [{
            "apiKeyAuth": []
        }]
      * #swagger.responses[200] = {
          description: '新增成功',
          schema: {
                "status": "success",
                "data": {
                    "user": "62879351059803b16709db57",
                    "image": "",
                    "content": "123",
                    "likes": 0,
                    "_id": "6288fa2202e00d3684ac6ace",
                    "createdAt": "2022-05-21T14:41:38.744Z"
                }
                }
        }
      */
    '/post',
    handleErrorAsyncWrapper(isAuth),
    handleErrorAsyncWrapper(PostsControllers.createPost)
);

/**
 *  PATCH
 */
router.patch(
    /** #swagger.tags = ['Post']
      * #swagger.description = '更新貼文 API'
      * #swagger.security = [{
            "apiKeyAuth": []
        }]
      * #swagger.parameters['body'] = {
          in: 'body',
          description: '資料格式',
          required: true,
          schema: {
                  "content": "更新貼文內容",
            }
        }
      * #swagger.responses[200] = {
          description: '更新成功',
          schema: {
              "status": "success",
              "data": {
                  "_id": "628793ae059803b16709db60",
                  "user": "62879351059803b16709db57",
                  "image": "",
                  "content": "update",
                  "likes": 0,
                  "createdAt": "2022-05-20T13:12:14.229Z"
              }
            }
        }
      */
    '/post/:id',
    handleErrorAsyncWrapper(isAuth),
    handleErrorAsyncWrapper(PostsControllers.updatePosts)
);

/**
 *  DELETE 單筆
 */
router.delete(
    /** #swagger.tags = ['Post']
      * #swagger.description = '刪除單筆貼文 API'
      * #swagger.security = [{
            "apiKeyAuth": []
        }]
      * #swagger.responses[200] = {
          description: '刪除成功',
          schema: {
              "status": "success",
              "data": [
                        {
                            "_id": "6283c0dcfb8f95c46ed58add",
                            "user": "627fcf682b04effce0812d0e",
                            "image": "",
                            "content": "123",
                            "likes": 0,
                            "createdAt": "2022-05-17T15:35:56.445Z"
                        }
                    ]
            }
        }
      */
    '/post/:id',
    handleErrorAsyncWrapper(isAuth),
    handleErrorAsyncWrapper(PostsControllers.deleteOnePost)
);

/**
 *  DELETE 多筆
 */
router.delete(
    /** #swagger.tags = ['Post']
      * #swagger.description = '刪除全部貼文 API'
      * #swagger.security = [{
            "apiKeyAuth": []
        }]
      * #swagger.responses[200] = {
          description: '刪除成功',
          schema: {
              "status": "success",
              "data": []
            }
        }
      */
    '/posts',
    handleErrorAsyncWrapper(isAuth),
    handleErrorAsyncWrapper(PostsControllers.deleteAllPost)
);

module.exports = router;
