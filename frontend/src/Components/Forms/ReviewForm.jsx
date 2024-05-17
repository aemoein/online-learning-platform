import React, { useState } from 'react';
import { TextField, Button, Typography, Container, Box, IconButton } from '@mui/material';
import axios from 'axios';
import CloseIcon from '@mui/icons-material/Close';

const ReviewForm = ({ courseId, onClose }) => {
    const [rating, setRating] = useState('');
    const [reviewText, setReviewText] = useState('');
    const [error, setError] = useState('');

    const handleSubmit = async (event) => {
        event.preventDefault();

        console.log('Rating:', rating);
        console.log('Review Text:', reviewText);

        try {
            const response = await axios.post(
                'http://localhost:3004/review/',
                {
                    courseId: courseId,
                    rating: rating,
                    reviewText: reviewText,
                },
                {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem('token')}`,
                    },
                }
            );

            console.log('Review created:', response.data);
            onClose();
        } catch (error) {
            console.error('Error creating review:', error);
            setError('Failed to create review. Please try again.');
        }
    };

    return (
        <Box
            sx={{
                position: 'fixed',
                top: 0,
                left: 0,
                width: '100vw',
                height: '100vh',
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                backgroundColor: 'rgba(0, 0, 0, 0.5)',
                zIndex: 9999,
            }}
        >
            <Box
                sx={{
                    backgroundColor: 'white',
                    borderRadius: 2,
                    boxShadow: '0px 4px 10px rgba(0, 0, 0, 0.1)',
                    padding: 3,
                    textAlign: 'center',
                    position: 'relative',
                }}
            >
                <IconButton
                    onClick={onClose}
                    sx={{
                        position: 'absolute',
                        top: 0,
                        right: 0,
                    }}
                >
                    <CloseIcon />
                </IconButton>
                <Typography sx={{ width:"100%", mb: 1, fontFamily: 'Poppins', fontWeight:'900' }} variant="h5">Review</Typography>
                <form onSubmit={handleSubmit}>
                    <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                        <TextField
                            label="Rating (1-10)"
                            variant="outlined"
                            type="number"
                            InputProps={{ inputProps: { min: 1, max: 10 } }}
                            onChange={(e) => setRating(e.target.value)}
                            required
                            sx={{ width:"100%", mb: 1}}
                        />
                        <TextField
                            label="Review Text"
                            variant="outlined"
                            multiline
                            rows={4}
                            value={reviewText}
                            onChange={(e) => setReviewText(e.target.value)}
                            required
                            sx={{ width:"100%", mb: 1}}
                        />
                        <Button type="submit" variant="contained" color="primary" sx={{
                            fontSize: 16,
                            fontFamily: 'Poppins',
                            fontWeight: '700',
                            width: '100%',
                            backgroundColor: '#000',
                            transition: 'background-color 0.3s',
                            '&:hover': {
                                backgroundColor: '#7f7f7f',
                            }
                        }}>
                            Submit
                        </Button>
                    </Box>
                </form>
            </Box>
        </Box>
    );
};

export default ReviewForm;