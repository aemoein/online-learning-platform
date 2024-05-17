const mongoose = require('mongoose');

// Define schema for Notification
const notificationSchema = new mongoose.Schema({
    student: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Student',
        required: true
    },
    course: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Course',
        required: true
    },
    status: {
        type: String,
        enum: ['accepted', 'rejected'],
        required: true
    }
});

// Create Notification model
const Notification = mongoose.model('Notification', notificationSchema);

module.exports = Notification;
