const jwt = require('jsonwebtoken');
const appError = require('../service/appError');
const User = require('../models/usersModel');

const isAuth = async (req, res, next) => {
    // 確認 token 是否存在
    let token;
    if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
        token = req.headers.authorization.split(' ')[1];
    }

    if (!token) return next(new appError('你尚未登入', 400));

    // decoded payload
    const decoded = await new Promise((resolve, reject) => {
        jwt.verify(token, process.env.JWT_SECRET, (err, payload) => {
            if (err) {
                // reject(err);
                return next(new appError('token 過期或不正確，請重新登入', 400));
            } else {
                resolve(payload);
            }
        });
    });

    const currentUser = await User.findById(decoded.id);
    if (!currentUser) return next(new appError('該用戶已不存在', 400));

    req.user = currentUser;
    next();
};

module.exports = isAuth;
