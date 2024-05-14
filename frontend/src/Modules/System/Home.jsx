import React from 'react';
import { Link as RouterLink } from 'react-router-dom';
import { Typography, Link, Box, Button, Container } from '@mui/material';

const HomePage = () => {
  return (
    <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '100vh', minWidth: '100vw', bgcolor: 'background.default' }}>
      <Container component="main" maxWidth="sm" sx={{
        textAlign: 'center',
      }}>
        <Box sx={{ display: 'flex', justifyContent: 'center', mt: 2 }}>
        <Typography variant="h3" gutterBottom sx={{ fontFamily: 'Poppins', mb: 2, mr: 1.4, fontWeight: '600' }}>Welcome to </Typography>
            <Typography variant="h3" gutterBottom sx={{ fontFamily: 'Poppins', mb: 2, fontWeight: '900' }}>SkillSync</Typography>
        </Box>
        <Typography variant="body1" gutterBottom sx={{ fontFamily: 'Poppins', mb: 2, fontWeight: '600' }}>Your Trusted Online Learning Platform</Typography>
        <Box sx={{ display: 'flex', justifyContent: 'center', mt: 2 }}>
          <Button component={RouterLink} to="/signin" variant="contained" sx={{ mr: 1, fontFamily: 'Poppins', fontWeight: '700', fontSize: 18 }}>Sign In</Button>
          <Button component={RouterLink} to="/signup" variant="contained" sx={{ ml: 1, fontFamily: 'Poppins', fontWeight: '700', fontSize: 18 }}>Sign Up</Button>
        </Box>
      </Container>
    </Box>
  );
};

export default HomePage;