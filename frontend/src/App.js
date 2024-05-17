import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './Modules/System/Home';
import SignIn from './Modules/System/SignIn';
import SignUp from './Modules/System/SignUp';
import StudentHome from './Modules/Student/StudentHome';
import StudentCourses from './Modules/Student/MyCourses';
import AdminHome from './Modules/Admin/AdminHome';
import UserManagement from './Modules/Admin/UserManagement';
import InstructorHome from './Modules/Instructor/InstructorHome';
import InstructorCourses from './Modules/Instructor/InstructorCourses';
import AllInstructorCourses from './Modules/Instructor/AllCoursesInstructor';
import ManageEnrollments from './Modules/Instructor/ManageEnrollments';
import CreateCourse from './Modules/Instructor/CreateCourse';
import CourseReview from './Modules/Admin/CourseReview';
import AllCourses from './Modules/Student/AllCourses';
import Notifications from './Modules/Student/Notifications';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/signin" element={<SignIn />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/student" element={<StudentHome />} />
        <Route path="/student/courses" element={<AllCourses />} />
        <Route path="/student/my-courses" element={<StudentCourses />} />
        <Route path="/student/notifications" element={<Notifications />} />
        <Route path="/instructor" element={<InstructorHome />} />
        <Route path="/instructor/create-course" element={<CreateCourse />} />
        <Route path="/instructor/enrollments" element={<ManageEnrollments />} />
        <Route path="/instructor/courses" element={<InstructorCourses />} />
        <Route path="/instructor/browse" element={<AllInstructorCourses />} />
        <Route path="/admin" element={<AdminHome />} />
        <Route path="/admin/user" element={<UserManagement />} />
        <Route path="/admin/review/course" element={<CourseReview />} />
      </Routes>
    </Router>
  );
}

export default App;