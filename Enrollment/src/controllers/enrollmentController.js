const enrollmentService = require('../service/enrollmentService');

// Controller function to handle creating a new enrollment
async function createEnrollment(req, res) {
  const { courseId, instructorId } = req.body;
  const studentId = req.userId;
  try {
    const enrollment = await enrollmentService.newEnrollment(courseId, studentId, instructorId);
    res.status(201).json(enrollment);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

// Controller function to handle canceling an enrollment
async function cancelEnrollment(req, res) {
  const enrollmentId = req.params.enrollmentId;
  try {
    const deletedEnrollment = await enrollmentService.cancelEnrollment(enrollmentId);
    res.json(deletedEnrollment);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

// Controller function to handle accepting an enrollment
async function acceptEnrollment(req, res) {
  const enrollmentId = req.params.enrollmentId;
  try {
    const updatedEnrollment = await enrollmentService.acceptEnrollment(enrollmentId);
    res.json(updatedEnrollment);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

// Controller function to handle rejecting an enrollment
async function rejectEnrollment(req, res) {
  const enrollmentId = req.params.enrollmentId;
  try {
    const updatedEnrollment = await enrollmentService.rejectEnrollment(enrollmentId);
    res.json(updatedEnrollment);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

// Controller function to get all enrollments for a student
async function getStudentEnrollments(req, res) {
  const studentId = req.params.studentId;
  try {
    const enrollments = await enrollmentService.getStudentEnrollments(studentId);
    res.json(enrollments);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

// Controller function to get all enrollments for an instructor
async function getInstructorEnrollments(req, res) {
  const instructorId = req.params.instructorId;
  try {
    const enrollments = await enrollmentService.getInstructorEnrollments(instructorId);
    res.json(enrollments);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

// Controller for getPendingEnrollments
const getPendingEnrollments = async (req, res) => {
    try {
        const instructorId = req.userId;
        console.log('get enroll: ',instructorId);
        const enrollments = await enrollmentService.getPendingEnrollments(instructorId);
        res.json(enrollments);
    } catch (error) {
        res.status(500).json({ error: 'Could not get pending enrollments' });
    }
};

// Controller for getAllEnrollments
const getAllEnrollments = async (req, res) => {
    try {
        const enrollments = await getAllEnrollments();
        res.json(enrollments);
    } catch (error) {
        res.status(500).json({ error: 'Could not get all enrollments' });
    }
};

module.exports = {
  createEnrollment,
  cancelEnrollment,
  acceptEnrollment,
  rejectEnrollment,
  getStudentEnrollments,
  getInstructorEnrollments,
  getPendingEnrollments,
  getAllEnrollments,
};