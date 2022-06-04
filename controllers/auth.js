const bcrypt = require('bcryptjs');
const validator = require('validator');

// Model
const User = require('../models/usersModel');

// Service
const handleErrorAsyncWrapper = require('../service/handleErrorAsync');
const handleSuccess = require('../service/handlesSuccess');
const generateJWT = require('../service/generateJWT');
const appError = require('../service/appError');

const auth = {
    register: handleErrorAsyncWrapper(async (req, res, next) => {
        let { name, email, sex, photo, password, confirmPassword } = req.body;

        // 1) validation 資料
        if (
            typeof email === 'undefined' ||
            email === '' ||
            email === null ||
            typeof password === 'undefined' ||
            password === '' ||
            password === null ||
            typeof confirmPassword === 'undefined' ||
            confirmPassword === '' ||
            confirmPassword === null ||
            typeof name === 'undefined' ||
            name === '' ||
            name === null
        )
            return next(new appError('欄位未填寫正確！', 400));

        const passwordReg = '^(?![0-9]+$)(?![a-zA-Z]+$)[0-9A-Za-z]{8,20}$';
        if (password !== confirmPassword) return next(new appError('密碼不一致！', 400));
        if (!validator.isLength(name, { min: 2, max: 10 })) return next(new appError('暱稱須介於 2 ~ 10 個字！', 400));
        if (!validator.matches(password, passwordReg))
            return next(new appError('密碼必須為英文、數字混合 8~20 個字元！', 400));
        if (!validator.isEmail(email)) return next(new appError('E-mail 格式不正確', 400));
        if (await User.findOne({ email })) return next(new appError('該 email 已被註冊！', 400));

        //  2) 密碼加密
        password = await bcrypt.hash(password, 12);

        // 3) 寫入 DB
        const newUser = await User.create({
            name,
            email,
            password,
            sex,
            photo,
        });

        // 4) 回傳 token
        const token = generateJWT(newUser);
        const resData = {
            name: newUser.name,
            token,
        };

        handleSuccess(req, res, resData, 201);
    }),
    login: handleErrorAsyncWrapper(async (req, res, next) => {
        const { email, password } = req.body;
        //  1) 驗證欄位
        if (
            typeof email === 'undefined' ||
            email === '' ||
            email === null ||
            typeof password === 'undefined' ||
            password === '' ||
            password === null
        )
            return next(new appError('帳號不可為空', 400));

        //  2) 用 email 比對使用者，撈出該使用者資料庫密碼。再比對使用者給的

        const user = await User.findOne({ email }).select('+password');
        if (!user) return next(new appError('email 不存在', 400));
        const isCorrectPassword = await bcrypt.compare(password, user.password);

        if (isCorrectPassword) {
            //  3) 產生 jwt 給予使用者
            const token = generateJWT(user);
            const resData = {
                name: user.name,
                token,
            };

            handleSuccess(req, res, resData);
        } else {
            return next(new appError('密碼有誤', 400));
        }
    }),
    updatePassword: handleErrorAsyncWrapper(async (req, res, next) => {
        const { password, confirmPassword } = req.body;
        const user = await User.findOne({ _id: req.user?._id }).select('+password');
        //== 有經過 isAuth middleware，取得的 user 是驗證過的 ==

        //  1) 驗證欄位 a. 是否都相同 b. 是否與之前密碼相同
        if (password !== confirmPassword) return next(new appError('密碼不一致', 400));
        if (await bcrypt.compare(password, user.password)) return next(new appError('密碼不得與之前相同', 400));
        if (!validator.isLength(password, { min: 8 })) return next(new appError('密碼低於 8 碼！', 400));

        //  2) 寫入資料庫
        const updataDB = await User.findByIdAndUpdate(req.user?.id, {
            password: await bcrypt.hash(password, 12),
        });
        //  3) 給予 token
        const token = generateJWT(req.user);
        handleSuccess(req, res, { token });
    }),
};

module.exports = auth;
