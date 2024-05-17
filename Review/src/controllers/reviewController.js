const reviewService = require('../services/reviewService');

async function createReview(req, res) {
    const studentId = req.userId;
    console.log("stid: ", studentId);
    const { courseId, rating, reviewText } = req.body;
    console.log("crid: ", courseId);

    try {
        const review = await reviewService.createReview(courseId, studentId, rating, reviewText);
        res.status(201).json({ success: true, review });
    } catch (error) {
        res.status(400).json({ success: false, message: error.message });
    }
}

async function getCourseRating(req, res) {
    const courseId = req.params.courseId;

    try {
        const averageRating = await reviewService.getCourseRating(courseId);
        res.json({ success: true, averageRating });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
}

async function getStudentReviews(req, res) {
    const studentId = req.userId;

    try {
        const reviews = await reviewService.getStudentReviews(studentId);
        res.json({ success: true, reviews });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
}

async function getCourseReviews(req, res) {
    const courseId = req.params.courseId;

    try {
        const reviews = await reviewService.getCourseReviews(courseId);
        res.json({ success: true, reviews });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
}

module.exports = { createReview, getCourseRating, getStudentReviews, getCourseReviews };