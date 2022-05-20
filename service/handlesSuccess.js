const handleSuccess = (req, res, data, statusCode = 200) => {
    res.status(statusCode);
    res.send({
        status: 'success',
        data,
    });
    res.end();
};

module.exports = handleSuccess;
