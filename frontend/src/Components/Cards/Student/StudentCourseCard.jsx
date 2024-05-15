import React from 'react';
import { Box, Typography, Button } from '@mui/material';

const StudentCourseCard = ({
  name,
  duration,
  category,
  rating,
  capacity,
  enrolledStudents,
  reviews,
  content,
  width,
  imageUrl,
  instructorName,
  instructorAffiliation,
  onApprove,
}) => {
  return (
    <Box
      sx={{
        position: 'relative',
        width: width ? width : '93vw',
        height: 320,
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
        <Box 
            sx={{
                display: 'flex',
                justifyContent: 'space-between',
                //marginTop: '10px',
                maxWidth: '55vw'
            }}
        >
            <Typography
            sx={{
                fontFamily: 'Poppins',
                fontWeight: '900',
                width: 'fit-content',
                fontSize: 16,
                color: '#000'
            }}>
            Instructor: {instructorName}
            </Typography>
            <Typography
            sx={{
                fontFamily: 'Poppins',
                fontWeight: '900',
                width: 'fit-content',
                fontSize: 16,
                color: '#000'
            }}>
            Affiliation: {instructorAffiliation}
            </Typography>
        </Box>
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
          Duration: {duration} hours
        </Typography>
        <Box 
            sx={{
                display: 'flex',
                justifyContent: 'space-between',
                //marginTop: '10px',
                maxWidth: '36vw'
            }}
        > 
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
              fontWeight: '900',
              width: 'fit-content',
              fontSize: 16,
              color: '#000'
            }}>
            Enrolled Students: {enrolledStudents}
          </Typography>
        </Box>
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
            fontWeight: '400',
            width: 'fit-content',
            maxWidth: '75vw',
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
        <Box 
            sx={{
                display: 'flex',
                justifyContent: 'space-between',
                maxWidth: '87vw'
            }}
        >
            <Button
                variant="contained"
                onClick={onApprove}
                sx={{
                    fontSize: 16,
                    fontFamily: 'Poppins',
                    fontWeight: '700',
                    backgroundColor: '#000',
                    transition: 'background-color 0.3s',
                    '&:hover': {
                        backgroundColor: '#7f7f7f',
                    }
                }}
            >
                Enroll
            </Button>
        </Box>
      </Box>
    </Box>
  );
};

export default StudentCourseCard;