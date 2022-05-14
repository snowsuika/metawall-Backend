const mongoose = require('mongoose');

const postsSchema = new mongoose.Schema(
    {
        user: {
            type: mongoose.Schema.ObjectId,
            ref: 'User',
            required: [true, '使用者 id 為必填'],
        },
        image: {
            type: String,
            default: '',
        },
        createdAt: {
            type: Date,
            default: Date.now,
        },
        content: {
            type: String,
            required: [true, 'Content 為必填'],
        },
        likes: {
            type: Number,
            default: 0,
        },
    },
    { versionKey: false }
);

const Post = mongoose.model('Post', postsSchema);

module.exports = Post;
