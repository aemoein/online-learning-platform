import React, { useState, useEffect } from 'react';
import axios from 'axios';

function CourseReview() {
  const [courses, setCourses] = useState([]);
  const [selectedCourse, setSelectedCourse] = useState(null);

  useEffect(() => {
    // Fetch courses from localhost:8001 when the component mounts
    fetchCourses();
  }, []);

  const fetchCourses = async () => {
    try {
      const response = await axios.get('http://localhost:8001/courses');
      setCourses(response.data); // Assuming the response is an array of course objects
    } catch (error) {
      console.error('Error fetching courses:', error);
    }
  };

  const handleCourseSelect = course => {
    setSelectedCourse(course);
  };

  const handleApprove = () => {
    // Logic to approve the selected course
    console.log('Course approved:', selectedCourse);
  };

  const handleReject = () => {
    // Logic to reject the selected course
    console.log('Course rejected:', selectedCourse);
  };

  return (
    <div>
      <h2>Course Review</h2>
      <div>
        <h3>Courses to Review:</h3>
        <ul>
          {courses.map(course => (
            <li key={course.id} onClick={() => handleCourseSelect(course)}>
              {course.name}
            </li>
          ))}
        </ul>
      </div>
      {selectedCourse && (
        <div>
          <h3>Selected Course: {selectedCourse.name}</h3>
          <p>Duration: {selectedCourse.duration}</p>
          <p>Category: {selectedCourse.category}</p>
          <p>Rating: {selectedCourse.rating}</p>
          {/* Additional course details */}
          <button onClick={handleApprove}>Approve</button>
          <button onClick={handleReject}>Reject</button>
        </div>
      )}
    </div>
  );
}

export default CourseReview;