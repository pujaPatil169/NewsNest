import dotenv from 'dotenv';
dotenv.config();
console.log('MONGO_URI:', process.env.MONGO_URI); // Debugging line to check MONGO_URI

import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import authRoutes from './routes/authRoutes.js';
import newsRoutes from './routes/newsRoutes.js';
import errorHandler from './middlewares/error.js';
import { connectRedis } from './config/redis.js';
import connectDB from './config/db.js';
import setupWebSocket from './socket.js'; // Import WebSocket setup
import { Server } from 'socket.io';
import { createServer } from 'http';
// import { readFileSync } from 'fs';
import cookieParser from 'cookie-parser';

const app = express();
const server = createServer(app);
const io = new Server(server, {
  cors: {
    origin: 'http://localhost:5173',
    methods: ['GET', 'POST'], // Allow GET and POST requests 
    credentials: true,
  },
});

io.on('connection', (socket) => {
  console.log('New WebSocket connection');
  console.log('user/socket connected Socket ID:', socket.id);
});

// Middleware
app.use(cors({ credentials: true, origin: process.env.CLIENT_URL }));
app.use(express.json());
app.use(cookieParser());

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/news', newsRoutes);
// app.use('/api/news', newsRoutes);

// Error handling
app.use(errorHandler);

// Connect to MongoDB and Redis
const start = async () => {
  try {
    await connectDB();
    await connectRedis();
    server.listen(4000, () => console.log('Server running on port 4000'));
    // setupWebSocket(server); // Set up WebSocket server
  } catch (err) {
    console.error(err);
  }
};

start();
