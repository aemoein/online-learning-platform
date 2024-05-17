const Notification = require('../models/Notification');

// Function to save a notification
async function saveNotification(studentId, courseId, status) {
    try {
        const notification = new Notification({
            student: studentId,
            course: courseId,
            status: status
        });
        await notification.save();
        return notification;
    } catch (error) {
        throw new Error('Error saving notification: ' + error.message);
    }
}

// Function to get user notifications by user id
async function getUserNotifications(userId) {
    try {
        const notifications = await Notification.find({ student: userId });
        return notifications;
    } catch (error) {
        throw new Error('Error getting user notifications: ' + error.message);
    }
}

module.exports = {
    saveNotification,
    getUserNotifications
};