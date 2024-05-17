const express = require('express');
const mongoose = require('mongoose');
const morgan = require('morgan');
const config = require('./config/config');
const cors = require('cors');
const studentCourseRoutes = require('./routes/studentCourseRoutes');
const adminCourseRoutes = require('./routes/adminCourseRoutes');
const instructorCourseRoutes = require('./routes/instructorCourseRoutes');
const extractToken = require('./middleware/extractTokenMiddleware');
const verifyTokenAndRole = require('./middleware/authMiddleware');

const app = express();

// Use Morgan for logging HTTP requests
app.use(morgan('dev'));

app.use(express.json());
app.use(extractToken);
app.use(cors());

// Define a custom logging middleware
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

// Route for courses
app.use('/student/courses', verifyTokenAndRole('student'), studentCourseRoutes);

// Middleware to verify token and role for admin routes
app.use('/admin/courses', verifyTokenAndRole('admin'), adminCourseRoutes);

// Middleware to verify token and role for instructor routes
app.use('/instructor/courses', verifyTokenAndRole('instructor'), instructorCourseRoutes);

// Handle invalid routes
app.use((req, res, next) => {
    res.status(404).json({ message: 'Route not found' });
});

const PORT = config.port;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});