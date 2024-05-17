import React from 'react';
import { Box, Typography, Button } from '@mui/material';

const NotificationCard = ({
  name,
  status,
  imageUrl,
  width,
}) => {
  return (
    <Box
      sx={{
        position: 'relative',
        width: width ? width : '93vw',
        height: 120,
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
        {status === 'accepted' ? (
          <Typography
            sx={{
              fontFamily: 'Poppins',
              fontWeight: '900',
              width: 'fit-content',
              fontSize: 30,
              color: '#000'
            }}>
            You were successfully accepted to {name} course.
          </Typography>
        ) : (
          <Typography
            sx={{
              fontFamily: 'Poppins',
              fontWeight: '900',
              width: 'fit-content',
              fontSize: 30,
              color: '#000'
            }}>
            You were unfortunately rejected from {name} course.
          </Typography>
        )}
      </Box>
    </Box>
  );
};

export default NotificationCard;