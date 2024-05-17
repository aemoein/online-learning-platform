import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { Box, Grid, Typography } from '@mui/material';
import Navbar from '../../Components/Navbar/StudentNavbar';
import NotificationCard from '../../Components/Cards/Student/NotificationsCard';

const Notifications = () => {
  const [notifications, setNotifications] = useState([]);
  const navigate = useNavigate();
  
  const token = localStorage.getItem('token');
  const axiosInstance = axios.create({
    baseURL: 'http://localhost:3003/',
    headers: {
      'Authorization': `Bearer ${token}`
    }
  });
  
  useEffect(() => {
    if (!token) {
      console.log('Token not found in LocalStorage');
      navigate('/');
      return;
    }
  
    const fetchPendingNotifications = async () => {
      try {
        const response = await axiosInstance.get('/notifications');
        const notificationsData = response.data;
  
        const notificationsWithData = await Promise.all(
          notificationsData.map(async (notification) => {
            try {
              const courseResponse = await axiosInstance.get(`http://localhost:3002/student/courses/${notification.course}`);
              const courseData = courseResponse.data;
  
              return {
                ...notification,
                courseName: courseData.name,
              };
            } catch (error) {
              console.error(`Error fetching data for notification ${notification._id}:`, error);
              return {
                ...notification,
                courseName: 'N/A', // Set courseName to N/A on error
              };
            }
          })
        );
  
        setNotifications(notificationsWithData);
  
      } catch (error) {
        console.error('Error fetching pending notifications:', error);
      }
    };
  
    fetchPendingNotifications();
  }, [navigate, token, axiosInstance]);
  
  return (
    <>
      <Navbar />
      <Box sx={{ height: 40 }} />
      <Box sx={{ padding: '2rem' }}>
        <Typography variant="h4" sx={{ marginBottom: '2rem', fontFamily: 'Poppins', fontWeight: '900' }}>
            Notifications
        </Typography>
        <Grid container spacing={4}>
          {notifications.map(notification => (
            <Grid item key={notification._id}>
                <NotificationCard 
                    name={notification.courseName}
                    status={notification.status}
                />
            </Grid>
          ))}
        </Grid>
      </Box>
    </>
  );
};

export default Notifications;