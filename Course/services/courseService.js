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

module.exports = {
    getAllCourses,
    getCourseById,
    createCourse,
    updateCourse,
    deleteCourse
};