const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const dotenv = require('dotenv');
const { createServer } = require('http');
const { Server } = require('socket.io');
const authRoutes = require('./src/routes/auth');
const disputeRoutes = require('./src/routes/disputes');
const userRoutes = require('./src/routes/users');
const messageRoutes = require('./src/routes/messages');

dotenv.config();

const app = express();
const httpServer = createServer(app);
const io = new Server(httpServer, {
  cors: {
    origin: 'http://localhost:3000',
    methods: ['GET', 'POST'],
  },
});

app.use(cors());
app.use(express.json());

mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost/carpooling')
  .then(() => console.log('Connected to MongoDB'))
  .catch(err => console.error('Could not connect to MongoDB', err));

app.use('/api/auth', authRoutes);
app.use('/api/disputes', disputeRoutes);
app.use('/api/users', userRoutes);
app.use('/api/messages', messageRoutes);

io.on('connection', (socket) => {
  console.log('User connected:', socket.id);

  socket.on('adminMessage', (message) => {
    io.emit('newMessage', message);
  });

  socket.on('disconnect', () => {
    console.log('User disconnected:', socket.id);
  });
});

const PORT = process.env.PORT || 5000;
httpServer.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

