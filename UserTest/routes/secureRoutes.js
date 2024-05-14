const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');

// GET /users/profile - Get user role
router.get('/user', userController.getUserRole);

module.exports = router;