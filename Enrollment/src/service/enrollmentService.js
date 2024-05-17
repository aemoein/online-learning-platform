const Enrollment = require('../models/Enrollment');

// Function to create a new enrollment
async function newEnrollment(courseId, studentId, instructorId) {
  try {
    const enrollment = new Enrollment({
      course: courseId,
      student: studentId,
      instructor: instructorId
    });
    const savedEnrollment = await enrollment.save();
    return savedEnrollment;
  } catch (error) {
    throw new Error('Could not create enrollment: ' + error.message);
  }
}

// Function to cancel enrollment by ID
async function cancelEnrollment(enrollmentId) {
  try {
    const deletedEnrollment = await Enrollment.findByIdAndDelete(enrollmentId);
    if (!deletedEnrollment) {
      throw new Error('Enrollment not found');
    }
    return deletedEnrollment;
  } catch (error) {
    throw new Error('Could not cancel enrollment: ' + error.message);
  }
}

// Function to accept enrollment by ID
async function acceptEnrollment(enrollmentId) {
  try {
    const updatedEnrollment = await Enrollment.findByIdAndUpdate(enrollmentId, { status: 'accepted' }, { new: true });
    if (!updatedEnrollment) {
      throw new Error('Enrollment not found');
    }
    return updatedEnrollment;
  } catch (error) {
    throw new Error('Could not accept enrollment: ' + error.message);
  }
}

// Function to reject enrollment by ID
async function rejectEnrollment(enrollmentId) {
  try {
    const updatedEnrollment = await Enrollment.findByIdAndUpdate(enrollmentId, { status: 'rejected' }, { new: true });
    if (!updatedEnrollment) {
      throw new Error('Enrollment not found');
    }
    return updatedEnrollment;
  } catch (error) {
    throw new Error('Could not reject enrollment: ' + error.message);
  }
}

// Function to get all enrollments for a student
async function getStudentEnrollments(studentId) {
  try {
    const enrollments = await Enrollment.find({ student: studentId });
    return enrollments;
  } catch (error) {
    throw new Error('Could not get student enrollments: ' + error.message);
  }
}

// Function to get all enrollments for an instructor
async function getInstructorEnrollments(instructorId) {
  try {
    const enrollments = await Enrollment.find({ instructor: instructorId });
    return enrollments;
  } catch (error) {
    throw new Error('Could not get instructor enrollments: ' + error.message);
  }
}

async function getPendingEnrollments(instructorId) {
    try {
        const enrollments = await Enrollment.find({ instructor: instructorId, status: 'pending' });
        return enrollments;
    } catch (error) {
        throw new Error('Could not get instructor enrollments: ' + error.message);
    }
}

async function getAllEnrollments(userId, role) {
    try {
        let query = {};
        if (role === 'student') {
            query = { student: userId };
        } else if (role === 'instructor') {
            query = { instructor: userId };
        } else {
            throw new Error('Invalid role specified');
        }
        
        const enrollments = await Enrollment.find(query);
        return enrollments;
    } catch (error) {
        throw new Error('Could not get all enrollments: ' + error.message);
    }
}

module.exports = {
  newEnrollment,
  cancelEnrollment,
  acceptEnrollment,
  rejectEnrollment,
  getStudentEnrollments,
  getInstructorEnrollments,
  getAllEnrollments,
  getPendingEnrollments,
};