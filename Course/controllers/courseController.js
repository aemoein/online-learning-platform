const {
    getAllCourses,
    getCourseById,
    createCourse,
    updateCourse,
    deleteCourse,
    approveCourse
} = require('../services/courseService');

// Controller function to get all courses
const getAllCoursesController = async (req, res) => {
    try {
        const courses = await getAllCourses();
        res.json(courses);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Controller function to get a course by ID
const getCourseByIdController = async (req, res) => {
    try {
        const course = await getCourseById(req.params.id);
        if (course) {
            res.json(course);
        } else {
            res.status(404).json({ message: 'Course not found' });
        }
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Controller function to create a new course
const createCourseController = async (req, res) => {
    try {
        const course = await createCourse(req.body);
        res.status(201).json(course);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

// Controller function to update a course by ID
const updateCourseController = async (req, res) => {
    try {
        const updatedCourse = await updateCourse(req.params.id, req.body);
        res.json(updatedCourse);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

// Controller function to delete a course by ID
const deleteCourseController = async (req, res) => {
    try {
        await deleteCourse(req.params.id);
        res.json({ message: 'Course deleted' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Controller function to approve a course by ID
const approveCourseController = async (req, res) => {
    try {
        const approvedCourse = await approveCourse(req.params.id);
        res.json(approvedCourse);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

module.exports = {
    getAllCoursesController,
    getCourseByIdController,
    createCourseController,
    updateCourseController,
    deleteCourseController,
    approveCourseController
};
