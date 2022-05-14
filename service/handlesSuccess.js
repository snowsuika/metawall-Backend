const handleSuccess = (req, res, data) => {
    res.status(200);
    res.send({
        status: 'success',
        data,
    });
    res.end();
};

module.exports = handleSuccess;
