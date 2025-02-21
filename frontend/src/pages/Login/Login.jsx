// import io from 'socket.io-client';
// const socket = io('http://localhost:4000'); // Adjust the URL as needed
// import socket from '../../utils/socket'
// --------------------above code for socket -------------------------


import { Box, TextField, Button, Typography } from '@mui/material';
import { useEffect } from 'react';
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { setAuthToken } from '../../utils/auth'; // Import the utility to set the token
import { useNavigate } from 'react-router-dom';
import {login} from '../../store/authSlice'
const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const dispatch = useDispatch();
  const navigate = useNavigate();


  //---------------------auth using socket io -------------------------------
  // useEffect(() => {
  //   // Connect to Socket.IO server
  //   socket.connect();

  //   // Cleanup on component unmount
  //   return () => {
  //     socket.disconnect();
  //   };
  // }, []);

  // useEffect(() => {
  //   socket.connect();
  //   return () => {
  //     socket.disconnect();
  //   };
  // }, []);

  // const handleSubmit = (e) => {
  //   e.preventDefault();
  //   socket.emit('login', { email, password }); // Emit login event
  //   socket.on('loginResponse', (response) => {
  //     if (response.success) {
  //       // Set the token in local storage
  //       setAuthToken(response.token);
  //       // Handle successful login
  //       navigate('/');
  //     } else {
  //       // Handle login failure
  //       console.error(response.message);
  //     }
  //   });
  // };
  
// ----------------------------------------------------------------------

const handleSubmit = (e) => {
  e.preventDefault();
  console.log('handle submit in login called')
  // Dispatch the login action
  console.log('credentials',{email,password})
  dispatch(login({ email, password }));
  // navigate('/media')
  };  


  return (
    <Box sx={{ p: 3 }}>
      <Typography variant="h4" gutterBottom>
        Login
      </Typography>
      <form onSubmit={handleSubmit}>
        <TextField
          label="Email"
          variant="outlined"
          fullWidth
          margin="normal"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <TextField
          label="Password"
          type="password"
          variant="outlined"
          fullWidth
          margin="normal"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <Button variant="contained" color="primary" type="submit">
          Login
        </Button>
      </form>
    </Box>
  );
};

export default Login;
