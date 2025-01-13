const socketIo = require('socket.io');

module.exports = (server) => {
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

  let connectedUsers = 0;

  io.on('connection', (socket) => {
    connectedUsers++;
    console.log('A user connected');
    
    io.emit('userCount', {
      count: connectedUsers,
      message: `A new user connected! Total users: ${connectedUsers}`
    });

    socket.emit('welcome', 'Welcome to Beatscape!');

    socket.on('heartRateUpdate', (data) => {
      socket.broadcast.emit('otherUserHeartRate', {
        userId: socket.id,
        heartRate: data.heartRate,
        deviceName: data.deviceName,
        timestamp: data.timestamp,
        username: data.username
      });
    });

    socket.on('clientMessage', (message) => {
      console.log('Message from client:', message);
    });

    socket.on('disconnect', () => {
      connectedUsers--;
      console.log('A user disconnected');
      io.emit('userCount', {
        count: connectedUsers,
        message: `A user disconnected. Total users: ${connectedUsers}`
      });
      socket.broadcast.emit('userDisconnected', {
        userId: socket.id
      });
    });
  });
};
