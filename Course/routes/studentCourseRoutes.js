const express = require('express');
const router = express.Router();
const courseController = require('../controllers/courseController');

// Route for getting all courses
router.get('/', courseController.getApprovedCoursesController);

// Route for getting a single course by ID
router.get('/:id', courseController.getCourseByIdController);

module.exports = router;