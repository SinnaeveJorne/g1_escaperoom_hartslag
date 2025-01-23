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

  const gameNamespace = io.of('/room');


  // Add middleware to both namespaces
  gameNamespace.use(wrap(cookieParser()));
  gameNamespace.use(wrap(sessionMiddleware));

  const userSockets = new Map();
  const reserveUserSockets = new Map();
  const rooms = new Map();



  gameNamespace.on('connection', async (socket) => {
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
        if (userRoom.length === 0) {
          console.log('User does not have permission to join this room');
          socket.emit('error', { message: 'You do not have permission to join this room' });
          return;
        }

        currentRoom = roomName;

        socket.on('heartRate', heartbeat => {
          console.log(`Heartbeat received in /rooms: ${heartbeat}`);
          console.log(currentRoom);
          gameNamespace.in(currentRoom).emit('heartRate', {heartbeat: heartbeat, id: userId});
        });

        // Handle reconnection
        if (userSockets.has(userId)) {
          const previousSocket = userSockets.get(userId);
          previousSocket.disconnect(true);
          gameNamespace.in(currentRoom).emit('userleft', { userName, id: userId });
        } else if (reserveUserSockets.has(userId)) {
          gameNamespace.in(currentRoom).emit('userleft', { userName, id: userId });
        }

        userSockets.set(userId, socket);
        socket.join(roomName);

       if(!rooms.has(roomName)){
          rooms.set(roomName);
          const roomData = await db.query('SELECT * FROM gamerooms WHERE name = ?', [roomName]);
          gameNamespace.emit('roomcreated', { data: roomData[0] });
        }
        else
        {
          //select the amount of users in the room
          const roomusers = await db.query('SELECT COUNT(userId) as usercount FROM gameroom WHERE roomId = (SELECT roomId FROM gamerooms WHERE name = ?)', [roomName]);
          gameNamespace.emit('roomUpdate', { name:currentRoom, amount:roomusers[0].usercount });
        }


        gameNamespace.in(roomName).except(socket.id).emit('userjoined', { userName, id: userId });

        const roomUsers = await db.query(
          'SELECT u.username as userName, u.id FROM gameroom g JOIN user u ON g.userId = u.id WHERE g.roomId = (SELECT roomId FROM gamerooms WHERE name = ?)',
          [roomName]
        );

        gameNamespace.to(socket.id).emit('loadusers', { users: roomUsers });
      });


      socket.on('disconnect', () => {
        userSockets.delete(userId);
        reserveUserSockets.set(userId);

        setTimeout(async () => {
          if (!userSockets.has(userId)) {
            if (currentRoom) {
              await db.query('DELETE FROM gameroom WHERE userId = ? AND roomId = (SELECT roomId FROM gamerooms WHERE name = ?)', [userId, currentRoom]);
              gameNamespace.in(currentRoom).emit('userleft', { userName, id: userId });
              console.log(`${userName} has been removed from room ${currentRoom} due to disconnection`);
              const checkRoomQuery = 'SELECT * FROM gameroom WHERE roomId = (SELECT roomId FROM gamerooms WHERE name = ?)';
              const roomUsers = await db.query(checkRoomQuery, [currentRoom]);
              if (roomUsers.length === 0) {

                gameNamespace.emit('deleteRoom', { name:currentRoom });

                const deleteRoomQuery = 'DELETE FROM gamerooms WHERE name = ?';
                await db.query(deleteRoomQuery, [currentRoom]);
                console.log(`Room ${currentRoom} has been deleted`);
              }
              else{
                const roomusers = await db.query('SELECT COUNT(userId) as usercount FROM gameroom WHERE roomId = (SELECT roomId FROM gamerooms WHERE name = ?)', [currentRoom]);
                gameNamespace.emit('roomUpdate', { name:currentRoom, amount:roomusers[0].usercount });
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


