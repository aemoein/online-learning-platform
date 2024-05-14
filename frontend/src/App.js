import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './Modules/System/Home';
import SignIn from './Modules/System/SignIn';
import SignUp from './Modules/System/SignUp';
import StudentHome from './Modules/Student/StudentHome';
import AdminHome from './Modules/Admin/AdminHome';
import InstructorHome from './Modules/Instructor/InstructorHome';
import CreateCourse from './Modules/Instructor/CreateCourse';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/signin" element={<SignIn />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/student" element={<StudentHome />} />
        <Route path="/instructor" element={<InstructorHome />} />
        <Route path="/instructor/create-course" element={<CreateCourse />} />
        <Route path="/admin" element={<AdminHome />} />
      </Routes>
    </Router>
  );
}

export default App;