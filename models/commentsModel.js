const mongoose = require('mongoose');

const commentSchema = new mongoose.Schema(
    {
        user: {
            type: mongoose.Schema.ObjectId,
            ref: 'User',
            require: ['true', 'user id 不得為空！'],
        },
        post: {
            type: mongoose.Schema.ObjectId,
            ref: 'User',
            require: ['true', 'post id 不得為空！'],
        },
        comment: {
            type: String,
            required: [true, '貼文內容不得為空!'],
        },
        createdAt: {
            type: Date,
            default: Date.now,
        },
    },
    {
        versionKey: false,
    }
);

commentSchema.pre('find', function (next) {
    this.populate({
        path: 'user',
        select: 'name id photo createdAt',
    });

    next();
});
const Comment = mongoose.model('Comment', commentSchema);

module.exports = Comment;
