import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import AdminCourseCard from '../../Components/Cards/Admin/AdminCourseCard';
import { Box, Grid, Typography } from '@mui/material';
import Navbar from '../../Components/Navbar/AdminNavbar';

const CourseReview = () => {
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
      return;
    }
    
    const fetchPendingCourses = async () => {
      try {
        const response = await axiosInstance.get('admin/courses/pending');
        const coursesData = response.data;

        // Fetch instructor details for each course
        const coursesWithInstructors = await Promise.all(
          coursesData.map(async (course) => {
            try {
              // Fetch instructor profile
              const instructorResponse = await axiosInstance.get(
                `http://localhost:3001/users/instructor/${course.instructor}`, // Adjusted URL
                {
                  headers: {
                    Authorization: `Bearer ${token}`,
                  },
                }
              );
              
              const instructorData = instructorResponse.data;
              return {
                ...course,
                instructorName: instructorData.name,
                instructorAffiliation: instructorData.affiliation
              };
            } catch (error) {
              console.error(`Error fetching instructor for course ${course._id}:`, error);
              return { ...course, instructorName: 'N/A', instructorAffiliation: 'N/A' };
            }
          })
        );
        
        setCourses(coursesWithInstructors);
      } catch (error) {
        console.error('Error fetching pending courses:', error);
      }
    };
    
    fetchPendingCourses();
  }, [navigate, token, axiosInstance]);
  
  const handleApprove = async (id) => {
    try {
      await axiosInstance.put(`admin/courses/${id}/approve`);
      setCourses(courses.filter(course => course._id !== id));
    } catch (error) {
      console.error('Error approving course:', error);
    }
  };
  
  const handleReject = async (id) => {
    try {
      await axiosInstance.delete(`admin/courses/${id}`);
      setCourses(courses.filter(course => course._id !== id));
    } catch (error) {
      console.error('Error rejecting course:', error);
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
        <Grid container spacing={4}>
          {courses.map(course => (
            <Grid item key={course._id}>
              <AdminCourseCard
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
                instructorName={course.instructorName}
                instructorAffiliation={course.instructorAffiliation}
                onApprove={() => handleApprove(course._id)}
                onReject={() => handleReject(course._id)}
              />
            </Grid>
          ))}
        </Grid>
      </Box>
    </>
  );
};

export default CourseReview;