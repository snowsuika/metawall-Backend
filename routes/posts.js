var express = require('express');
var router = express.Router();
const PostsControllers = require('../controllers/post.js');
const handleErrorAsyncWrapper = require('../service/handleErrorAsync');

// middlewares
const isAuth = require('../middlewares/isAuth');

/**
 *  GET  取得全部貼文
 */
router.get(
    /**#swagger.tags = ['Post']
     * #swagger.summary = '取得所有貼文 API'
     * #swagger.description = '取得所有貼文 API'
     * #swagger.security = [{
          "apiKeyAuth": []
        }]
     * #swagger.parameters['keyword'] = {
          in: 'query',
          description: '貼文關鍵字查詢',
          type: 'string',
          required: false,
      }
     * #swagger.parameters['sort'] = {
            in: 'query',
            description: '貼文排序 (新 -> 舊:desc ; 舊 -> 新 :asc ; 預設 desc)',
            type: 'string',
            required: false,
      }
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
 *  GET  取得單筆貼文
 */
router.get(
    /** #swagger.tags = ['Post']
      * #swagger.summary = '取得單筆貼文'
      * #swagger.description = '取得單筆貼文 API'
      * #swagger.security = [{
            "apiKeyAuth": []
        }]
      * #swagger.parameters['id'] = {
            in: 'path',
            description: '貼文 id',
            type: 'string',
            required: true,
      }
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
 *  POST 新增貼文
 */
router.post(
    /**#swagger.tags = ['Post']
     * #swagger.summary = '新增貼文'
     * #swagger.description = '新增貼文 API'
     * #swagger.security = [{
            "apiKeyAuth": []
        }]
     * #swagger.parameters['body'] = {
          in: 'body',
          description: '資料格式',
          required: true,
          schema: {
                    "user":"62879351059803b16709db57",
                    "content":"123",
                    "image":""
            }
        }
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
 *  PATCH 更新貼文
 */
router.patch(
    /**#swagger.tags = ['Post']
     * #swagger.summary = '更新貼文'
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
 *  DELETE 刪除單筆貼文
 */
router.delete(
    /** #swagger.tags = ['Post']
     * #swagger.summary = '刪除單筆貼文'
     * #swagger.description = '刪除單筆貼文 API'
     * #swagger.security = [{
          "apiKeyAuth": []
        }]
     * #swagger.parameters['id'] = {
            in: 'path',
            description: '貼文 id',
            type: 'string',
            required: true,
      }
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
 *  DELETE 刪除全部貼文
 */
router.delete(
    /** #swagger.tags = ['Post']
     * #swagger.summary = '刪除全部貼文'
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

/**
 *  POST 貼文增加 like
 */
router.post(
    /** #swagger.tags = ['Post']
      * #swagger.summary = '新增貼文 like'
      * #swagger.description = '新增貼文 like API'
      * #swagger.security = [{
            "apiKeyAuth": []
          }]
      * #swagger.parameters['id'] = {
            in: 'path',
            description: '貼文 id',
            type: 'string',
            required: true,
      }
      * #swagger.responses[200] = {
          description: '新增成功',
          schema: {
            "status": "success",
            "data": [
                {
                    "_id": "628bb1ed0393677f3b363d5e",
                    "user": {
                        "_id": "6289c7f495b59512e12e4b5e",
                        "name": "snow_upate",
                        "photo": ""
                    },
                    "image": "",
                    "content": "123",
                    "likes": [],
                    "createdAt": "2022-05-23T16:10:21.102Z"
                }
            ]
            }
          }
 */
    '/post/:id/likes',
    handleErrorAsyncWrapper(isAuth),
    handleErrorAsyncWrapper(PostsControllers.createLike)
);

/**
 *  DELETE 取消貼文按讚
 */
router.delete(
    /** #swagger.tags = ['Post']
    * #swagger.summary = '取消貼文按讚'
    * #swagger.description = '取消貼文按讚 API'
    * #swagger.security = [{
          "apiKeyAuth": []
        }]
    * #swagger.parameters['id'] = {
          in: 'path',
          description: '貼文 id',
          type: 'string',
          required: true,
    }
    * #swagger.responses[200] = {
        description: '新增成功',
        schema: {
          "status": "success",
          "data": [
              {
                  "_id": "628bb1ed0393677f3b363d5e",
                  "user": {
                      "_id": "6289c7f495b59512e12e4b5e",
                      "name": "snow_upate",
                      "photo": ""
                  },
                  "image": "",
                  "content": "123",
                  "likes": [],
                  "createdAt": "2022-05-23T16:10:21.102Z"
              }
          ]
          }
        }
*/
    '/post/:id/likes',
    handleErrorAsyncWrapper(isAuth),
    handleErrorAsyncWrapper(PostsControllers.deleteLike)
);

/**
 *  取得某個使用者的 comment
 */
router.get(
    '/post/:id/comments',
    handleErrorAsyncWrapper(isAuth),
    handleErrorAsyncWrapper(PostsControllers.getComments)
);

/**
 *  新增貼文的 comment
 */
router.post(
    '/post/:id/comment',
    handleErrorAsyncWrapper(isAuth),
    handleErrorAsyncWrapper(PostsControllers.cteateComment)
);

module.exports = router;
