const jwt = require('jsonwebtoken');
const config = require('../config/config');

// Function to generate JWT token
const generateToken = (userId, role, secretKey) => {
  try {
    return jwt.sign({ userId, role }, secretKey, { expiresIn: '1h' });
  } catch (error) {
    console.error("Error generating token:", error);
    // Handle error appropriately,  e.g. throw an exception
  }
};

// Middleware to verify JWT token
function verifyToken(req, res, next) {
  // Get token from req.token (set by extractToken middleware)
  const token = req.token;

  // Check if token exists
  if (!token) {
      return res.status(401).json({ message: 'Access Denied' });
  }

  try {
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
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
};

module.exports = { generateToken, verifyToken };