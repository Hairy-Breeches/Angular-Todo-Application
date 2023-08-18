const jwt = require('jsonwebtoken');

const checkAuth = (req, res, next) => { 

    try {
        const token = req.headers.authorization.split(' ')[1];
        const decodedToken = jwt.verify(token, 'Secret_payload_signature_seed');

        req.decodedToken = { id: decodedToken.id };

        next(); 
    } catch {
        res.status(401).json({
            message: 'Auth Failed!'
        })
    }

}

module.exports = checkAuth;