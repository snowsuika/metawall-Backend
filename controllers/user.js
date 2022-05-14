const User = require('../models/usersModel');
const handleSuccess = require('../service/handlesSuccess');
const appError = require('../service/appError');

const users = {
    getAllUsers: async (req, res, next) => {
        const allUsers = await User.find();
        handleSuccess(req, res, allUsers);
    },
    getOneUser: async (req, res, next) => {
        const id = req.params.id;
        const user = await User.findById(id);
        if (user) {
            handleSuccess(req, res, user);
        } else {
            return next(new appError('資料取得失敗，請確認 id 是否正確', 400));
        }
    },

    createUser: async (req, res, next) => {
        const data = req.body;

        const newUser = await User.create({
            name: data.name,
            email: data.email,
            photo: data.photo,
        });

        if (newUser) {
            handleSuccess(req, res, newUser);
        } else {
            return next(new appError(err.message, 400));
        }
    },

    updateUser: async (req, res, next) => {
        const id = req.params.id;
        const data = req.body;

        const updateUser = await User.findByIdAndUpdate(
            id,
            {
                name: data.name,
                email: data.email,
                photo: data.photo,
            },
            {
                new: true,
            }
        );

        if (updateUser) {
            handleSuccess(req, res, updateUser);
        } else {
            return next(new appError('更新失敗，請確認 id 是否正確', 400));
        }
    },

    deleteOneUser: async (req, res, next) => {
        const id = req.params.id;
        const isSuccessDelete = await User.findByIdAndDelete(id);
        if (isSuccessDelete) {
            const allUsers = await User.find();
            handleSuccess(req, res, allUsers);
        } else {
            return next(new appError('刪除失敗，請確認 id 是否正確', 400));
        }
    },

    deleteAllUser: async (req, res, next) => {
        await User.deleteMany({});
        const allUsers = await User.find();
        handleSuccess(req, res, allUsers);
    },
};

module.exports = users;
