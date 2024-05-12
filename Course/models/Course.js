const mongoose = require('mongoose');

const courseSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    duration: {
        type: Number,
        required: true,
    },
    category: String,
    rating: Number,
    capacity: Number,
    enrolledStudents: {
        type: Number,
        default: 0,
    },
    reviews: [String],
});

const Course = mongoose.model('Course', courseSchema);

module.exports = Course;
