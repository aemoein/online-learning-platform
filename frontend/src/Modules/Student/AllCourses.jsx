import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import StudentCourseCard from '../../Components/Cards/Student/StudentCourseCard';
import { Box, Typography, TextField, Button } from '@mui/material';
import Navbar from '../../Components/Navbar/StudentNavbar';

const AllCourses = () => {
  const [courses, setCourses] = useState([]);
  const [filteredCourses, setFilteredCourses] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [sortOrder, setSortOrder] = useState('asc');
  const navigate = useNavigate();

  const token = localStorage.getItem('token');
  const axiosInstance = axios.create({
    baseURL: 'http://localhost:3002/',
    headers: {
      'Authorization': `Bearer ${token}`
    }
  });

  useEffect(() => {
    fetchCourses();
  }, []);

  const fetchCourses = async () => {
    try {
      const response = await axiosInstance.get('student/courses/');
      const coursesData = response.data;

      // Fetch instructor details for each course
      const coursesWithInstructors = await Promise.all(
        coursesData.map(async (course) => {
          try {
            // Fetch instructor profile
            const instructorResponse = await axiosInstance.get(
              `http://localhost:3001/users/instructor/${course.instructor}`,
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

      const coursesWithRating = await Promise.all(
          coursesWithInstructors.map(async (course) => {
            try {
              // Fetch course details
              const courseResponse = await axiosInstance.get(
                `http://localhost:3004/review/course/${course._id}/rating`,
                {
                  headers: {
                    Authorization: `Bearer ${token}`,
                  },
                }
              );
              
              const courseData = courseResponse.data;
              console.log(courseData.averageRating)
              return {
                ...course,
                rating: courseData.averageRating,
              };
            } catch (error) {
              console.error(`Error fetching course data for course ${course._id}:`, error);
              return { ...course }; // Return original course data if fetching fails
            }
          })
      );
      
      setCourses(coursesWithRating);
      setFilteredCourses(coursesWithRating);
    } catch (error) {
      console.error('Error fetching pending courses:', error);
    }
  };

  useEffect(() => {
    if (!token) {
      console.log('Token not found in LocalStorage');
      navigate('/');
    }
  }, [navigate, token, axiosInstance]);

  const handleEnroll = async (course) => {
    try {
      const enrollResponse = await axiosInstance.post(
        `http://localhost:3003/enrollment/student/create/`,
        {
          courseId: course._id,
          instructorId: course.instructor
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setCourses(courses.filter(c => c._id !== course._id));
      setFilteredCourses(filteredCourses.filter(c => c._id !== course._id));
    } catch (error) {
      console.error('Error enrolling in the course:', error);
    }
  };  

  const handleSearch = (query) => {
    setSearchQuery(query);
    const filtered = courses.filter(course =>
      course.name.toLowerCase().includes(query.toLowerCase()) ||
      course.category.toLowerCase().includes(query.toLowerCase())
    );
    setFilteredCourses(filtered);
  };

  const handleSort = () => {
    const sortedCourses = [...filteredCourses].sort((a, b) => {
      if (sortOrder === 'asc') {
        return a.rating - b.rating;
      } else {
        return b.rating - a.rating;
      }
    });
    setFilteredCourses(sortedCourses);
    setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
  };

  return (
    <>
      <Navbar />
      <Box sx={{ height: 40 }} />
      <Box sx={{ padding: '2rem' }}>
        <Typography variant="h4" sx={{ marginBottom: '2rem', fontFamily: 'Poppins', fontWeight: '900' }}>
            Courses
        </Typography>
        <TextField
          label="Search"
          variant="outlined"
          value={searchQuery}
          onChange={(e) => handleSearch(e.target.value)}
          fullWidth
          sx={{ marginBottom: '1rem' }}
        />
        <Button variant="contained" onClick={handleSort} sx={{ marginBottom: '1rem', fontFamily: 'poppins', fontWeight: '700', backgroundColor: '#000', color: '#fff' }}>
          Sort by Rating ({sortOrder === 'asc' ? 'Ascending' : 'Descending'})
        </Button>
        <Box sx={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
          {filteredCourses.map(course => (
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
                instructorName={course.instructorName}
                instructorAffiliation={course.instructorAffiliation}
                onApprove={() => handleEnroll(course)}
            />
          ))}
        </Box>
      </Box>
    </>
  );
};

export default AllCourses;