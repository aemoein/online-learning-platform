import React, { useState } from 'react';
import { Link as RouterLink, useNavigate } from 'react-router-dom';
import { TextField, Button, Typography, Link, Box, Radio, RadioGroup, FormControlLabel, Container } from '@mui/material';
import axios from 'axios';

const SignUp = () => {
  const navigate = useNavigate();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [affiliation, setAffiliation] = useState('');
  const [bio, setBio] = useState('');
  const [role, setRole] = useState('');
  const [yearsOfExperience, setYearsOfExperience] = useState('');
  const [error, setError] = useState('');

  const handleSignUp = async () => {
    console.log('Data sent to the backend:', {
      name,
      email,
      password,
      affiliation,
      bio,
      role,
      yearsOfExperience
    });
  
    try {
      const response = await axios.post('http://localhost:3001/users/register', {
        name,
        email,
        password,
        affiliation,
        bio,
        role,
        yearsOfExperience
      });
  
      console.log('Response:', response);
  
      if (response.status === 201) {
        console.log('User signed up successfully.');
        navigate('/signin');
      } else {
        console.error('Unexpected status code:', response.status);
        setError('Error signing up. Please try again.');
      }
    } catch (error) {
      console.error('Error during sign-up:', error);
      if (error.response) {
        console.log('Error response data:', error.response.data);
        setError('Error signing up. Please try again.');
      } else if (error.request) {
        console.error('No response received:', error.request);
        setError('No response received. Please try again.');
      } else {
        console.error('Error setting up request:', error.message);
        setError('Error setting up request. Please try again.');
      }
    }
  };  

  return (
    <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '100vh', minWidth: '100vw', bgcolor: 'background.default' }}>
      <Container component="main" maxWidth="xs" sx={{
        backgroundColor: 'white',
        borderRadius: 2,
        boxShadow: '0px 4px 10px rgba(0, 0, 0, 0.1)',
        padding: 3,
        textAlign: 'center',
      }}>
        <Typography variant="h5" gutterBottom sx={{ fontFamily: 'Poppins', mb: 2 }}>Sign Up</Typography>
        {error && <Typography sx={{ color: 'red', border: '1px solid red', p: 1, mb: 2, fontFamily: 'Poppins' }}>{error}</Typography>}
        <Box component="form">
          <TextField
            label="Full Name"
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            fullWidth
            margin="normal"
            sx={{ mb: 2, fontFamily: 'Poppins' }}
          />
          <TextField
            label="Email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            fullWidth
            margin="normal"
            sx={{ mb: 2, fontFamily: 'Poppins' }}
          />
          <TextField
            label="Password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            fullWidth
            margin="normal"
            sx={{ mb: 2, fontFamily: 'Poppins' }}
          />
          <TextField
            label="Affiliation"
            type="text"
            value={affiliation}
            onChange={(e) => setAffiliation(e.target.value)}
            fullWidth
            margin="normal"
            sx={{ mb: 2, fontFamily: 'Poppins' }}
          />
          <TextField
            label="Bio"
            type="text"
            value={bio}
            onChange={(e) => setBio(e.target.value)}
            fullWidth
            margin="normal"
            sx={{ mb: 2, fontFamily: 'Poppins' }}
          />
          <RadioGroup
            row
            aria-label="role"
            name="role"
            value={role}
            onChange={(e) => setRole(e.target.value)}
            sx={{ mb: 2, fontFamily: 'Poppins', display: 'flex', justifyContent: 'center' }}
          >
            <FormControlLabel value="instructor" control={<Radio />} label="Instructor" sx={{mr: 7}}/>
            <FormControlLabel value="student" control={<Radio />} label="Student" />
          </RadioGroup>
          {role === 'instructor' && (
            <TextField
              label="Years of Experience"
              type="number"
              value={yearsOfExperience}
              onChange={(e) => setYearsOfExperience(e.target.value)}
              fullWidth
              margin="normal"
              sx={{ mb: 2, fontFamily: 'Poppins' }}
            />
          )}
          <Button variant="contained" onClick={handleSignUp} fullWidth sx={{ mb: 1, fontFamily: 'Poppins', fontWeight: '700', fontSize: 18 }}>Sign Up</Button>
          <Box sx={{ mb: 2 }} />
          <Link component={RouterLink} to="/signin" variant="body2" sx={{ textTransform: 'none', fontFamily: 'Poppins', fontWeight: 'bold' }}>Already Signed Up? Login</Link>
        </Box>
      </Container>
    </Box>
  );
};

export default SignUp;