const mongoose = require('mongoose');

const usersSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: [true, '姓名為必填'],
        },
        email: {
            type: String,
            trim: true,
            lowercase: true,
            unique: true,
            select: false,
            validate: {
                validator: function (v) {
                    return /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(v);
                },
                message: 'Please enter a valid email',
            },
            required: [true, 'email 為必填'],
        },
        photo: {
            type: String,
        },
        updatedAt: {
            type: Date,
            default: Date.now,
            select: false,
        },
    },
    { versionKey: false }
);

const User = mongoose.model('User', usersSchema);

module.exports = User;
