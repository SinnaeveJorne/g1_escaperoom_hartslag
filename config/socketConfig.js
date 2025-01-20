const cookieParser = require('cookie-parser');
const db = require('./db');

module.exports = (server, sessionMiddleware) => {
  const io = require('socket.io')(server, {
    cors: {
      origin: "*",
      methods: ["GET", "POST"],
      allowedHeaders: ["*"],
      credentials: true,
    },
  });

  // Wrap middleware for socket connections
  const wrap = (middleware) => (socket, next) => middleware(socket.request, {}, next);

  const roomNamespace = io.of('/room');
  roomNamespace.use(wrap(cookieParser()));
  roomNamespace.use(wrap(sessionMiddleware));

  // Track active users by userId and their corresponding sockets
  const userSockets = new Map();

  roomNamespace.on('connection', (socket) => {
    const userName = socket.request.session?.userName;
    const userId = socket.request.session?.userId;
    let currentRoom = null; // Track the room the user is currently in

    if (userName && userId) {
      console.log(`User connected: ${userName} (ID: ${userId})`);

      // If the user is already connected, disconnect their previous socket
      if (userSockets.has(userId)) {
        const previousSocket = userSockets.get(userId);
        previousSocket.disconnect(true);
        console.log(`Disconnected previous socket for user ${userName} (ID: ${userId})`);
      }

      // Store the current socket for the user
      userSockets.set(userId, socket);

      socket.on('joinroom', async (roomName) => {
        // Check if the user has permission to join the room
        const userRoomQuery = `
          SELECT * 
          FROM gameroom g
          JOIN gamerooms r ON g.roomId = r.roomId
          WHERE g.userId = ? AND r.name = ?
        `;
        const userRoom = await db.query(userRoomQuery, [userId, roomName]);

        if (userRoom.length === 0) {
          console.log('User does not have permission to join this room');
          socket.emit('error', { message: 'You do not have permission to join this room' });
          return;
        }

        // Join the room (since the user has permission)
        currentRoom = roomName;
        socket.join(roomName);

        console.log(`User ${userName} joined room ${roomName}`);

        // Notify other users in the room about the new user (except themselves)
        roomNamespace.in(roomName).except(socket.id).emit('userjoined', { userName, userId });

        // Send the updated list of users in the room
        const roomUsers = await db.query(
          'SELECT u.username as userName, u.id FROM gameroom g JOIN user u ON g.userId = u.id WHERE g.roomId = (SELECT roomId FROM gamerooms WHERE name = ?)',
          [roomName]
        );

        roomNamespace.in(roomName).emit('loadusers', { users: roomUsers });
      });

      socket.on('disconnect', () => {
        userSockets.delete(userId); // Remove the userId from the map

        setTimeout(async () => {
          // If the userId is not back in the map, remove the user
          if (!userSockets.has(userId)) {
            if (currentRoom) {
              // Delete the user from the DB
              await db.query('DELETE FROM gameroom WHERE userId = ? AND roomId = (SELECT roomId FROM gamerooms WHERE name = ?)', [userId, currentRoom]);
              roomNamespace.in(currentRoom).emit('userleft', { userName, userId });
              console.log(`${userName} has been removed from room ${currentRoom} due to disconnection`);
            }
          }
        }, 3000); // 3 seconds timeout
      });
    } else {
      socket.disconnect(true); // Disconnect the user if they don't have a valid session
    }
  });
};
