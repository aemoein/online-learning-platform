import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import InstructorCourseCard from '../../Components/Cards/Instructor/InstructorCourseCard';
import { Box, Stack, Typography, TextField, Button } from '@mui/material';
import Navbar from '../../Components/Navbar/InstructorNavbar';

const InstructorCourses = () => {
  const [courses, setCourses] = useState([]);
  const [filteredCourses, setFilteredCourses] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [sortOrder, setSortOrder] = useState('asc');
  const [error, setError] = useState(null);

  const token = localStorage.getItem('token');
  const navigate = useNavigate();

  const axiosInstance = axios.create({
    baseURL: 'http://localhost:3002/',
    headers: {
      'Authorization': `Bearer ${token}`,
    },
  });

  useEffect(() => {
    if (!token) {
      console.log('Token not found in LocalStorage');
      navigate('/');
      return;
    }
    fetchPendingCourses();
  }, [navigate, token]);

  const fetchPendingCourses = async () => {
    try {
      const response = await axiosInstance.get('instructor/courses/');
      const coursesData = response.data;

      const coursesWithRating = await Promise.all(
        coursesData.map(async (course) => {
          try {
            const courseResponse = await axiosInstance.get(
              `http://localhost:3004/review/course/${course._id}/rating`,
              {
                headers: {
                  Authorization: `Bearer ${token}`,
                },
              }
            );

            const courseData = courseResponse.data;
            return {
              ...course,
              rating: courseData.averageRating,
            };
          } catch (error) {
            console.error(`Error fetching course data for course ${course._id}:`, error);
            return { ...course, rating: null };
          }
        })
      );

      setCourses(coursesWithRating);
      setFilteredCourses(coursesWithRating);
    } catch (error) {
      console.error('Error fetching pending courses:', error);
      setError('Failed to fetch courses. Please try again later.');
    }
  };

  const handleSearch = (query) => {
    setSearchQuery(query);
    const filtered = courses.filter((course) =>
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
          Pending Courses
        </Typography>
        {error && (
          <Typography variant="h6" color="error">
            {error}
          </Typography>
        )}
        <TextField
          label="Search"
          variant="outlined"
          value={searchQuery}
          onChange={(e) => handleSearch(e.target.value)}
          fullWidth
          sx={{ marginBottom: '1rem' }}
        />
        <Button
          variant="contained"
          onClick={handleSort}
          sx={{ marginBottom: '1rem', fontFamily: 'Poppins', fontWeight: '700', backgroundColor: '#000', color: '#fff' }}
        >
          Sort by Rating ({sortOrder === 'asc' ? 'Ascending' : 'Descending'})
        </Button>
        <Stack spacing={4}>
          {filteredCourses.map((course) => (
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

export default InstructorCourses;