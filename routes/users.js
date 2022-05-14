var express = require('express');
var router = express.Router();
const UsersControllers = require('../controllers/user.js');
const handleErrorAsyncWrapper = require('../service/handleErrorAsync');

/**
 *  GET  全部
 */
router.get('/', handleErrorAsyncWrapper(UsersControllers.getAllUsers));

/**
 *  GET  單筆
 */
router.get('/:id', handleErrorAsyncWrapper(UsersControllers.getOneUser));
/**
 *  POST
 */
router.post('/', handleErrorAsyncWrapper(UsersControllers.createUser));

/**
 *  PATCH
 */
router.patch('/:id', handleErrorAsyncWrapper(UsersControllers.updateUser));

/**
 *  DELETE 單筆
 */
router.delete('/:id', handleErrorAsyncWrapper(UsersControllers.deleteOneUser));

module.exports = router;
