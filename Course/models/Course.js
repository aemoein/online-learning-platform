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
    status: {
        type: String,
        enum: ['pending', 'approved'],
        default: 'pending',
    },
    content: String,
    instructor: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Users',
        required: true,
    },
});

const Course = mongoose.model('Course', courseSchema);

module.exports = Course;