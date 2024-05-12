const express = require('express');
const router = express.Router();
const courseController = require('../controllers/courseController');

// Route for getting all courses
router.get('/', courseController.getAllCourses);

// Route for getting a single course by ID
router.get('/:id', courseController.getCourseById);

// Route for creating a new course
router.post('/', courseController.createCourse);

// Route for updating an existing course by ID
router.put('/:id', courseController.updateCourse);

// Route for deleting a course by ID
router.delete('/:id', courseController.deleteCourse);

module.exports = router;