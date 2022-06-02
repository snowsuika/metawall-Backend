const { ImgurClient } = require('imgur');
const sizeOf = require('image-size');

// Service
const handleSuccess = require('../service/handlesSuccess');
const appError = require('../service/appError');

const upload = {
    uploadImage: async (req, res, next) => {
        if (!req?.files?.length) return next(new appError('尚未上傳檔案！', 400));

        const { type } = req.body;
        const { width, height } = sizeOf(req.files[0].buffer);

        if (type === 'avatar') {
            const isSquare = width === height;
            if (!isSquare) return next(new appError('頭像尺寸必須符合 1:1 比例！', 400));
        } else {
            if (width < 300) return next(new appError('圖片寬度不得低於 300 像素！', 400));
        }

        const client = new ImgurClient({
            clientId: process.env.IMGUR_CLIENT_ID,
            clientSecret: process.env.IMGUR_CLIENT_SECRET,
            refreshToken: process.env.IMGUR_REFRESH_TOKEN,
        });

        const response = await client.upload({
            image: req.files[0].buffer.toString('base64'),
            type: 'base64',
            album: process.env.IMGUR_ALBUM_ID,
        });

        handleSuccess(req, res, {
            status: 'success',
            imgUrl: response.data.link,
        });
    },
};

module.exports = upload;
