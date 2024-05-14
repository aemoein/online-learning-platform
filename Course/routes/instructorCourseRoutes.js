const express = require('express');
const router = express.Router();
const courseController = require('../controllers/courseController');

// Route for getting all courses
router.get('/', courseController.getAllCoursesController);

// Route for getting a single course by ID
router.get('/:id', courseController.getCourseByIdController);

// Route for creating a new course
router.post('/', courseController.createCourseController);

module.exports = router;