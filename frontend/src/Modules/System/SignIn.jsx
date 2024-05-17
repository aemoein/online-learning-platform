import React, { useState } from 'react';
import { Link as RouterLink, useNavigate } from 'react-router-dom';
import { TextField, Button, Typography, Link, Container, Box } from '@mui/material';
import axios from 'axios';

const SignIn = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSignIn = async (e) => {
    e.preventDefault();
    setError('');
    try {
      const response = await axios.post('http://localhost:3001/users/login', { email, password });
      const { token, role } = response.data;
      localStorage.setItem('token', token);
      localStorage.setItem('role', role);

      console.log(role);
      console.log(token);

      // Redirect based on role
      if (role === "instructor") {
        navigate(`/instructor`);
      } else if (role === "student") {
        navigate(`/student`);
      } else if (role === "admin") {
        navigate(`/admin`);
      }
    } catch (error) {
      setError('Authentication failed. Please check your email and password.');
      console.error('Authentication failed:', error);
    }
  };

  return (
    <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '100vh', minWidth: '100vw', bgcolor: 'background.default' }}>
      <Box sx={{ minWidth: '40vw' }}>
        <Container component="main" maxWidth="xs" sx={{
          backgroundColor: 'white',
          borderRadius: 2,
          boxShadow: '0px 4px 10px rgba(0, 0, 0, 0.1)',
          padding: 3,
          textAlign: 'center',
        }}>
          <Box>
            <Typography component="h2" variant="h5" sx={{ fontFamily: 'Poppins', fontWeight: 'bold', marginBottom: 4 }}>
              Log in
            </Typography>
            <Box component="form" onSubmit={handleSignIn} noValidate sx={{ mt: 1 }}>
              <TextField
                margin="normal"
                required
                fullWidth
                id="email"
                label="Email"
                name="email"
                autoComplete="email"
                autoFocus
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                sx={{ fontFamily: 'Poppins' }}
              />
              <TextField
                margin="normal"
                required
                fullWidth
                name="password"
                label="Password"
                type="password"
                id="password"
                autoComplete="current-password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                sx={{ fontFamily: 'Poppins' }}
              />
              <Button
                type="submit"
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 2, fontFamily: 'Poppins', fontWeight: '700', fontSize: 18 }}
              >
                Log In
              </Button>
            </Box>
            {error && <Typography sx={{ color: 'red', mb: 2, fontFamily: 'Poppins' }}>{error}</Typography>}
            <Typography>
              <Link component={RouterLink} to="/signup" variant="body2"
                sx={{
                  textTransform: 'none',
                  fontFamily: 'Poppins',
                  fontWeight: 'bold',
                }}>
                Don't have an account? Sign Up
              </Link>
            </Typography>
          </Box>
        </Container>
      </Box>
    </Box>
  );
};

export default SignIn;