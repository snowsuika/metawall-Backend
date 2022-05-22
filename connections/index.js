const mongoose = require('mongoose');
const dotenv = require('dotenv');
dotenv.config({ path: './config.env' });

let DB =
    process.env.NODE_ENV === 'dev'
        ? 'mongodb://localhost:27017/metawallLocal'
        : process.env.DATABASE.replace('<password>', process.env.DATABASE_PASSWORD);

mongoose
    .connect(DB)
    .then(() => console.log('連線成功'))
    .catch((err) => console.log('連線失敗', err));
