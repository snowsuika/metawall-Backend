// 第三方登入
const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const bcrypt = require('bcryptjs');

// models
const User = require('../models/usersModel');

// service
const appError = require('../service/appError');

passport.use(
    // Google驗證策略
    new GoogleStrategy(
        {
            clientID: process.env.GOOGLE_CLIENT_ID,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET,
            callbackURL: process.env.GOOGLE_CALLBACK,
        },
        async (accessToken, refreshToken, profile, cb) => {
            // 確認使用者是否已經註冊過
            const user = await User.findOne({ googleId: profile.id });
            if (user) return cb(null, user);
            // 沒註冊過的話幫使用者註冊
            const password = await bcrypt.hash('K10q6Wbk0xC6VoYdebBa', 12);
            const newUser = await User.create({
                email: profile.emails[0].value,
                name: profile.displayName,
                photo:profile.photos[0].value,
                password,
                googleId: profile.id,
            });
            return cb(null, newUser);
        }
    )
);

module.exports = passport;
