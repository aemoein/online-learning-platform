const Course = require('../models/Course');

// Function to get all courses
const getAllCourses = async () => {
    try {
        return await Course.find();
    } catch (error) {
        throw new Error(`Failed to get all courses: ${error.message}`);
    }
};

// Function to get courses by instructor
const getInstructorCourses = async (instructorId) => {
    try {
        return await Course.find({ instructor: instructorId });
    } catch (error) {
        throw new Error('Could not get instructor enrollments: ' + error.message);
    }
};

// Function to get a course by ID
const getCourseById = async (id) => {
    try {
        const course = await Course.findById(id);
        if (!course) {
            throw new Error('Course not found');
        }
        return course;
    } catch (error) {
        throw new Error(`Failed to get course by ID: ${error.message}`);
    }
};

// Function to create a new course
const createCourse = async (courseData) => {
    try {
        return await Course.create(courseData);
    } catch (error) {
        throw new Error(`Failed to create course: ${error.message}`);
    }
};

// Function to update a course by ID
const updateCourse = async (id, updatedCourseData) => {
    try {
        const course = await Course.findByIdAndUpdate(id, updatedCourseData, { new: true });
        if (!course) {
            throw new Error('Course not found');
        }
        return course;
    } catch (error) {
        throw new Error(`Failed to update course: ${error.message}`);
    }
};

// Function to delete a course by ID
const deleteCourse = async (id) => {
    try {
        const course = await Course.findByIdAndDelete(id);
        if (!course) {
            throw new Error('Course not found');
        }
        return course;
    } catch (error) {
        throw new Error(`Failed to delete course: ${error.message}`);
    }
};

// Function to approve a course by ID
const approveCourse = async (id) => {
    try {
        const course = await Course.findById(id);
        if (!course) {
            throw new Error('Course not found');
        }
        course.status = 'approved';
        return await course.save();
    } catch (error) {
        throw new Error(`Failed to approve course: ${error.message}`);
    }
};

// Function to enroll a student in a course by ID
const enrollStudent = async (id) => {
    try {
        const course = await Course.findById(id);
        if (!course) {
            throw new Error('Course not found');
        }
        if (course.enrolledStudents < course.capacity) {
            course.enrolledStudents += 1; 
            return await course.save();
        } else {
            throw new Error('Capacity is full');
        }
    } catch (error) {
        throw new Error(`Failed to enroll student: ${error.message}`);
    }
};

// Function to get only pending courses
const getPendingCourses = async () => {
    try {
        return await Course.find({ status: 'pending' });
    } catch (error) {
        throw new Error(`Failed to get pending courses: ${error.message}`);
    }
};

// Function to get approved courses
const getApprovedCourses = async () => {
    try {
        return await Course.find({ status: 'approved' });
    } catch (error) {
        throw new Error(`Failed to get approved courses: ${error.message}`);
    }
};

module.exports = {
    getAllCourses,
    getCourseById,
    createCourse,
    updateCourse,
    deleteCourse,
    approveCourse,
    enrollStudent,
    getPendingCourses,
    getApprovedCourses,
    getInstructorCourses
};