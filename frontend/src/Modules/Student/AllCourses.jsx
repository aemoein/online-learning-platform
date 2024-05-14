import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import StudentCourseCard from '../../Components/Cards/Student/StudentCourseCard';
import { Box, Typography } from '@mui/material';
import Navbar from '../../Components/Navbar/StudentNavbar';

const AllCourses = () => {
  const [courses, setCourses] = useState([]);
  const navigate = useNavigate();

  const token = localStorage.getItem('token');
  const axiosInstance = axios.create({
    baseURL: 'http://localhost:3002/',
    headers: {
      'Authorization': `Bearer ${token}`
    }
  });

  useEffect(() => {
    if (!token) {
      console.log('Token not found in LocalStorage');
      navigate('/');
    }

    const fetchPendingCourses = async () => {
      try {
        const response = await axiosInstance.get('student/courses/');
        setCourses(response.data);
        console.log(courses);
      } catch (error) {
        console.error('Error fetching courses:', error);
      }
    };

    fetchPendingCourses();
  }, [navigate, token, axiosInstance]);

  const handleEnroll = async (id) => {
    try {
      await axiosInstance.put(`student/enroll/${id}`);
      setCourses(courses.filter(course => course._id !== id));
    } catch (error) {
      console.error('Error enrolling in the course:', error);
    }
  };

  return (
    <>
      <Navbar />
      <Box sx={{ height: 40 }} />
      <Box sx={{ padding: '2rem' }}>
        <Typography variant="h4" sx={{ marginBottom: '2rem', fontFamily: 'Poppins', fontWeight: '900' }}>
          Pending Courses
        </Typography>
        <Box sx={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
          {courses.map(course => (
            <StudentCourseCard
              key={course._id}
              name={course.name}
              duration={course.duration}
              category={course.category}
              rating={course.rating}
              capacity={course.capacity}
              enrolledStudents={course.enrolledStudents}
              reviews={course.reviews}
              status={course.status}
              content={course.content}
              imageUrl={course.imageUrl}
              onApprove={() => handleEnroll(course._id)}
            />
          ))}
        </Box>
      </Box>
    </>
  );
};

export default AllCourses;