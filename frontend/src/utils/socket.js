// import { io } from 'socket.io-client';

// const socket = io('http://localhost:4000'); // Adjust the URL as needed

// export { socket };
import { io } from 'socket.io-client';
console.log(import.meta.env.SERVER)
const socket = io(import.meta.env.SERVER, {
    withCredentials: true ,
  transports: ['websocket'], // Forces WebSocket transport
  autoConnect: false,        // Prevent auto-connection
});

export default socket;

// const socket =io(import.meta.env.SERVER, { withCredentials: true }); //using useMemo for memoizing the socket why we use usememo here? because we want to create the socket only once and not on every render what does usememo do ? it memoizes the value so that it is not recreated on every render what is meaning of memoisation ? it is a process of storing the value of a function in a variable so that it is not recreated on every call 
