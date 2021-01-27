const jwt = require('jsonwebtoken');


module.exports = {
    createJWTToken: (payload) => {
        return jwt.sign(payload, 'keySarenOne', {
            expiresIn: '12h'
        })
    }
}