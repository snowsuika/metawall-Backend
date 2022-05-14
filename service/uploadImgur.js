const appError = require('../service/appError');
const dotenv = require('dotenv');
dotenv.config({ path: './config.env' });
const { ImgurClient, getAuthorizationHeader } = require('imgur');

const imgurClient = new ImgurClient({
    clientId: process.env.IMGUR_CLIENT_ID,
});

const uploadImgur = async (image, type, next) => {
    await getAuthorizationHeader(imgurClient);
    const imgurResData = await imgurClient.upload({ image, type });

    if (imgurResData.success === false) return next(new appError('圖片上傳失敗。請確認圖片格式。', 400));
    return imgurResData.data;
};

module.exports = uploadImgur;
