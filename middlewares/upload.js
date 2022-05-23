const multer = require('multer');
const path = require('path');
const appError = require('../service/appError');

const upload = multer({
    // 限制上傳的大小
    limits: {
        fileSize: 2 * 1024 * 1024, //限制圖片大小為 2MB
    },
    // 過濾器，控制哪些文件可以被接受。需調用 cb ，來決定是否要接受這個檔案
    fileFilter(req, file, cb) {
        const ext = path.extname(file.originalname).toLowerCase(); // path.extname 獲取檔案副檔名
        if (ext !== '.jpg' && ext !== '.png' && ext !== '.jpeg') {
            cb(new appError('檔案格式錯誤，僅限上傳 jpg、jpeg 與 png 格式。', 400));
        }
        console.log('file', file);
        cb(null, true);
    },
}).any(); // .any() 接受一切上傳的文件，文件陣列保存在 req.files

module.exports = upload;
