const mongoose = require('mongoose');

//models
const User = require('../models/usersModel');
const Post = require('../models/postsModel');

// service

const handleSuccess = require('../service/handlesSuccess');
const appError = require('../service/appError');
//service

const users = {
    /****************************************************************
     * 個人資料
     */
    getProfile: handleErrorAsyncWrapper(async (req, res, next) => {
        const userId = req.user?._id; //== 有經過 isAuth middleware，取得的 user 是驗證過的 ==

        const profile = await User.findById(userId).exec();

        if (profile) {
            handleSuccess(req, res, profile);
        } else {
            return next(new appError('取得個人資料失敗', 400));
        }
    }),

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
            { new: true, runValidators: true }
        );

        if (updatedProfile) {
            handleSuccess(req, res, updatedProfile);
        } else {
            return next(new appError('更新失敗，請確認欄位', 400));
        }
    },

    /****************************************************************
     * 個人按讚列表
     */

    getLikeList: async (req, res, next) => {
        const userId = req.user?._id;

        const likeList = await Post.find({
            likes: { $in: [userId] },
        })
            .populate({
                path: 'user',
                select: 'name photo',
            })
            .select('id user createdAt');

        if (likeList) {
            handleSuccess(req, res, likeList);
        } else {
            return next(new appError('取得按讚文章失敗', 400));
        }
    },

    /****************************************************************
     * 個人追蹤
     */
    // 取得個人追蹤名單
    getFollowingList: async (req, res, next) => {
        const userId = req.user?.id;

        const followingList = await User.find({
            _id: userId,
        })
            .select('following')
            .populate({
                path: 'following.user',
                select: 'name photo',
            });
        if (followingList) {
            handleSuccess(req, res, followingList);
        } else {
            return next(new appError('取得個人追蹤名單失敗', 401));
        }
    },

    // 追蹤朋友
    createFollow: async (req, res, next) => {
        const followUserId = req.params?.userId; //被追蹤的對象
        const selfUserId = req.user?.id;
        if (!mongoose.isObjectIdOrHexString(followUserId)) return next(new appError('請確認 id 是否正確', 400));
        if (followUserId === selfUserId) return next(new appError('您無法追蹤自己', 401));

        // 自己的 `following` 要新增 `被追蹤者`
        await User.findOneAndUpdate(
            {
                _id: selfUserId,
                'following.user': { $ne: followUserId },
            },
            {
                $addToSet: { following: { user: followUserId } },
            },
            {
                runValidators: true,
            }
        );

        // `被追蹤者` 的 `followers` 也要新增被追蹤者
        await User.findOneAndUpdate(
            {
                _id: followUserId,
                'followers.user': { $ne: selfUserId },
            },
            {
                $addToSet: { followers: { user: selfUserId } },
            },
            {
                runValidators: true,
            }
        );

        handleSuccess(req, res, '您已成功追蹤!');
    },

    // 取消追蹤朋友
    deleteFollow: async (req, res, next) => {
        const followUserId = req.params?.userId; //被追蹤的對象
        const selfUserId = req.user?.id;

        if (!mongoose.isObjectIdOrHexString(followUserId)) return next(new appError('請確認 id 是否正確', 400));
        if (followUserId === selfUserId) return next(new appError('您無法取消追蹤自己', 401));

        // 自己的 `following` 要刪除 `被追蹤者`
        await User.findOneAndUpdate(
            {
                _id: selfUserId,
            },
            {
                $pull: { following: { user: followUserId } },
            },
            {
                runValidators: true,
            }
        );
        // `被追蹤者` 的 `followers` 也要刪除被追蹤者
        await User.findOneAndUpdate(
            {
                _id: followUserId,
            },
            {
                $pull: { followers: { user: selfUserId } },
            },
            {
                runValidators: true,
            }
        );

        handleSuccess(req, res, '您已成功取消追蹤！');
    },
};

module.exports = users;
