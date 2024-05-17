const express = require('express');
const router = express.Router();
const enrollmentController = require('../controllers/enrollmentController');

// Routes for instructor users
router.get('/', enrollmentController.getAllEnrollments);
//router.get('/', enrollmentController.getInstructorEnrollments);
router.put('/accept/:enrollmentId', enrollmentController.acceptEnrollment);
router.put('/reject/:enrollmentId', enrollmentController.rejectEnrollment);
router.get('/pending', enrollmentController.getPendingEnrollments);

module.exports = router;