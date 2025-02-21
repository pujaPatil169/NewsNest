# React + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react/README.md) uses [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh


websocket is a communication protocol like http,ftp,smtp in sab ke alag alag use cases hai , emit ek method hota hai to send an message or trigger event
io--refers to server , when we do io.emit i am sending it to entire circuit means all the socket connected to server (here circuit is an anology used to visualise server connection withh sockets and socket is particular user and not entire circuit ), har sokect ki ek id hoti hai jisko ham socket.id karake access kar sakate hai ,connection and disconnect are two prebuild events, baki kuch bhi kisi bhi naam se event bana sakate ho [io--server, socket--client]


server--
//agar kiya io.emit to msg sare socket ke pass chala jayega 
//agar kiys socket.emit to msg particular socket ke pass  jayega 
//socket.broadcast.emit to jo socket usko chodke baki sabb par chala jayega msg