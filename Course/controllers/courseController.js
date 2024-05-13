const courseService = require('../services/courseService');

const getAllCourses = async (req, res) => {
    try {
        const courses = await courseService.getAllCourses();
        res.json(courses);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

const getCourseById = async (req, res) => {
    try {
        const course = await courseService.getCourseById(req.params.id);
        if (!course) {
            return res.status(404).json({ message: 'Course not found' });
        }
        res.json(course);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

// Implement other controller functions for handling create, update, and delete operations

module.exports = {
    getAllCourses,
    getCourseById,
};
