var express = require('express');
var router = express.Router();
const PostsControllers = require('../controllers/post.js');
const handleErrorAsyncWrapper = require('../service/handleErrorAsync');

// middlewares
const isAuth = require('../middlewares/isAuth');

/**
 *  GET  全部
 */
router.get('/posts', handleErrorAsyncWrapper(isAuth), handleErrorAsyncWrapper(PostsControllers.getAllPost));

/**
 *  GET  單筆
 */
router.get('/post/:id', handleErrorAsyncWrapper(isAuth), handleErrorAsyncWrapper(PostsControllers.getOnePost));
/**
 *  POST
 */
router.post('/post', handleErrorAsyncWrapper(isAuth), handleErrorAsyncWrapper(PostsControllers.createPost));

/**
 *  PATCH
 */
router.patch('/post/:id', handleErrorAsyncWrapper(isAuth), handleErrorAsyncWrapper(PostsControllers.updatePosts));

/**
 *  DELETE 單筆
 */
router.delete('/post/:id', handleErrorAsyncWrapper(isAuth), handleErrorAsyncWrapper(PostsControllers.deleteOnePost));

/**
 *  DELETE 多筆
 */
router.delete('/posts', handleErrorAsyncWrapper(isAuth), handleErrorAsyncWrapper(PostsControllers.deleteAllPost));

module.exports = router;
