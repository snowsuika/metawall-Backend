const User = require('../models/usersModel');
const Post = require('../models/postsModel');
const handleSuccess = require('../service/handlesSuccess');
const appError = require('../service/appError');

const users = {
    getAllUsers: async (req, res, next) => {
        const allUsers = await User.find();
        handleSuccess(req, res, allUsers);
    },

    createUser: async (req, res, next) => {
        //TODO: 管理者幫使用者註冊
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
        //TODO: 管理者替使用者更新資訊
        const id = req.params?.id;
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
        //TODO: 管理者刪除使用者
        const id = req.params?.id;
        const isSuccessDelete = await User.findByIdAndDelete(id);
        if (isSuccessDelete) {
            const allUsers = await User.find();
            handleSuccess(req, res, allUsers);
        } else {
            return next(new appError('刪除失敗，請確認 id 是否正確', 400));
        }
    },

    getProfile: async (req, res, next) => {
        const userId = req.user?._id; //== 有經過 isAuth middleware，取得的 user 是驗證過的 ==

        const profile = await User.findById(userId).exec();

        if (profile) {
            handleSuccess(req, res, profile);
        } else {
            return next(new appError('取得個人資料失敗', 400));
        }
    },

    updateProfile: async (req, res, next) => {
        const userId = req.user?._id; //== 有經過 isAuth middleware，取得的 user 是驗證過的 ==
        const { name, photo, sex } = req.body;

        const updatedProfile = await User.findByIdAndUpdate(
            userId,
            {
                name,
                photo,
                sex,
            },
            { new: true }
        );

        if (updatedProfile) {
            handleSuccess(req, res, updatedProfile);
        } else {
            return next(new appError('更新失敗，請確認欄位', 400));
        }
    },

    getLikeList: async (req, res, next) => {
        const userId = req.user?._id;

        const likeList = await Post.find({
            likes: { $in: [userId] },
        }).populate({
            path: 'user',
            select: '_id name',
        });

        if (likeList) {
            handleSuccess(req, res, likeList);
        } else {
            return next(new appError('取得按讚文章失敗', 400));
        }
    },
};

module.exports = users;
