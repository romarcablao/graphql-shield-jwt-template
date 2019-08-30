const jwt = require('jsonwebtoken');

function checkTokenValidity(req) {
    if (req.request.get('Authorization') != undefined || req.request.get('Authorization') != null) {

        try {
            token = jwt.verify(req.request.get('Authorization'), 'secret');
        } catch (e) {
            return null;
        }

        if (Date.now() < token.exp * 1000) {
            return true;
        }
    }
    return false;
}

function getToken(req) {
    return req.request.get('Authorization') != undefined ? req.request.get('Authorization') : null;
}

function getUserData(req) {
    if (req.request.get('Authorization') != undefined || req.request.get('Authorization') != null) {
        try {
            token = jwt.verify(req.request.get('Authorization'), 'secret', { ignoreExpiration: true });
        } catch (e) {
            return null;
        }
        return token;
    }
    return null;
}

module.exports = {
    getToken,
    getUserData,
    checkTokenValidity
};




