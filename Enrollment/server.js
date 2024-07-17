const express = require('express');
const dotenv = require('dotenv');
const mongoose = require('mongoose');
const cors = require('cors');
const bodyParser = require('body-parser');
const morgan = require('morgan');
const jwt = require('jsonwebtoken');
const verifyTokenAndRole = require('./src/middleware/authMiddleware');
const errorMiddleware = require('./src/middleware/errorMiddleware');
const extractToken = require('./src/middleware/extractToken');
const config = require('./src/config/config');
const studentRoutes = require('./src/routes/studentRoutes');
const instructorRoutes = require('./src/routes/instructorRoutes');
const notificationRoutes = require('./src/routes/notificationRoutes');

dotenv.config();

const app = express();

// Middleware
app.use(cors());
app.use(bodyParser.json());
app.use(morgan('dev'));
app.use(extractToken);
app.use(errorMiddleware);

const logRequests = (req, res, next) => {
    console.log(`[${new Date().toISOString()}] ${req.method} ${req.url}`);
    next();
  };
  
  app.use(logRequests);

console.log('MongoDB local URI:', config.mongoURIS);
console.log('MongoDB remote URI:', config.mongoURI);
console.log('Server port:', config.port);
console.log('JWT Secret Key:', config.jwtSecret);

mongoose.connect(config.mongoURI)
  .then(() => console.log('MongoDB connected'))
  .catch(err => console.log(err));

app.use('/enrollment/student', verifyTokenAndRole('student'), studentRoutes);
app.use('/enrollment/instructor', verifyTokenAndRole('instructor'), instructorRoutes);
app.use('/notifications', verifyTokenAndRole('student'), notificationRoutes);

// Handle invalid routes
app.use((req, res, next) => {
    res.status(404).json({ message: 'Route not found' });
});

// Start the server
const PORT = config.port;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
