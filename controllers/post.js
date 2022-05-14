const Post = require('../models/postsModel');
const User = require('../models/usersModel');
const handleSuccess = require('../service/handlesSuccess');
const uploadImgur = require('../service/uploadImgur');
const appError = require('../service/appError');
const posts = {
    getAllPost: async (req, res, next) => {
        let query = {
            keyword: req.query.keyword !== undefined ? { content: new RegExp(req.query.keyword) } : {},
            sort: req.query.sort === 'asc' ? 'createdAt' : '-createdAt',
        };

        const allPosts = await Post.find(query.keyword).sort(query.sort).populate({
            path: 'user',
            select: 'name photo',
        });

        handleSuccess(req, res, allPosts);
    },

    getOnePost: async (req, res, next) => {
        const id = req.params.id;
        const post = await Post.findById(id);
        if (post) {
            handleSuccess(req, res, post);
        } else {
            return next(new appError('資料取得失敗，請確認 id 是否正確', 400));
        }
    },

    createPost: async (req, res, next) => {
        const { user, image, content } = req.body;
        let imageLink = '';

        // 確認是否有個使用者
        if (user == '' || (user && !user.match(/^[0-9a-fA-F]{24}$/)))
            return next(new appError('user id 格式錯誤', 400));
        const isUserExist = await User.findById(user).exec();
        if (!isUserExist) return next(new appError('使用者不存在', 400));
        if (image) imageLink = await uploadImgur(image, 'base64', next).link;

        const newPost = await Post.create({
            user: user,
            image: imageLink,
            content: content,
        });

        if (newPost) {
            handleSuccess(req, res, newPost);
        } else {
            return next(new appError(err.message, 400));
        }
    },

    updatePosts: async (req, res, next) => {
        const id = req.params.id;
        const data = req.body;

        const updatePost = await Post.findByIdAndUpdate(
            id,
            {
                name: data.name,
                tags: data.tags,
                type: data.type,
                image: data.image,
                content: data.content,
            },
            {
                new: true,
            }
        );

        if (updatePost) {
            handleSuccess(req, res, updatePost);
        } else {
            return next(new appError('更新失敗，請確認 id 是否正確', 400));
        }
    },

    deleteOnePost: async (req, res, next) => {
        const id = req.params.id;
        const isSuccessDelete = await Post.findByIdAndDelete(id);
        if (isSuccessDelete) {
            const allPosts = await Post.find();
            handleSuccess(req, res, allPosts);
        } else {
            return next(new appError('刪除失敗，請確認 id 是否正確。', 400));
        }
    },

    deleteAllPost: async (req, res, next) => {
        await Post.deleteMany({});
        const allPosts = await Post.find();
        handleSuccess(req, res, allPosts);
    },
};

module.exports = posts;
