var express = require('express');
var router = express.Router();
const PostsControllers = require('../controllers/post.js');
const handleErrorAsyncWrapper = require('../service/handleErrorAsync');
/**
 *  GET  全部
 */
router.get('/', handleErrorAsyncWrapper(PostsControllers.getAllPost));

/**
 *  GET  單筆
 */
router.get('/:id', handleErrorAsyncWrapper(PostsControllers.getOnePost));
/**
 *  POST
 */
router.post('/', handleErrorAsyncWrapper(PostsControllers.createPost));

/**
 *  PATCH
 */
router.patch('/:id', handleErrorAsyncWrapper(PostsControllers.updatePosts));

/**
 *  DELETE 單筆
 */
router.delete('/:id', handleErrorAsyncWrapper(PostsControllers.deleteOnePost));

/**
 *  DELETE 多筆
 */
router.delete('/', handleErrorAsyncWrapper(PostsControllers.deleteAllPost));

module.exports = router;
