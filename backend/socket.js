import { Server } from 'socket.io';
import User from './models/User.js'; // Ensure User model is imported
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

const setupWebSocket = (server) => {
  const io = new Server(server);
  const subscriptions = {}; // To track user subscriptions
  const comments = {}; // To track comments on articles

  io.on('connection', (socket) => {
    console.log('New client connected');

    // Handle subscription to news categories
    socket.on('subscribeToNews', (category) => {
      console.log(`Client subscribed to news category: ${category}`);
      if (!subscriptions[category]) {
        subscriptions[category] = [];
      }
      subscriptions[category].push(socket.id); // Track the socket ID for the category
    });

    // Logic to send updates for the subscribed category
    socket.on('newArticle', (article) => {
      const { category } = article; // Assuming article has a category field
      if (subscriptions[category]) {
        subscriptions[category].forEach((id) => {
          io.to(id).emit('articleUpdate', article); // Notify subscribed clients
        });
      }
    });

    // Handle comments on articles
    socket.on('commentOnArticle', ({ articleId, comment }) => {
      if (!comments[articleId]) {
        comments[articleId] = [];
      }
      comments[articleId].push(comment); // Store the comment
      io.emit('newComment', { articleId, comment }); // Broadcast the comment to all clients
    });

    socket.on('login', async ({ email, password }) => {
      // Logic to authenticate user
      const user = await User.findOne({ email });
      if (!user || !(await bcrypt.compare(password, user.password))) {
        socket.emit('loginResponse', { success: false, message: 'Invalid credentials' });
        return;
      }
      
      const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '1h' });
      socket.emit('loginResponse', { success: true, token, user: { id: user._id, name: user.name, email: user.email } });
    });

    socket.on('disconnect', () => {
      console.log('Client disconnected');
    });
  });

  return io;
};

export default setupWebSocket;
