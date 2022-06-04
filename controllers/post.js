const mongoose = require('mongoose');
// Model
const Post = require('../models/postsModel');
const User = require('../models/usersModel');
const Comment = require('../models/commentsModel');

// Service
const handleSuccess = require('../service/handlesSuccess');
const appError = require('../service/appError');

const posts = {
    /**
     * Post 貼文 CRUD
     */

    getAllPost: async (req, res, next) => {
        let query = {
            keyword: req.query.keyword !== undefined ? { content: new RegExp(req.query.keyword) } : {},
            sort: req.query.sort === 'asc' ? 'createdAt' : '-createdAt',
        };

        const allPosts = await Post.find(query.keyword)
            .sort(query.sort)
            .populate({
                path: 'user',
                select: 'name photo',
            })
            .populate({
                path: 'comments',
                select: 'user comment',
            });
        handleSuccess(req, res, allPosts);
    },

    getOnePost: async (req, res, next) => {
        const id = req.params?.id;
        if (!mongoose.isObjectIdOrHexString(id)) return next(new appError('請確認 id 是否正確', 400));
        const post = await Post.findById(id).populate({
            path: 'comments',
            select: 'user comment',
        });
        if (post) {
            handleSuccess(req, res, post);
        } else {
            return next(new appError('資料取得失敗', 400));
        }
    },

    createPost: async (req, res, next) => {
        const userId = req.user._id;
        const { image, content } = req.body;

        const newPost = await Post.create({
            user: userId,
            image,
            content,
        });

        if (newPost) {
            handleSuccess(req, res, newPost);
        } else {
            return next(new appError(err.message, 400));
        }
    },

    updatePosts: async (req, res, next) => {
        const { postId } = req.params;
        const data = req.body;

        if (!mongoose.isObjectIdOrHexString(postId)) return next(new appError('請確認 id 是否正確', 400));

        const updatePost = await Post.findByIdAndUpdate(
            postId,
            {
                image: data.image,
                content: data.content,
            },
            {
                new: true,
                runValidators: true,
            }
        );

        if (updatePost) {
            handleSuccess(req, res, updatePost);
        } else {
            return next(new appError('更新失敗，請確認 id 是否正確', 400));
        }
    },

    deleteOnePost: async (req, res, next) => {
        const { postId } = req.params;

        if (!mongoose.isObjectIdOrHexString(postId)) return next(new appError('請確認 id 是否正確', 400));

        const isSuccessDelete = await Post.findByIdAndDelete(postId);
        if (isSuccessDelete) {
            const allPosts = await Post.find();
            handleSuccess(req, res, '貼文刪除成功！');
        } else {
            return next(new appError('刪除失敗，請確認 id 是否正確。', 400));
        }
    },

    /****************************************************************
     * 貼文按讚 / 收回讚
     */
    createLike: async (req, res, next) => {
        const userId = req.user._id; //要被新增進去的 userId
        const { postId } = req.params;

        if (!mongoose.isObjectIdOrHexString(postId)) return next(new appError('請確認 id 是否正確', 400));

        const createLikes = await Post.findByIdAndUpdate(
            { _id: postId },
            { $addToSet: { likes: userId } },
            {
                new: true,
                runValidators: true,
            }
        );

        if (createLikes) {
            handleSuccess(req, res, createLikes);
        } else {
            return next(new appError('貼文按讚失敗', 400));
        }
    },

    deleteLike: async (req, res, next) => {
        const userId = req.user?._id; //要被新增進去的 userId
        const { postId } = req.params;

        if (!mongoose.isObjectIdOrHexString(postId)) return next(new appError('請確認 id 是否正確', 400));

        const deleteLikes = await Post.findByIdAndUpdate(
            { _id: postId },
            { $pull: { likes: userId } },
            {
                new: true,
                runValidators: true,
            }
        );

        if (deleteLikes) {
            handleSuccess(req, res, deleteLikes);
        } else {
            return next(new appError('貼文收回讚失敗', 400));
        }
    },

    /****************************************************************
     * comment 貼文留言
     */

    //新增一則貼文留言
    cteateComment: async (req, res, next) => {
        const userId = req.user?.id;
        const { postId } = req.params;
        const { comment } = req.body;

        if (!mongoose.isObjectIdOrHexString(postId)) return next(new appError('請確認 id 是否正確', 400));

        const newComment = await Comment.create({
            user: userId,
            post: postId,
            comment,
        });

        if (newComment) {
            handleSuccess(req, res, newComment);
        } else {
            return next(new appError('新增評論失敗', 400));
        }
    },
    //刪除一則貼文留言
    deleteComment: async (req, res, next) => {
        const userId = req.user.id;
        const { postId, commentId } = req.params;
        if (!mongoose.isObjectIdOrHexString(postId) || !mongoose.isObjectIdOrHexString(commentId))
            return next(new appError('請確認 id 是否正確', 400));

        // 確認刪除的 Comment 是不是由自己發的
        const deleteCommentData = await Comment.findOneAndDelete(
            {
                _id: commentId,
                user: userId,
            },
            {
                new: true,
                runValidators: true,
            }
        ).exec();

        if (deleteCommentData) {
            handleSuccess(req, res, '刪除留言成功！');
        } else {
            return next(new appError('刪除貼文失敗！', 400));
        }
    },

    /****************************************************************
     * 取得個人所有貼文
     */
    getPersonalPosts: async (req, res, next) => {
        const { userId } = req.params;
        if (!mongoose.isObjectIdOrHexString(userId)) return next(new appError('請確認 id 是否正確', 400));

        // 確認這個使用者是否存在
        const isExistUser = await User.findById({ _id: userId }).exec();
        if (!isExistUser) return next(new appError('該使用者不存在', 400));

        const result = await Post.find({ user: userId })
            .populate({
                path: 'comments',
                select: 'user comment createdAt -post',
            })
            .exec();

        handleSuccess(req, res, { data: result });
    },
};

module.exports = posts;
