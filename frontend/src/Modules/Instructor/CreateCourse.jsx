import React, { useState } from 'react';
import { Link as RouterLink, useNavigate } from 'react-router-dom';
import { TextField, Button, Typography, Link, Box, Container } from '@mui/material';
import axios from 'axios'; // Import Axios

function CreateCourse() {
    const [courseName, setCourseName] = useState('');
    const [duration, setDuration] = useState('');
    const [category, setCategory] = useState('');
    const [content, setContent] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const token = localStorage.getItem('token');

        if (token) {
         console.log('Token:', token);
        } else {
         console.log('Token not found in LocalStorage');
        }

    const handleCreateCourse = async (e) => {
        e.preventDefault();

        try {
            const response = await axios.post(
                'http://localhost:3002/instructor/courses',
                {
                    name: courseName,
                    duration: parseInt(duration),
                    category,
                    content,
                },
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                }
            );

            console.log('Course created:', response.data);
            navigate('/instructor');
        } catch (error) {
            console.error('Error creating course:', error);
            setError('Failed to create course. Please try again.');
        }
    };

    return (
        <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '100vh', bgcolor: 'background.default' }}>
           <Container component="main" maxWidth="xs" sx={{
                backgroundColor: 'white',
                borderRadius: 2,
                boxShadow: '0px 4px 10px rgba(0, 0, 0, 0.1)',
                padding: 3,
                textAlign: 'center',
            }}>
                <Box sx={{ marginTop: 8, display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                    <Typography component="h1" variant="h5" sx={{ fontFamily: 'Poppins', fontWeight: '900', fontSize: 30}}>
                        Create a New Course
                    </Typography>
                    <Box component="form" onSubmit={handleCreateCourse} sx={{ mt: 3 }}>
                        <TextField
                            margin="normal"
                            required
                            fullWidth
                            id="courseName"
                            label="Course Name"
                            name="courseName"
                            autoFocus
                            value={courseName}
                            onChange={(e) => setCourseName(e.target.value)}
                        />
                        <TextField
                            margin="normal"
                            required
                            fullWidth
                            id="duration"
                            label="Duration (in hours)"
                            name="duration"
                            type="number"
                            value={duration}
                            onChange={(e) => setDuration(e.target.value)}
                        />
                        <TextField
                            margin="normal"
                            required
                            fullWidth
                            id="category"
                            label="Category"
                            name="category"
                            value={category}
                            onChange={(e) => setCategory(e.target.value)}
                        />
                        <TextField
                            margin="normal"
                            required
                            fullWidth
                            multiline
                            rows={4}
                            id="content"
                            label="Content"
                            name="content"
                            value={content}
                            onChange={(e) => setContent(e.target.value)}
                        />
                        <Button type="submit" fullWidth variant="contained" sx={{ mt: 3, mb: 2, fontFamily: 'Poppins', fontWeight: '700'}}>
                            Create Course
                        </Button>
                        {error && <Typography color="error">{error}</Typography>}
                        <Link component={RouterLink} to="/instructor" variant="body2" sx={{fontFamily: 'Poppins', fontWeight: '700'}}>
                            Back to Home
                        </Link>
                    </Box>
                </Box>
            </Container>
        </Box>
    );
}

export default CreateCourse;