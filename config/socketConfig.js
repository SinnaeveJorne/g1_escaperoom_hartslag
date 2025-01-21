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

  const wrap = (middleware) => (socket, next) => middleware(socket.request, {}, next);

  const roomNamespace = io.of('/room');
  const roomsNamespace = io.of('/rooms');


  // Add middleware to both namespaces
  roomNamespace.use(wrap(cookieParser()));
  roomNamespace.use(wrap(sessionMiddleware));

  roomsNamespace.use(wrap(cookieParser()));
  roomsNamespace.use(wrap(sessionMiddleware));

  const userSockets = new Map();
  const reserveUserSockets = new Map();

  roomsNamespace.on('connection', (socket) => {
    const userName = socket.request.session?.userName;
    const userId = socket.request.session?.userId;

    console.log(`User connected to /rooms: ${userName} (id: ${userId})`);

    if (userName && userId) {
      socket.on('test', (data) => {
        console.log(`Test event received in /rooms: ${data}`);
      });

      socket.on('disconnect', () => {
        console.log(`User disconnected from /rooms: ${userName} (id: ${userId})`);
      });
    } else {
      socket.disconnect(true);
    }
  });

  roomNamespace.on('connection', async (socket) => {
    const userName = socket.request.session?.userName;
    const userId = socket.request.session?.userId;
    let currentRoom = null;

    if (userName && userId) {
      console.log(`User connected to /room: ${userName} (id: ${userId})`);

      socket.on('joinroom', async (roomName) => {
       

        // Check room permissions
        const userRoomQuery = `
          SELECT * 
          FROM gameroom g
          JOIN gamerooms r ON g.roomId = r.roomId
          WHERE g.userId = ? AND r.name = ?
        `;
        const userRoom = await db.query(userRoomQuery, [userId, roomName]);
        console.log(roomName);
        if (userRoom.length === 0) {
          console.log('User does not have permission to join this room');
          socket.emit('error', { message: 'You do not have permission to join this room' });
          return;
        }

        currentRoom = roomName;

        // Handle reconnection
        if (userSockets.has(userId)) {
          const previousSocket = userSockets.get(userId);
          previousSocket.disconnect(true);
          roomNamespace.in(currentRoom).emit('userleft', { userName, id: userId });
        } else if (reserveUserSockets.has(userId)) {
          roomNamespace.in(currentRoom).emit('userleft', { userName, id: userId });
        }

        userSockets.set(userId, socket);
        socket.join(roomName);

        console.log(`User ${userName} joined room ${roomName}`);
        roomNamespace.in(roomName).except(socket.id).emit('userjoined', { userName, id: userId });

        const roomUsers = await db.query(
          'SELECT u.username as userName, u.id FROM gameroom g JOIN user u ON g.userId = u.id WHERE g.roomId = (SELECT roomId FROM gamerooms WHERE name = ?)',
          [roomName]
        );

        roomNamespace.to(socket.id).emit('loadusers', { users: roomUsers });
      });

      socket.on('disconnect', () => {
        userSockets.delete(userId);
        reserveUserSockets.set(userId);

        setTimeout(async () => {
          if (!userSockets.has(userId)) {
            if (currentRoom) {
              await db.query('DELETE FROM gameroom WHERE userId = ? AND roomId = (SELECT roomId FROM gamerooms WHERE name = ?)', [userId, currentRoom]);
              roomNamespace.in(currentRoom).emit('userleft', { userName, id: userId });
              console.log(`${userName} has been removed from room ${currentRoom} due to disconnection`);

              const checkRoomQuery = 'SELECT * FROM gameroom WHERE roomId = (SELECT roomId FROM gamerooms WHERE name = ?)';
              const roomUsers = await db.query(checkRoomQuery, [currentRoom]);
              if (roomUsers.length === 0) {
                const deleteRoomQuery = 'DELETE FROM gamerooms WHERE name = ?';
                await db.query(deleteRoomQuery, [currentRoom]);
                console.log(`Room ${currentRoom} has been deleted`);
              }
              reserveUserSockets.delete(userId);
            }
          }
        }, 3000);
      });
    } else {
      socket.disconnect(true);
      reserveUserSockets.delete(userId);
    }
  });

  
  

};


