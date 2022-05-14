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
    return imgurResData;
};

module.exports = uploadImgur;
