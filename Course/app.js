const express = require('express');
const mongoose = require('mongoose');
const config = require('./config');
const courseRoutes = require('./routes/courseRoutes');

const app = express();

// Middleware to parse JSON bodies
app.use(express.json());

// Connect to MongoDB
mongoose.connect(config.mongoURI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
})
.then(() => {
    console.log('Connected to MongoDB');
})
.catch((err) => {
    console.error('Error connecting to MongoDB:', err);
    process.exit(1); // Exit the process if unable to connect to MongoDB
});
// Route for courses
app.use('/courses', courseRoutes);

// Handle invalid routes
app.use((req, res, next) => {
    res.status(404).json({ message: 'Route not found' });
});

// Error handling middleware
app.use((err, req, res, next) => {
    console.error(err);
    res.status(500).json({ message: 'Internal server error' });
});

const PORT = config.port;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
