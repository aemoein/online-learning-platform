import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import MyCourseCard from '../../Components/Cards/Student/MyCoursesCard';
import { Box, Typography } from '@mui/material';
import Navbar from '../../Components/Navbar/StudentNavbar';
import ReviewForm from '../../Components/Forms/ReviewForm';

const StudentCourses = () => {
  const [courses, setCourses] = useState([]);
  const [selectedCourse, setSelectedCourse] = useState(null); // State to hold selected course
  const [isReviewFormOpen, setIsReviewFormOpen] = useState(false); // State to manage ReviewForm visibility
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
    }

    const fetchCourses = async () => {
      try {
        const response = await axiosInstance.get('/enrollment/student/');
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
                  `http://localhost:3004/review/course/${course.course}/rating`,
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
        
        // Fetch course details for each course
        const coursesWithData = await Promise.all(
            coursesWithRating.map(async (course) => {
            try {
              // Fetch course details
              const courseResponse = await axiosInstance.get(
                `http://localhost:3002/student/courses/${course.course}`,
                {
                  headers: {
                    Authorization: `Bearer ${token}`,
                  },
                }
              );
              
              const courseData = courseResponse.data;
              return {
                ...course,
                name: courseData.name,
                duration: courseData.duration,
                category: courseData.category,
                capacity: courseData.capacity,
                enrolledStudents: courseData.enrolledStudents,
                reviews: courseData.reviews,
                status: courseData.status,
                content: courseData.content
              };
            } catch (error) {
              console.error(`Error fetching course data for course ${course._id}:`, error);
              return { ...course }; // Return original course data if fetching fails
            }
          })
        );
        
        setCourses(coursesWithData);
      } catch (error) {
        console.error('Error fetching courses:', error);
      }
    };

    fetchCourses();
  }, [navigate, token, axiosInstance]);

  const handleReview = (course) => {
    setSelectedCourse(course);
    setIsReviewFormOpen(true);
  };  

  const handleCloseReviewForm = () => {
    setIsReviewFormOpen(false);
  };

  return (
    <>
      <Navbar />
      <Box sx={{ height: 40 }} />
      <Box sx={{ padding: '2rem' }}>
        <Typography variant="h4" sx={{ marginBottom: '2rem', fontFamily: 'Poppins', fontWeight: '900' }}>
            Courses
        </Typography>
        <Box sx={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            {courses.map(course => (
                <MyCourseCard
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
                    onApprove={() => handleReview(course)}
                />
            ))}
            {selectedCourse && isReviewFormOpen && <ReviewForm courseId={selectedCourse.course} onClose={handleCloseReviewForm} />}
        </Box>
      </Box>
    </>
  );
};

export default StudentCourses;