const jwt = require('jsonwebtoken');

module.exports = {
    auth: (req, res, next) => {
        if (req.method !== 'OPTIONS') {
            jwt.verify(req.token, 'keySarenOne', (error, decoded) => {
                if (error) {
                    // console.log(error)
                    return res.status(401).json({
                        message: 'User Not Authorized'
                    })
                }
                // console.log(decoded)
                req.user = decoded
                next()
            })
        }else{
            next(0)
        }
    }
}