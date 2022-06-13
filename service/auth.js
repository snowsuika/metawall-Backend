const jwt = require('jsonwebtoken');

const generateJWT = (user) => {
    // 產生 JWT token
    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
        expiresIn: process.env.JWT_EXPIRES_DAY,
    });

    return token;
};

const generateUrlJWT = (user, res) => {
    // 產生 JWT token
    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
        expiresIn: process.env.JWT_EXPIRES_DAY,
    });
    
    // 重新導向到前端
    res.redirect(`${process.env.FRRONT_DOMAIN}/callback?token=${token}&name=${user.name}`);
};

module.exports = { generateJWT, generateUrlJWT };
