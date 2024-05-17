const {
    getAllCourses,
    getCourseById,
    createCourse,
    updateCourse,
    deleteCourse,
    enrollStudent,
    approveCourse,
    getPendingCourses,
    getApprovedCourses,
    getInstructorCourses,
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

const getInstructorCoursesController = async (req, res) => {
    try {
        const instructorId = req.userId;
        console.log('get enroll: ', instructorId);
        const courses = await getInstructorCourses(instructorId);
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
        if (req.role !== 'instructor') {
            return res.status(403).json({ message: 'Only instructors can create courses.' });
        }

        const courseData = {
            ...req.body,
            instructor: req.userId,
        };

        const course = await createCourse(courseData);
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

const enrollStudentController = async (req, res) => {
    const { courseId } = req.params;

    try {
        await enrollStudent(courseId);
        res.status(200).json({ message: 'Student enrolled successfully' });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

// Controller function to get all pending courses
const getPendingCoursesController = async (req, res) => {
    try {
        const pendingCourses = await getPendingCourses();
        res.json(pendingCourses);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Controller function to get all approved courses
const getApprovedCoursesController = async (req, res) => {
    try {
        const approvedCourses = await getApprovedCourses();
        res.json(approvedCourses);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

module.exports = {
    getAllCoursesController,
    getCourseByIdController,
    createCourseController,
    enrollStudentController,
    updateCourseController,
    deleteCourseController,
    approveCourseController,
    getPendingCoursesController,
    getApprovedCoursesController,
    getInstructorCoursesController,
};