const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');
const { verifyToken } = require('../middleware/authMiddleware');

// POST /users/register - Register a new user
router.post('/register', userController.registerUser);

// POST /users/login - Authenticate user and generate JWT token
router.post('/login', userController.loginUser);

// GET /users/instructor/:userId - Get instructor profile by user ID
router.get('/instructor/:userId', userController.getInstructorProfile);

router.get('/student/:userId', userController.getStudentProfile);

// PUT /users/profile - Update user profile
router.put('/profile', verifyToken, userController.updateUserProfile);

// GET /users - Get all users (accessible only to admins)
router.get('/', verifyToken, userController.getAllUsers);

// DELETE /users/:userId - Remove a user (accessible only to admins)
router.delete('/:userId', verifyToken, userController.removeUser);

module.exports = router;