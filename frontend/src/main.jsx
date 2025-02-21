import { StrictMode ,useMemo} from 'react';
// import { io } from 'socket.io-client';
import socket from './utils/socket.js'
// const socket =io(import.meta.env.SERVER, { withCredentials: true }); //using useMemo for memoizing the socket why we use usememo here? because we want to create the socket only once and not on every render what does usememo do ? it memoizes the value so that it is not recreated on every render what is meaning of memoisation ? it is a process of storing the value of a function in a variable so that it is not recreated on every call 
// const socket =()=>( useMemo(()=>io(import.meta.env.SERVER, { withCredentials: true }),[])); //using useMemo for memoizing the socket why we use usememo here? because we want to create the socket only once and not on every render what does usememo do ? it memoizes the value so that it is not recreated on every render what is meaning of memoisation ? it is a process of storing the value of a function in a variable so that it is not recreated on every call 

// Adjust the URL as needed
//meaning of above line is that we are connecting to the socket server running on port 4000
// console.log('Socket.IO client attempting to connect'); // Log connection attempt
//that means client is trying to connect to the server and does that mean server does not innitiate the connection
//yes, the client initiates the connection to the server and server listens for the connection
//and when the connection is established, the server sends a message to the client that the connection is established
// console.log('Socket.IO client connected'); // Log successful connection
//how can we disconnect the client from the server
//we can disconnect the client from the server by using the disconnect method on the socket object
// socket.disconnect(); // Disconnect the client from the serverhttp://localhost:5173
//where do we write this socket.disconnect() method
//we can write this method in the component that we want to disconnect from the server or we can write this method in the useEffect hook of the component that we want to disconnect from the server when the component is unmounted or when the component is removed from the DOM or when the component is no longer rendered 
//why do we use useEffect hook to disconnect the client from the server what  is the logic behind it 
//the logic behind it is that when the component is mounted, the useEffect hook is called and th s useEffect hook is called only once when the component is mounted and when the component is unmounted, the useEffect hook is called again and the cleanup function is called and in the cleanup function, we can disconnect the client from the server and when the component is mounted again, the useEffect hook is called again and the client is connected to the server again what is this cleanup function  in the useEffect hook 
//the cleanup function is a function that is called when the component is unmounted or when the component is removed from the DOM or when the component is no longer rendered give me an example of it  in the useEffect hook 
//example of cleanup function in useEffect hook is that when we want to add an event listener to the window object and when the component is unmounted, we want to remove the event listener from the window object so that the event listener is not called when the component is unmounted or when the component is removed from the DOM or when the component is no longer rendered
//what is the syntax of the cleanup function in the useEffect hook
//the syntax of the cleanup function in the useEffect hook is that we write the cleanup function in th
// useEffect hook as a function that returns another function and the function that returns another function is called th
// cleanup function and the cleanup function is called when the component is unmounted or when the component is removed from the DOM or when the component is no longer rendered
//react ka feature hai jab bhi useEffect dobara chalega toh pehle wala useEffect jo chala tha uska cleanup function chalega
//useEffect mai return ke andar jo function hai woh cleanup function hai
console.log('Socket.IO client attempting to connect'); // Log connection attempt
import { createRoot } from 'react-dom/client';
import { Provider } from 'react-redux'; // Import Provider from react-redux
import { Router } from 'react-router-dom';
// import { RouterProvider } from 'react-router5'; // Import RouterProvider from react-router5
import { RouterProvider } from 'react-router-dom'; // ✅ Correct import
import { CssBaseline } from '@mui/material';
import { router } from './routes.jsx';
import store from './store/store'; // Import the Redux store
import './index.css';
// import AppInitializer from './components/AppInitializer';

socket.connect(); // Connect to Socket.IO server

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Provider store={store}> {/* Wrap the Router with Provider */}
      {/* <Router router={router} /> */}
      <CssBaseline />
      {/* <AppInitializer> */}
      <RouterProvider router={router} />  {/* ✅ Correct component */}
      {/* </AppInitializer> */}

    </Provider>
  </StrictMode>
);
