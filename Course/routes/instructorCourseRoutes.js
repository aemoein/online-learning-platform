const express = require('express');
const router = express.Router();
const courseController = require('../controllers/courseController');
const verifyTokenAndRole = require('../middleware/authMiddleware');

// Route for getting all courses
router.get('/all', courseController.getAllCoursesController);

// Route for getting instructor's courses
router.get('/', courseController.getInstructorCoursesController);

// Route for getting a single course by ID
router.get('/:id', courseController.getCourseByIdController);

// Route for enrolling a student in a course
router.put('/enroll/:courseId', courseController.enrollStudentController);

// Route for creating a new course
router.post('/', courseController.createCourseController);

module.exports = router;