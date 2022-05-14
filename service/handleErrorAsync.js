const handleErrorAsyncWrapper = (asyncCallback) => {
    return function (req, res, next) {
        asyncCallback(req, res, next).catch((error) => next(error));
    };
};

module.exports = handleErrorAsyncWrapper;
