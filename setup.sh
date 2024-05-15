#!/bin/bash

# Function to check if a command exists
command_exists() {
    command -v "$1" >/dev/null 2>&1
}

# Check if Node.js and npm are installed
if ! command_exists node || ! command_exists npm; then
    echo "Node.js and npm are required to run this script. Please install them first."
    exit 1
fi

# Define project name and directory
PROJECT_NAME=$1
if [ -z "$PROJECT_NAME" ]; then
    echo "Please provide a project name."
    exit 1
fi

# Create project directory
mkdir $PROJECT_NAME
cd $PROJECT_NAME

# Initialize a new Node.js project
npm init -y

# Install necessary libraries
npm install express dotenv mongoose cors body-parser morgan bcrypt express-session jsonwebtoken mongodb

# Create a basic directory structure
mkdir src
mkdir src/routes
mkdir src/controllers
mkdir src/models
mkdir src/middleware
mkdir src/config

# Create an example .env file with specified data
cat <<EOT > .env
# MongoDB URIs
MONGO_URI_LOCAL=mongodb://localhost:27017/coursesdb
MONGO_URI_REMOTE=mongodb+srv://ahmed33elsayed22:12345AE12@onlinebookingsystem.n4mwac5.mongodb.net/courses?retryWrites=true&w=majority&appName=OnlineBookingSystem

# Port for the server to listen on
PORT=3002

# JWT Secret Key
JWT_SECRET=eH6Q2Ji3Vn3bT6Tn4GfDn7Sp2Ue7Nz3Rj8Sd1Ws5Fg9Uk0Li2Ym5Gk3Yb7Ja5S
EOT

# Create middleware files
cat <<EOT > src/middleware/authMiddleware.js
// authMiddleware.js
const jwt = require('jsonwebtoken');
const config = require('../config/config');

const authMiddleware = (req, res, next) => {
    // Code for authentication middleware
};

module.exports = authMiddleware;
EOT

cat <<EOT > src/middleware/errorMiddleware.js
// errorMiddleware.js
const errorMiddleware = (err, req, res, next) => {
    // Code for error handling middleware
};

module.exports = errorMiddleware;
EOT

cat <<EOT > src/middleware/extractToken.js
// extractToken.js
const jwt = require('jsonwebtoken');

const extractToken = (req, res, next) => {
    // Code to extract JWT token from request
};

module.exports = extractToken;
EOT

# Create config file
cat <<EOT > src/config/config.js
// config.js
require('dotenv').config();

module.exports = {
    // MongoDB connection URLs
    mongoURIS: process.env.MONGO_URI_LOCAL,
    mongoURI: process.env.MONGO_URI_REMOTE,

    // Port for the server to listen on
    port: process.env.PORT || 3001,

    // JWT Secret Key
    jwtSecret: process.env.JWT_SECRET
};
EOT

# Create a basic server.js file
cat <<EOT > src/server.js
const express = require('express');
const dotenv = require('dotenv');
const mongoose = require('mongoose');
const cors = require('cors');
const bodyParser = require('body-parser');
const morgan = require('morgan');
const session = require('express-session');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const authMiddleware = require('./middleware/authMiddleware');
const errorMiddleware = require('./middleware/errorMiddleware');
const extractToken = require('./middleware/extractToken');
const config = require('./config/config');

// Load environment variables
dotenv.config();

const app = express();

// Middleware
app.use(cors());
app.use(bodyParser.json());
app.use(morgan('dev'));
app.use(session({
    secret: config.jwtSecret,
    resave: false,
    saveUninitialized: true,
    cookie: { secure: false } // Use secure: true in production with HTTPS
}));
app.use(extractToken);
app.use(authMiddleware);
app.use(errorMiddleware);

// Connect to MongoDB
mongoose.connect(config.mongoURIS, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log('MongoDB connected'))
    .catch(err => console.error('MongoDB connection error:', err));

// Define a simple route
app.get('/', (req, res) => {
    res.send('Hello, world!');
});

// Start the server
const PORT = config.port;
app.listen(PORT, () => {
    console.log(\`Server is running on port \${PORT}\`);
});
EOT

# Create a basic README.md file
cat <<EOT > README.md
# $PROJECT_NAME

## Description
A new Node.js project.

## Installation
\`\`\`
npm install
\`\`\`

## Running the project
\`\`\`
npm start
\`\`\`

## Environment Variables
Create a .env file in the root of your project with the following variables:
\`\`\`
# MongoDB URIs
MONGO_URI_LOCAL=mongodb://localhost:27017/coursesdb
MONGO_URI_REMOTE=mongodb+srv://ahmed33elsayed22:12345AE12@onlinebookingsystem.n4mwac5.mongodb.net/courses?retryWrites=true&w=majority&appName=OnlineBookingSystem

# Port for the server to listen on
PORT=3002

# JWT Secret Key
JWT_SECRET=eH6Q2Ji3Vn3bT6Tn4GfDn7Sp2Ue7Nz3Rj8Sd1Ws5Fg9Uk0Li2Ym5Gk3Yb7Ja5S
\`\`\`
EOT

# Print completion message
echo "Project $PROJECT_NAME setup complete. Happy coding!"