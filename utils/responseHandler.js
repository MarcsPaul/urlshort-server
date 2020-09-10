module.exports.success = (message, data) => {
    let code = 200;
    return {
        statusCode: 200,
        body: {
            message: message,
            status: true,
            code,
            data
        }
    };
};
module.exports.error = (message, err) => {
    return {
        statusCode: 500,
        body: {
            message: message,
            status: false,
            reason: err.message,
            code: err.code
        }
    };
};