module.exports = async ({ res, message, data, code }) => {
    return res
        .status(code)
        .json({
            code,
            status: code < 300 ? 'success' : 'error',
            message,
            data,
        })
        .end();

}