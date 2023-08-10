const jwt = require('jsonwebtoken');

const checkAuth = (req, res, next) => { 

    try {
        const token = req.headers.authorization.split(' ')[1];
        jwt.verify(token, 'Secret_payload_signature_seed');

        next(); 

    } catch {
        res.status(401).json({
            message: 'Auth Failed!'
        })
    }

}

module.exports = checkAuth;