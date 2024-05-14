const Course = require('../models/Course');

// Function to get all courses
const getAllCourses = async () => {
    return await Course.find();
};

// Function to get a course by ID
const getCourseById = async (id) => {
    return await Course.findById(id);
};

// Function to create a new course
const createCourse = async (courseData) => {
    return await Course.create(courseData);
};

// Function to update a course by ID
const updateCourse = async (id, updatedCourseData) => {
    return await Course.findByIdAndUpdate(id, updatedCourseData, { new: true });
};

// Function to delete a course by ID
const deleteCourse = async (id) => {
    return await Course.findByIdAndDelete(id);
};

// Function to approve a course by ID
const approveCourse = async (id) => {
    const course = await Course.findById(id);
    if (!course) {
        throw new Error('Course not found');
    }
    course.status = 'approved';
    return await course.save();
};

// Function to get only pending courses
const getPendingCourses = async () => {
    return await Course.find({ status: 'pending' });
};

const getApprovedCourses = async () => {
    return await Course.find({ status: 'approved' });
};

module.exports = {
    getAllCourses,
    getCourseById,
    createCourse,
    updateCourse,
    deleteCourse,
    approveCourse,
    getPendingCourses,
    getApprovedCourses
};