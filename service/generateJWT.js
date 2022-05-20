const jwt = require('jsonwebtoken');

const generateJWT = (user) => {
    // 產生 JWT token
    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
        expiresIn: process.env.JWT_EXPIRES_DAY,
    });

    return token;
};

module.exports = generateJWT;
