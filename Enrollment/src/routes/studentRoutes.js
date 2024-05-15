const express = require('express');
const router = express.Router();
const enrollmentController = require('../controllers/enrollmentController');

// Routes for student users
router.get('/', enrollmentController.getAllEnrollments);
router.post('/create', enrollmentController.createEnrollment);
router.get('/:studentId', enrollmentController.getStudentEnrollments);
router.delete('/:enrollmentId', enrollmentController.cancelEnrollment);

module.exports = router;