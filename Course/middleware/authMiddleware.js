const jwt = require('jsonwebtoken');
const config = require('../config/config');

const verifyTokenAndRole = (requiredRole) => (req, res, next) => {
    const token = req.token;

    if (!token) {
        return res.status(401).json({ error: 'Unauthorized' });
    }

    try {
        const decoded = jwt.verify(token, config.jwtSecret);
        const { userId, role } = decoded;

        console.log('Token:', token);
        console.log('User ID:', userId);
        console.log('Role:', role);

        if (role !== requiredRole) {
            return res.status(403).json({ error: 'Insufficient permissions' });
        }

        req.userId = userId;
        req.role = role;
        next();

    } catch (error) {
        return res.status(401).json({ error: 'Invalid token' });
    }
};

module.exports = verifyTokenAndRole;