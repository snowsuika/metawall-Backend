var express = require('express');
var router = express.Router();
// controllers
const UploadControllers = require('../controllers/upload.js');

//service
const handleErrorAsyncWrapper = require('../service/handleErrorAsync');

// middlewares
const isAuth = require('../middlewares/isAuth');
const upload = require('../middlewares/upload');

/**
 *  上傳貼文圖片
 */
router.post(
    /**#swagger.tags = ['Upload']
     * #swagger.summary = '上傳圖片'
     * #swagger.description = '上傳圖片 API'
     * #swagger.consumes = ['multipart/form-data'] 
     * #swagger.parameters['singleFile'] = {
            in: 'formData',
            type: 'file',
            required: true,
            description: '資料格式',
      }
     * #swagger.responses[200] = {
          description: '上傳成功',
          schema: {
                "status": "success",
                "data": {
                    "status": "success",
                    "imgUrl": "https://i.imgur.com/sDZNjwH.png"
                }
                }
        }
     */
    '/uploadImage',
    handleErrorAsyncWrapper(isAuth),
    upload,
    handleErrorAsyncWrapper(UploadControllers.uploadImage)
);
/**
 *  上傳使用者頭像
 */
router.post(
    /**#swagger.tags = ['Upload']
   * #swagger.summary = '上傳使用者頭像'
   * #swagger.description = '上傳使用者頭像 API'
   * #swagger.consumes = ['multipart/form-data'] 
   * #swagger.parameters['singleFile'] = {
        in: 'formData',
        type: 'file',
        required: true,
        description: '資料格式',
      }
   * #swagger.responses[200] = {
        description: '上傳成功',
        schema: {
              "status": "success",
              "data": {
                  "status": "success",
                  "imgUrl": "https://i.imgur.com/sDZNjwH.png"
              }
              }
      }
   */
    '/uploadAvatar',
    handleErrorAsyncWrapper(isAuth),
    upload,
    handleErrorAsyncWrapper(UploadControllers.uploadAvatar)
);

module.exports = router;
