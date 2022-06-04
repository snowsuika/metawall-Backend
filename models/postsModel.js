const mongoose = require('mongoose');

const postsSchema = new mongoose.Schema(
    {
        user: {
            type: mongoose.Schema.Types.ObjectId,
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
        likes: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
    },
    {
        versionKey: false,
        toJSON: {
            virtuals: true,
            transform: function (doc, ret) {
                delete ret.id;
            },
        },
        toObject: { virtuals: true },
    }
);

postsSchema.virtual('comments', {
    ref: 'Comment',
    foreignField: 'post',
    localField: '_id',
});

const Post = mongoose.model('Post', postsSchema);

module.exports = Post;
