import React from 'react';
import { AppBar, Toolbar, Button, Box, Typography } from '@mui/material';
import { Link } from 'react-router-dom';

const Navbar = () => {
  return (
    <AppBar position="fixed" sx={{ backgroundColor: '#212121', zIndex: 1000 }}>
      <Toolbar sx={{ justifyContent: 'space-between', alignItems: 'center' }}>
        <Link to="/student" style={{ textDecoration: 'none', color: 'inherit' }}>
          <Typography sx={{ fontFamily: 'Poppins', fontWeight: '900', fontSize: 30, color: '#fff' }}>
            SkillSync
          </Typography>
        </Link>
        <Box>
          <Button component={Link} to="/student/my-courses" color="inherit" sx={buttonStyles}>
            MyCourses
          </Button>
          <Button component={Link} to="/student/courses" color="inherit" sx={buttonStyles}>
            Courses
          </Button>
          <Button component={Link} to="/student/notifications" color="inherit" sx={buttonStyles}>
            Notifications
          </Button>
          <Button component={Link} to="/student/reviews" color="inherit" sx={buttonStyles}>
            Reviews
          </Button>
        </Box>
      </Toolbar>
    </AppBar>
  );
};

const buttonStyles = {
  fontWeight: 'bold',
  fontSize: '15px',
  fontFamily: 'Poppins',
  borderRadius: '2px',
  color: '#fff',
  '&:hover': {
    backgroundColor: '#424242',
  },
  textTransform: 'none',
  marginLeft: '10px',
};

export default Navbar;