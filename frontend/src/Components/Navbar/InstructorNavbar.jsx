import React from 'react';
import { AppBar, Toolbar, Button, Box, Typography } from '@mui/material';
import { Link } from 'react-router-dom';
import Logout from '../Buttons/Logout';

const Navbar = () => {
  return (
    <AppBar position="fixed" sx={{ backgroundColor: '#212121', zIndex: 1000 }}>
      <Toolbar sx={{ justifyContent: 'space-between', alignItems: 'center' }}>
        <Link to="/instructor" style={{ textDecoration: 'none', color: 'inherit' }}>
          <Typography sx={{ fontFamily: 'Poppins', fontWeight: '900', fontSize: 30, color: '#fff' }}>
            SkillSyncInstructor
          </Typography>
        </Link>
        <Box>
          <Button component={Link} to="/instructor/courses" color="inherit" sx={buttonStyles}>
            My Courses
          </Button>
          <Button component={Link} to="/instructor/create-course" color="inherit" sx={buttonStyles}>
            Create Course
          </Button>
          <Button component={Link} to="/instructor/browse" color="inherit" sx={buttonStyles}>
            Courses
          </Button>
          <Button component={Link} to="/instructor/enrollments" color="inherit" sx={buttonStyles}>
            Enrollments
          </Button>
          <Logout/>
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