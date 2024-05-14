import React from 'react';
import { Box, Typography, Chip, Button } from '@mui/material';

const AdminCourseCard = ({
  name,
  duration,
  category,
  rating,
  capacity,
  enrolledStudents,
  reviews,
  status,
  content,
  width,
  imageUrl,
  onApprove,
  onReject,
}) => {
  return (
    <Box
      sx={{
        position: 'relative',
        width: width ? width : '93vw',
        height: 250,
        borderRadius: '10px',
        overflow: 'hidden',
        boxShadow: '0px 4px 6px rgba(0, 0, 0, 0.1)',
        transition: 'transform 0.3s ease-in-out',
        '&:hover': {
          transform: 'scale(1.05)',
        }
      }}
    >
      <Box
        sx={{
          position: 'absolute',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          backgroundImage: imageUrl ? `linear-gradient(to bottom, rgba(0,0,0,0) 0%, rgba(0,0,0,0.5) 100%), url(${imageUrl})` : 'none',
          backgroundColor: imageUrl ? 'none' : '#fff',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          borderRadius: '10px',
          overflow: 'hidden',
        }}
      />
      <Box
        sx={{
          position: 'absolute',
          bottom: '0',
          left: '0',
          padding: '20px',
          color: '#fff',
          width: '100%',
          borderRadius: '0 0 10px 10px',
          //backgroundColor: imageUrl ? 'transparent' : 'rgba(0, 0, 0, 0.5)',
        }}
      >
        <Typography
          sx={{
            fontFamily: 'Poppins',
            fontWeight: '900',
            width: 'fit-content',
            fontSize: 30,
            color: '#000'
          }}>
          {name}
        </Typography>
        <Typography
          sx={{
            fontFamily: 'Poppins',
            fontWeight: '900',
            width: 'fit-content',
            fontSize: 16,
            color: '#000'
          }}>
          Duration: {duration} hours
        </Typography>
        <Typography
          sx={{
            fontFamily: 'Poppins',
            fontWeight: '900',
            width: 'fit-content',
            fontSize: 16,
            color: '#000'
          }}>
          Category: {category}
        </Typography>
        <Typography
          sx={{
            fontFamily: 'Poppins',
            fontWeight: '900',
            width: 'fit-content',
            fontSize: 16,
            color: '#000'
          }}>
          Capacity: {capacity}
        </Typography>
        {status !== 'pending' && ( 
            <Typography
                sx={{
                fontFamily: 'Poppins',
                fontWeight: '900',
                width: 'fit-content',
                fontSize: 16,
                color: '#000'
                }}>
                Rating: {rating}
            </Typography>
        )}
        {status !== 'pending' && ( 
            <Typography
             sx={{
               fontFamily: 'Poppins',
               fontWeight: '900',
               width: 'fit-content',
               fontSize: 16,
               color: '#000'
             }}>
             Enrolled Students: {enrolledStudents}
           </Typography>
        )}
        <Typography
          sx={{
            fontFamily: 'Poppins',
            fontWeight: '400',
            width: 'fit-content',
            maxWidth: '65vw',
            marginTop: '5px',
            fontSize: 15,
            color: '#000'
          }}>
          {content}
        </Typography>
        <Typography
          sx={{
            fontFamily: 'Poppins',
            fontWeight: '900',
            width: 'fit-content',
            fontSize: '0.8vw',
            marginTop: '5px'
          }}>
          Reviews:
        </Typography>
        {reviews && reviews.map((review, index) => (
            <Typography
                key={index}
                sx={{
                fontFamily: 'Poppins',
                fontWeight: '400',
                width: 'fit-content',
                fontSize: 16,
                color: '#000',
                maxWidth: '25vw',
                marginTop: '2px'
                }}>
                - {review}
            </Typography>
        ))}
        {status === 'pending' && (
            <Box 
                sx={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    //marginTop: '10px',
                    maxWidth: '87vw'
                }}
            >
                <Button
                    variant="contained"
                    color="success"
                    onClick={onApprove}
                    sx={{ fontSize: 16, fontFamily:'Poppins', fontWeight: '700' }}
                    >
                    Approve
                </Button>
                <Button
                    variant="contained"
                    color="error"
                    onClick={onReject}
                    sx={{ fontSize: 16, fontFamily:'Poppins', fontWeight: '700' }}
                    >
                    Reject
                </Button>
            </Box>
        )}
      </Box>
    </Box>
  );
};

export default AdminCourseCard;