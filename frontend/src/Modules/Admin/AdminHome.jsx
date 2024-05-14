import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import Navbar from '../../Components/Navbar/AdminNavbar';

function InstructorHome() {
        const token = localStorage.getItem('token');

        if (token) {
         console.log('Token:', token);
        } else {
         console.log('Token not found in LocalStorage');
        }

        const navigate = useNavigate();

    useEffect(() => {
        const token = localStorage.getItem('token');
        console.log("my token:", token)

        if (token) {
            axios.get('http://localhost:3001/secure/user', {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            })
            .then(response => {
                const data = response.data;
                console.log(data);
                if (data !== 'admin') {
                    navigate('/');
                }
            })
            .catch(error => {
                console.error('There was an error validating the token:', error);
                navigate('/');
            });
        } else {
            navigate('/');
        }
    }, [navigate]);


  return (
    <div>
      < Navbar />
      <h1>Hello, Admin</h1>
    </div>
  );
}

export default InstructorHome;