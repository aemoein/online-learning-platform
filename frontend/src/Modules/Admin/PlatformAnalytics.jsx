import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { 
  Table, TableBody, TableCell, TableContainer, TableHead, TableRow, 
  Paper, Button, TextField, Typography, Box
} from '@mui/material';
import Navbar from '../../Components/Navbar/AdminNavbar';

function CourseManagement() {
  const [courses, setCourses] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const token = localStorage.getItem('token');

  useEffect(() => {
    fetchCourses();
  }, []);

  const fetchCourses = async () => {
    try {
      const response = await axios.get('http://localhost:3002/admin/courses/', {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      setCourses(response.data);
    } catch (error) {
      console.error('Error fetching courses:', error);
    }
  };

  useEffect(() => {
    const results = courses.filter(course =>
      course.name.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setSearchResults(results);
  }, [searchTerm, courses]);

  const handleSearchChange = event => {
    setSearchTerm(event.target.value);
  };

  const handleDelete = async courseId => {
    try {
      await axios.delete(`http://localhost:3002/admin/courses/${courseId}`, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      setCourses(courses.filter(course => course.id !== courseId));
    } catch (error) {
      console.error('Error deleting course:', error);
    }
  };

  return (
    <div style={{ padding: '20px' }}>
      <Navbar/>
      <Box sx={{ height: 45 }} />
      <Typography variant="h4" gutterBottom sx={{fontFamily: 'Poppins', fontWeight: '700'}}>Course Management</Typography>
      <TextField
        variant="outlined"
        label="Search by course name"
        value={searchTerm}
        onChange={handleSearchChange}
        fullWidth
        margin="normal"
      />
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Name</TableCell>
              <TableCell>Instructor</TableCell>
              <TableCell>Duration</TableCell>
              <TableCell>Category</TableCell>
              <TableCell>Capacity</TableCell>
              <TableCell>Enrolled Students</TableCell>
              <TableCell>Status</TableCell>
              <TableCell>Content</TableCell>
              <TableCell>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {searchResults.map(course => (
              <TableRow key={course._id}>
                <TableCell>{course.name}</TableCell>
                <TableCell>{course.instructor}</TableCell>
                <TableCell>{course.duration}</TableCell>
                <TableCell>{course.category}</TableCell>
                <TableCell>{course.capacity}</TableCell>
                <TableCell>{course.enrolledStudents}</TableCell>
                <TableCell>{course.status}</TableCell>
                <TableCell>{course.content}</TableCell>
                <TableCell>
                  <Button 
                    variant="contained" 
                    color="secondary" 
                    onClick={() => handleDelete(course._id)}
                  >
                    Delete
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
}

export default CourseManagement;