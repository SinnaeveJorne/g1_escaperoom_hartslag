const cookieParser = require('cookie-parser');
const db = require('./db');
const { use } = require('../routes/roomRoute');

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
  const rooms = new Map();



  gameNamespace.on('connection', async (socket) => {
    const userName = socket.request.session?.userName;
    const userId = socket.request.session?.userId;
    let currentRoom = null;
    

    if (userName && userId) {


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
          gameNamespace.in(currentRoom).emit('heartRate', {heartbeat: heartbeat, id: userId});
        });

        // Handle reconnection
        if (userSockets.has(userId)) {
          await gameNamespace.in(currentRoom).emit('userleft', { userName, id: userId });
          await userdisconnect(userId,true);
        }

        userSockets.set(userId, socket);
        socket.join(roomName);

       if(!rooms.has(roomName)){
          rooms.set(roomName);
          const roomData = await db.query('SELECT * FROM gamerooms WHERE name = ?', [roomName]);
          gameNamespace.emit('roomcreated', { data: roomData[0] });
          showadmin();
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

      socket.on('kickuser', async (targetUser) => {
        //make targetuser a number
        targetUser = parseInt(targetUser);
          //check if the person is admin then kick the user also disconnect the user from the room and delete the user from the room
          const checkAdminQuery = 'SELECT * FROM gameroom WHERE userId = ? AND isAdmin = 1 AND roomId = (SELECT roomId FROM gamerooms WHERE name = ?)';
          const isAdmin = await db.query(checkAdminQuery, [userId, currentRoom]);
          if(isAdmin.length === 0){
            console.log('User is not admin');
            return;
          }

          console.log(targetUser);
          const deleteUserQuery  = 'DELETE FROM gameroom WHERE userId = ? AND roomId = (SELECT roomId FROM gamerooms WHERE name = ?)';
          await db.query(deleteUserQuery, [targetUser, currentRoom]);

          // gameNamespace.in(currentRoom).emit('userleft', { userName, id: targetUser });
          console.log(`${userName} has been removed from room ${currentRoom}`);
          console.log(targetUser);
          userdisconnect(targetUser);
      
      });

      socket.on('startgame', async () => {
        const checkAdminQuery = 'SELECT * FROM gameroom WHERE userId = ? AND isAdmin = 1 AND roomId = (SELECT roomId FROM gamerooms WHERE name = ?)';
        const isAdmin = await db.query(checkAdminQuery, [userId, currentRoom]);
        if(isAdmin.length === 0){
          console.log('User is not admin');
          return;
        }

        gameNamespace.in(currentRoom).emit('startgame');
      }
      );


    async function userdisconnect(targetUser,importUser = false)
      {
        if(userSockets.has(targetUser)){
          const previousSocket = userSockets.get(targetUser);
          gameNamespace.to(previousSocket.id).emit('kicked');
          console.log("ik ga naar deze stap");
          previousSocket.disconnect(true);

          //if imporuser is true add this user in the database room
          if(importUser){
            const insertPlayerInRoomQuery = 'INSERT INTO gameroom (userId, roomId) VALUES (?, (SELECT roomId FROM gamerooms WHERE name = ?))';
            await db.query(insertPlayerInRoomQuery, [targetUser, currentRoom]);
          }

        }

      }


      async function showadmin(){
        const checkAdminQuery = 'SELECT * FROM gameroom WHERE isAdmin = 1 AND roomId = (SELECT roomId FROM gamerooms WHERE name = ?)';
        const isAdmin = await db.query(checkAdminQuery, [currentRoom]);
        console.log(isAdmin);
        if(isAdmin.length === 0){
          console.log('No admin found');
          return;
        }
        const admin = userSockets.get(isAdmin[0].userId);
        ///get userid from admin
        isadmin = isAdmin[0].userId;
        gameNamespace.to(admin.id).emit('showadmin',isadmin);
      }

      socket.on('disconnect', async() => {
        console.log('User disconnected');
        userSockets.delete(userId);
        socket.emit("disconnected", {message: "You have been disconnected"});
        if (!userSockets.has(userId)) {
            if (currentRoom) {
                // Delete the user from the room
                await db.query(
                    'DELETE FROM gameroom WHERE userId = ? AND roomId = (SELECT roomId FROM gamerooms WHERE name = ?)',
                    [userId, currentRoom]
                );

                // Notify others in the room that the user left
                gameNamespace.in(currentRoom).emit('userleft', { userName, id: userId });

                // Check if there are any users left in the room
                const checkRoomQuery = `
                    SELECT * FROM gameroom 
                    WHERE roomId = (SELECT roomId FROM gamerooms WHERE name = ?)
                `;
                const roomUsers = await db.query(checkRoomQuery, [currentRoom]);

                if (roomUsers.length === 0) {
                    // Delete the room if it's empty
                    gameNamespace.emit('deleteRoom', { name: currentRoom });

                    const deleteRoomQuery = 'DELETE FROM gamerooms WHERE name = ?';
                    await db.query(deleteRoomQuery, [currentRoom]);
                    rooms.delete(currentRoom);

                    console.log(`Room ${currentRoom} has been deleted`);
                } else {
                    // Update the room's user count
                    const roomUsersCountQuery = `
                        SELECT COUNT(userId) AS usercount 
                        FROM gameroom 
                        WHERE roomId = (SELECT roomId FROM gamerooms WHERE name = ?)
                    `;
                    const roomUsersCount = await db.query(roomUsersCountQuery, [currentRoom]);

                    gameNamespace.emit('roomUpdate', {
                        name: currentRoom,
                        amount: roomUsersCount[0].usercount,
                    });

                    // Check if the disconnected user was an admin
                    const checkAdminQuery = `
                        SELECT * FROM gameroom where roomId = (SELECT roomId FROM gamerooms WHERE name = ?) AND isAdmin = 1`;
                    const isAdmin = await db.query(checkAdminQuery, [currentRoom]);

                    if (isAdmin.length === 0) {
                        // Assign a new admin if the current admin left
                        const newAdminQuery = `
                            SELECT userId 
                            FROM gameroom 
                            WHERE roomId = (SELECT roomId FROM gamerooms WHERE name = ?) 
                            LIMIT 1
                        `;
                        const newAdmin = await db.query(newAdminQuery, [currentRoom]);

                        if (newAdmin.length > 0) {
                            const updateAdminQuery = `
                                UPDATE gameroom 
                                SET isAdmin = 1 
                                WHERE userId = ? AND roomId = (SELECT roomId FROM gamerooms WHERE name = ?)
                            `;
                            await db.query(updateAdminQuery, [newAdmin[0].userId, currentRoom]);

                            console.log(`New admin has been selected: User ID ${newAdmin[0].userId}`);
                            showadmin();
                        } else {
                            console.log('No users left to assign as admin');
                        }
                    }
                }
            }
        }
      });
    }
  });

  
  

};


