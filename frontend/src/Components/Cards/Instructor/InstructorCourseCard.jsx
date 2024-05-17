import React from 'react';
import { Box, Typography } from '@mui/material';

const InstructorCourseCard = ({
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
}) => {
  const cardHeight = status === 'pending' ? 220 : 280;
  const statusColor = status === 'pending' ? 'orange' : 'green';

  return (
    <Box
      sx={{
        position: 'relative',
        width: width ? width : '93vw',
        height: cardHeight,
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
            fontSize: 20,
            color: statusColor
          }}>
          Status: {status}
        </Typography>
        {status !== 'pending' && (
          <>
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
          </>
        )}
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
        {status !== 'pending' && (
          <>
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
          </>
        )}
      </Box>
    </Box>
  );
};

export default InstructorCourseCard;