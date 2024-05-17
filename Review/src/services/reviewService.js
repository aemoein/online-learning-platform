const Review = require('../models/Review');

async function createReview(courseId, studentId, rating, reviewText) {
    const existingReview = await Review.findOne({ course: courseId, student: studentId });
    if (existingReview) {
        throw new Error('Student has already reviewed this course.');
    }

    const review = new Review({
        course: courseId,
        student: studentId,
        rating: rating,
        review: reviewText
    });

    return review.save();
}

async function getCourseRating(courseId) {
    const ratings = await Review.find({ course: courseId }).select('rating');
    if (ratings.length === 0) {
        return 0; // If no reviews found, return 0 rating
    }

    const totalRating = ratings.reduce((sum, review) => sum + review.rating, 0);
    return totalRating / ratings.length;
}

async function getStudentReviews(studentId) {
    return Review.find({ student: studentId });
}

async function getCourseReviews(courseId) {
    // Get all the reviews done on this course
    return Review.find({ course: courseId });
}

module.exports = { createReview, getCourseRating, getStudentReviews, getCourseReviews };