const express = require('express');
const router = express.Router();
const reviewController = require('../controllers/reviewController');

// Route to create a new review
router.post('/', reviewController.createReview);

// Route to get the average rating of a course
router.get('/course/:courseId/rating', reviewController.getCourseRating);

// Route to get all reviews done by a student
router.get('/student', reviewController.getStudentReviews);

// Route to get all reviews done on a specific course
router.get('/course/:courseId', reviewController.getCourseReviews);

module.exports = router;