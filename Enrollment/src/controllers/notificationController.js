const notificationService = require('../service/notificationService'); 

async function getUserNotifications(req, res) {
    const userId = req.userId;
    try {
        const notifications = await notificationService.getUserNotifications(userId);
        return res.status(200).json(notifications);
    } catch (error) {
        return res.status(500).json({ message: 'Could not get user notifications', error: error.message });
    }
}

module.exports = {
    getUserNotifications
};
