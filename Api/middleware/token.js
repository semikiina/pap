const jwt = require('jsonwebtoken');

module.exports = (req, res, next) => {

    const token = req.get('UAuthorization');
    if (!token) {
        const error = new Error('ERROR ON TOKEN');
        error.StatusCode = 401;
        throw error;
    }
    try {
        decodedToken = jwt.verify(token, 'supersecrettagmetoken');
    }
    catch (err) {
        err.StatusCode = 500;
        throw err;
    }
    if (!decodedToken) {
        const error = new Error('Not authorized.');
        error.StatusCode = 401;
        throw error;
    }
    req.userId = decodedToken.id;
    next();
}