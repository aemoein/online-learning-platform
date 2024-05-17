import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import InstructorCourseCard from '../../Components/Cards/Instructor/InstructorCourseCard';
import { Box, Grid, Typography, Stack } from '@mui/material';
import Navbar from '../../Components/Navbar/InstructorNavbar';

const AllInstructorCourses = () => {
  const [courses, setCourses] = useState([]);
  const [error, setError] = useState(null);
  const navigate = useNavigate();
  
  useEffect(() => {
    const token = localStorage.getItem('token');
    
    if (!token) {
      console.log('Token not found in LocalStorage');
      navigate('/');
      return;
    }

    const axiosInstance = axios.create({
      baseURL: 'http://localhost:3002/',
      headers: {
        'Authorization': `Bearer ${token}`
      }
    });

    const fetchPendingCourses = async () => {
      try {
        const response = await axiosInstance.get('instructor/courses/');
        setCourses(response.data);
      } catch (error) {
        console.error('Error fetching pending courses:', error);
        setError('Failed to fetch courses. Please try again later.');
      }
    };
    
    fetchPendingCourses();
  }, [navigate]);

  return (
    <>
    <Navbar />
    <Box sx={{ height: 40 }} />
    <Box sx={{ padding: '2rem' }}>
        <Typography variant="h4" sx={{ marginBottom: '2rem', fontFamily: 'Poppins', fontWeight: '900' }}>
        Pending Courses
        </Typography>
        {error && (
        <Typography variant="h6" color="error">
            {error}
        </Typography>
        )}
        <Stack spacing={4}>
        {courses.map(course => (
            <InstructorCourseCard
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
            />
        ))}
        </Stack>
    </Box>
    </>
  );
};

export default AllInstructorCourses;