import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios'; // Import Axios
import Navbar from '../../Components/Navbar/StudentNavbar';

function StudentHome() {
    const navigate = useNavigate();

    useEffect(() => {
        const token = localStorage.getItem('token');
        console.log("my token:", token)

        if (token) {
            // Use Axios instead of fetch
            axios.get('http://localhost:3001/secure/user', {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            })
            .then(response => {
                const data = response.data;
                console.log(data);
                if (data !== 'student') {
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
            <Navbar />
            <h1>Hello, Student</h1>
        </div>
    );
}

export default StudentHome;