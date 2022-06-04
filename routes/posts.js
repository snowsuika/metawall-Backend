var express = require('express');
var router = express.Router();
const PostsControllers = require('../controllers/post.js');
const handleErrorAsyncWrapper = require('../service/handleErrorAsync');

// middlewares
const isAuth = require('../middlewares/isAuth');

/****************************************************************
 *  GET  取得全部貼文
 */
router.get(
    /**#swagger.tags = ['動態貼文 Post']
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
                          "_id": "6299c52fbb7de924368e9727",
                          "user": {
                              "_id": "628f9267392f24b2f7299cbd",
                              "name": "小華",
                              "photo": ""
                          },
                          "image": "https://s.yimg.com/uu/api/res/1.2/S6ODJbOoJdSQPH8KDkbOaQ--~B/aD0zOTk7dz01NzA7YXBwaWQ9eXRhY2h5b24-/https://media.zenfs.com/en/dailyview.tw/48371bf91d68b227435a5a5eb4eaed6e",
                          "content": "我是小華哈哈哈哈哈哈",
                          "createdAt": "2022-06-03T08:24:15.838Z",
                          "likes": [],
                          "comments": [],
                          "id": "6299c52fbb7de924368e9727"
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
    /**#swagger.tags = ['動態貼文 Post']
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
                          "_id": "6299c52fbb7de924368e9727",
                          "user": "628f9267392f24b2f7299cbd",
                          "image": "https://s.yimg.com/uu/api/res/1.2/S6ODJbOoJdSQPH8KDkbOaQ--~B/aD0zOTk7dz01NzA7YXBwaWQ9eXRhY2h5b24-/https://media.zenfs.com/en/dailyview.tw/48371bf91d68b227435a5a5eb4eaed6e",
                          "content": "我是小華哈哈哈哈哈哈",
                          "createdAt": "2022-06-03T08:24:15.838Z",
                          "likes": [],
                          "comments": [],
                          "id": "6299c52fbb7de924368e9727"
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
    /**#swagger.tags = ['動態貼文 Post']
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
                  "content": "貼文內容",
                  "image":"scared.jpg",
                  
            }
        }
     * #swagger.responses[200] = {
          description: '新增成功',
          schema: {
              "status": "success",
              "data": {
                  "_id": "62930ff80fb50ad3b77ba385",
                  "user": "628f9267392f24b2f7299cbd",
                  "image": "scared.jpg",
                  "content": "貼文內容",
                  "likes": [],
                  "createdAt": "2022-05-29T06:17:28.157Z",
                  "id": "62930ff80fb50ad3b77ba385"
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
    /**#swagger.tags = ['動態貼文 Post']
     * #swagger.summary = '更新貼文'
     * #swagger.description = '更新貼文 API'
     * #swagger.security = [{
          "apiKeyAuth": []
        }]
      * #swagger.parameters['postId'] = {
            in: 'path',
            description: '貼文 id',
            type: 'string',
            required: true,
      }
     * #swagger.parameters['body'] = {
          in: 'body',
          description: '資料格式',
          required: true,
          schema: {
                  "image":"scared.jpg",
                  "content": "更新貼文內容",
            }
        }
     * #swagger.responses[200] = {
          description: '更新成功',
          schema: {
              "status": "success",
              "data": {
                  "_id": "62930ff80fb50ad3b77ba385",
                  "user": "628f9267392f24b2f7299cbd",
                  "image": "scared.jpg",
                  "content": "來自小華 update",
                  "likes": [],
                  "createdAt": "2022-05-29T06:17:28.157Z",
                  "id": "62930ff80fb50ad3b77ba385"
              }
            }
        }
      */
    '/post/:postId',
    handleErrorAsyncWrapper(isAuth),
    handleErrorAsyncWrapper(PostsControllers.updatePosts)
);

/**
 *  DELETE 刪除單筆貼文
 */
router.delete(
    /**#swagger.tags = ['動態貼文 Post']
     * #swagger.summary = '刪除單筆貼文'
     * #swagger.description = '刪除單筆貼文 API'
     * #swagger.security = [{
          "apiKeyAuth": []
        }]
     * #swagger.parameters['postId'] = {
            in: 'path',
            description: '貼文 id',
            type: 'string',
            required: true,
      }
     * #swagger.responses[200] = {
          description: '刪除成功',
          schema: {
              "status": "success",
              "data": "貼文刪除成功！"
            }
        }
      */
    '/post/:postId',
    handleErrorAsyncWrapper(isAuth),
    handleErrorAsyncWrapper(PostsControllers.deleteOnePost)
);

/******************************************************************
 *  POST 貼文按讚
 */
router.post(
    /**#swagger.tags = ['動態貼文 Post']
          * #swagger.summary = '新增一則貼文的讚'
          * #swagger.description = '新增一則貼文的讚 API'
          * #swagger.security = [{
                "apiKeyAuth": []
              }]
          * #swagger.parameters['postId'] = {
                in: 'path',
                description: '貼文 id',
                type: 'string',
                required: true,
          }
          * #swagger.responses[200] = {
              description: '新增成功',
              schema: {
                  "status": "success",
                  "data": {
                      "_id": "62932c323e235d25404bccb1",
                      "user": "628f9251392f24b2f7299cba",
                      "image": "",
                      "content": "來自小明第四篇",
                      "likes": [
                          {
                              "user": "628f9267392f24b2f7299cbd",
                              "_id": "6299b7462c9caa5b2ab69e5d",
                              "createdAt": "2022-06-03T07:24:54.506Z"
                          }
                      ],
                      "createdAt": "2022-05-29T08:17:54.236Z",
                      "id": "62932c323e235d25404bccb1"
                  }
                }
              }
      */
    '/post/:postId/like',
    handleErrorAsyncWrapper(isAuth),
    handleErrorAsyncWrapper(PostsControllers.createLike)
);

/**
 *  DELETE 取消貼文按讚
 */
router.delete(
    /**#swagger.tags = ['動態貼文 Post']
          * #swagger.summary = '取消一則貼文的讚'
          * #swagger.description = '取消一則貼文的讚 API'
          * #swagger.security = [{
                "apiKeyAuth": []
              }]
          * #swagger.parameters['postId'] = {
                in: 'path',
                description: '貼文 id',
                type: 'string',
                required: true,
          }
          * #swagger.responses[200] = {
              description: '取消成功',
              schema: {
                  "status": "success",
                  "data": {
                      "_id": "62932c323e235d25404bccb1",
                      "user": "628f9251392f24b2f7299cba",
                      "image": "",
                      "content": "來自小明第四篇",
                      "likes": [],
                      "createdAt": "2022-05-29T08:17:54.236Z",
                      "id": "62932c323e235d25404bccb1"
                  }
                }
              }
      */
    '/post/:postId/like',
    handleErrorAsyncWrapper(isAuth),
    handleErrorAsyncWrapper(PostsControllers.deleteLike)
);

/****************************************************************
 *  新增貼文的留言
 */
router.post(
    /**#swagger.tags = ['動態貼文 Post']
          * #swagger.summary = '新增一則貼文的留言'
          * #swagger.description = '新增一則貼文的留言 API'
          * #swagger.security = [{
                "apiKeyAuth": []
              }]
          * #swagger.parameters['postId'] = {
                in: 'path',
                description: '貼文 id',
                type: 'string',
                required: true,
          }
          * #swagger.responses[200] = {
              description: '新增成功',
              schema: {
                      "status": "success",
                      "data": {
                          "user": "628f9267392f24b2f7299cbd",
                          "post": "62932c323e235d25404bccb1",
                          "comment": "新增評論測試0603",
                          "_id": "6299bd2ddd9566ae5eda4258",
                          "createdAt": "2022-06-03T07:50:05.093Z"
                      }
                }
              }
      */
    '/post/:postId/comment',
    handleErrorAsyncWrapper(isAuth),
    handleErrorAsyncWrapper(PostsControllers.cteateComment)
);

/**
 *  刪除貼文的留言
 */
router.delete(
    /**#swagger.tags = ['動態貼文 Post']
          * #swagger.summary = '刪除一則貼文的留言'
          * #swagger.description = '刪除一則貼文的留言 API'
          * #swagger.security = [{
                "apiKeyAuth": []
              }]
          * #swagger.parameters['postId'] = {
                in: 'path',
                description: '貼文 id',
                type: 'string',
                required: true,
          }
          * #swagger.parameters['commentId'] = {
                in: 'path',
                description: '留言 id',
                type: 'string',
                required: true,
          }
          * #swagger.responses[200] = {
              description: '刪除成功',
              schema: {
                      "status": "success",
                      "data": '刪除留言成功！'
                }
              }
      */
    '/post/:postId/comment/:commentId',
    handleErrorAsyncWrapper(isAuth),
    handleErrorAsyncWrapper(PostsControllers.deleteComment)
);

/****************************************************************
 *  取得個人所有貼文
 */
router.get(
    /**#swagger.tags = ['動態貼文 Post']
          * #swagger.summary = '取得個人所有貼文列表'
          * #swagger.description = '取得個人所有貼文列表 API'
          * #swagger.security = [{
                "apiKeyAuth": []
              }]
          * #swagger.parameters['userId'] = {
                in: 'path',
                description: '使用者 id',
                type: 'string',
                required: true,
          }
          * #swagger.responses[200] = {
              description: '取得成功',
              schema: {
                    "status": "success",
                    "data": [
                        {
                            "_id": "62932c323e235d25404bccb1",
                            "user": {
                                "_id": "628f9251392f24b2f7299cba",
                                "name": "小明",
                                "photo": ""
                            },
                            "image": "",
                            "content": "來自小明第四篇",
                            "likes": [],
                            "createdAt": "2022-05-29T08:17:54.236Z",
                            "comments": [],
                            "id": "62932c323e235d25404bccb1"
                        }
                      ]
                }
              }
      */
    '/post/user/:userId',
    handleErrorAsyncWrapper(isAuth),
    handleErrorAsyncWrapper(PostsControllers.getPersonalPosts)
);

module.exports = router;
