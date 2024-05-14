const express = require('express');
const router = express.Router();
const courseController = require('../controllers/courseController');

// Route for getting all courses
router.get('/', courseController.getAllCoursesController);

// Route for getting a single course by ID
router.get('/:id', courseController.getCourseByIdController);

// Route for updating an existing course by ID
router.put('/:id', courseController.updateCourseController);

// Route for deleting a course by ID
router.delete('/:id', courseController.deleteCourseController);

// Route for approving a course by ID
router.put('/:id/approve', courseController.approveCourseController);

module.exports = router;