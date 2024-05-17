import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import InstructorEnrollmentCard from '../../Components/Cards/Instructor/InstructorEnrollmentCard';
import { Box, Grid, Typography } from '@mui/material';
import Navbar from '../../Components/Navbar/InstructorNavbar';

const ManageEnrollments = () => {
  const [enrollments, setEnrollments] = useState([]);
  const navigate = useNavigate();
  
  const token = localStorage.getItem('token');
  const axiosInstance = axios.create({
    baseURL: 'http://localhost:3003/',
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
  
    const fetchPendingEnrollments = async () => {
      try {
        const response = await axiosInstance.get('enrollment/instructor/pending');
        const enrollmentsData = response.data;
  
        const enrollmentsWithData = await Promise.all(
          enrollmentsData.map(async (enrollment) => {
            try {
              const studentResponse = await axiosInstance.get(`http://localhost:3001/users/student/${enrollment.student}`);
              const studentData = studentResponse.data;
  
              const courseResponse = await axiosInstance.get(`http://localhost:3002/instructor/courses/${enrollment.course}`);
              const courseData = courseResponse.data;
  
              return {
                ...enrollment,
                studentName: studentData.name,
                studentAffiliation: studentData.affiliation,
                courseName: courseData.name,
                capacity: courseData.capacity,
                enrolledStudents: courseData.enrolledStudents,
              };
            } catch (error) {
              console.error(`Error fetching data for enrollment ${enrollment._id}:`, error);
              return {
                ...enrollment,
                studentName: 'N/A',
                studentAffiliation: 'N/A',
                courseName: 'N/A',
                capacity: 'N/A',
                enrolledStudents: 'N/A',
              };
            }
          })
        );
  
        setEnrollments(enrollmentsWithData);
  
      } catch (error) {
        console.error('Error fetching pending enrollments:', error);
      }
    };
  
    fetchPendingEnrollments();
  }, [navigate, token, axiosInstance]);
  
  const handleApprove = async (id) => {
    try {
      const enrollment = enrollments.find(enrollment => enrollment._id === id);
      if (enrollment) {
        await axiosInstance.put(`enrollment/instructor/accept/${id}`);
        await axiosInstance.put(`http://localhost:3002/instructor/courses/enroll/${enrollment.course}`);
        setEnrollments(enrollments => enrollments.filter(enrollment => enrollment._id !== id));
      }
    } catch (error) {
      console.error('Error accepting enrollment:', error);
    }
  };
  
  const handleReject = async (id) => {
    try {
      await axiosInstance.put(`enrollment/instructor/reject/${id}`);
      setEnrollments(enrollments => enrollments.filter(enrollment => enrollment._id !== id));
    } catch (error) {
      console.error('Error rejecting enrollment:', error);
    }
  };  
  
  return (
    <>
      <Navbar />
      <Box sx={{ height: 40 }} />
      <Box sx={{ padding: '2rem' }}>
        <Typography variant="h4" sx={{ marginBottom: '2rem', fontFamily: 'Poppins', fontWeight: '900' }}>
          Pending Requests
        </Typography>
        <Grid container spacing={4}>
          {enrollments.map(enrollment => (
            <Grid item key={enrollment._id}>
              <InstructorEnrollmentCard
                name={enrollment.courseName}
                capacity={enrollment.capacity}
                enrolledStudents={enrollment.enrolledStudents}
                imageUrl={enrollment.imageUrl}
                studentName={enrollment.studentName}
                studentAffiliation={enrollment.studentAffiliation}
                onApprove={() => handleApprove(enrollment._id)}
                onReject={() => handleReject(enrollment._id)}
              />
            </Grid>
          ))}
        </Grid>
      </Box>
    </>
  );
};

export default ManageEnrollments;