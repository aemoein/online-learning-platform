const jwt = require('jsonwebtoken');
const config = require('../config/config');

function verifyToken(req, res, next) {
    // Get token from req.token (set by extractToken middleware)
    const token = req.token;

    // Check if token exists
    if (!token) {
        return res.status(401).json({ message: 'Access Denied' });
    }

    try {
        const decoded = jwt.verify(token, config.jwtSecret);
        const { userId, role } = decoded;

        console.log('Token:', token);
        console.log('User ID:', userId);
        console.log('Role:', role);

        req.userId = userId;
        req.role = role;
        next();
    } catch (error) {
        return res.status(401).json({ message: 'Invalid Token' });
    }
}

module.exports = verifyToken;