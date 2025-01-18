import React from 'react';
import Button from '@mui/material/Button';
import { useNavigate } from 'react-router-dom';

const Logout = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem('token');
    navigate('/');
  };

  return (
    <Button variant="contained" color="primary" onClick={handleLogout}
        sx={{fontFamily: 'poppins', fontWeight: '700', backgroundColor: '#fff', color: '#000', marginLeft: 2}}>
      Logout
    </Button>
  );
};

export default Logout;