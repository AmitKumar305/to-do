const jwt = require('jsonwebtoken');

async function Authenticate(req, res, next) {
    try {
        const authorizationToken = req.headers['authorization'];

        if (!authorizationToken) {
            return res.status(401).json({
                message: 'Authorization token is required',
            });
        }
        const decodedToken = await jwt.decode(authorizationToken, process.env.SECRET_STRING);
        if (!decodedToken) {
            return res.status(400).json({
                message: 'Invalid token',
            });
        }
        req.body.id = decodedToken.id;

        next();
    } catch (err) {
        res.status(500).json({
            message: 'Error while authenticating'
        })
    }
}

module.exports = Authenticate;