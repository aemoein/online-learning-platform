const express = require('express');
const mongoose = require('mongoose');
const config = require('./config/config');
const userRoutes = require('./routes/userRoutes');
const secureRoutes = require('./routes/secureRoutes');
const extractToken = require('./middleware/extractTokenMiddleware')
const cors = require('cors');
const { verifyToken } = require('./middleware/authMiddleware');

const app = express();

app.use(express.json());
app.use(extractToken);
app.use(cors());

const logRequests = (req, res, next) => {
    console.log(`[${new Date().toISOString()}] ${req.method} ${req.url}`);
    next(); // Call next to pass control to the next middleware function
  };
  
  app.use(logRequests);

console.log('MongoDB local URI:', config.mongoURIS);
console.log('MongoDB remote URI:', config.mongoURI);
console.log('Server port:', config.port);
console.log('JWT Secret Key:', config.jwtSecret);

mongoose.connect(config.mongoURI)
  .then(() => console.log('MongoDB connected'))
  .catch(err => console.log(err));

// Routes
app.use('/users', userRoutes);

// Secure routes that require authentication with JWT middleware
app.use('/secure', verifyToken, secureRoutes);

// Handle invalid routes
app.use((req, res, next) => {
    res.status(404).json({ message: 'Route not found' });
});

app.use((err, req, res, next) => {
    console.error(err);
    res.status(500).json({ message: 'Internal server error' });
});

const PORT = config.port || 3001; 
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});