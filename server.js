const express = require('express');
const http = require('http');
const socketIo = require('socket.io');
const path = require('path');
const cors = require('cors');

// Create an Express app
const app = express();

// Enable CORS for all routes
app.use(cors({
  origin: '*', // Allow all origins for testing, adjust as needed
  methods: ['GET', 'POST'],
  allowedHeaders: ['*']
}));

// Serve static files from the 'public' folder
const publicPath = path.join(__dirname, 'public');
console.log('Static files path:', publicPath);
app.use(express.static(publicPath));

// Handle root route to serve index.html (in case the default static serving doesn't work)
app.get('/', (req, res) => {
  res.sendFile(path.join(publicPath, 'index.html'));
});

// Create an HTTP server from the Express app
const server = http.createServer(app);

// Attach Socket.IO to the server with CORS configuration
const io = socketIo(server, {
  cors: {
    origin: "*", // Allow all origins for Socket.IO
    methods: ["GET", "POST"],
    allowedHeaders: ["*"],
    credentials: true
  },
  allowEIO3: true, // Allow Engine.IO version 3
  transports: ['websocket', 'polling']
});

// Keep track of connected users
let connectedUsers = 0;

// When a client connects
io.on('connection', (socket) => {
  connectedUsers++;
  console.log('A user connected');
  
  // Broadcast to all clients that a new user connected
  io.emit('userCount', {
    count: connectedUsers,
    message: `A new user connected! Total users: ${connectedUsers}`
  });

  // Send a welcome message to the client
  socket.emit('welcome', 'Welcome to Beatscape!');

  // Listen for heart rate updates
  socket.on('heartRateUpdate', (data) => {
    // Broadcast the heart rate to all clients except the sender
    socket.broadcast.emit('otherUserHeartRate', {
      userId: socket.id,
      heartRate: data.heartRate,
      deviceName: data.deviceName,
      timestamp: data.timestamp
    });
  });

  // Listen for messages from the client
  socket.on('clientMessage', (message) => {
    console.log('Message from client:', message);
  });

  // Handle client disconnect
  socket.on('disconnect', () => {
    connectedUsers--;
    console.log('A user disconnected');
    // Broadcast to remaining clients that a user disconnected
    io.emit('userCount', {
      count: connectedUsers,
      message: `A user disconnected. Total users: ${connectedUsers}`
    });
    // Let others know this user's heart rate monitor is disconnected
    socket.broadcast.emit('userDisconnected', {
      userId: socket.id
    });
  }); // Add the missing closing brace here
});

// Use environment variable for port or fallback to 3000
const port = process.env.PORT || 3000;

// Start the server
server.listen(port, () => {
  const address = server.address();
  const host = address.address === '::' ? 'localhost' : address.address;  // For IPv6/IPv4 compatibility
  const serverUrl = `http://${host}:${address.port}`;
  console.log(`Server is running on ${serverUrl}`);
});
