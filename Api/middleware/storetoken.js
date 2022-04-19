const jwt = require('jsonwebtoken');

module.exports = (req, res, next) => {

    //console.log('Store Token');
    const token = req.get('SAuthorization');
    
    if (!token) {
        const error = new Error('ERROR ON STORETOKEN');
        error.StatusCode = 401;
        throw error;
    }
    try {
        decodedToken = jwt.verify(token, 'supersecretstoretagmetoken');
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
    req.storeId = decodedToken.id;
    next();
}