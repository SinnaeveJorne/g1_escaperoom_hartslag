const cookieParser = require('cookie-parser');


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
  io.use(wrap(cookieParser()));
  io.use(wrap(sessionMiddleware));

  io.on('connection', (socket) => {
    // console.log(socket.request.session.cookie);
    // console.log(socket.request.session);
    
    if (socket.request.session && socket.request.session.userName) {
      console.log(`User connected: ${socket.request.session.userName}`);
    }
    //why does here the session userName work
    //and in /room it doesn't work
   
  
    io.of('/room').on('connection', (roomSocket) => {
      if (roomSocket.request.session && roomSocket.request.session.userName) {
        console.log(`User connected to room: ${roomSocket.request.session.userName}`);
      }
    });
   
  });

  const roomsNamespace = io.of('/rooms');
roomsNamespace.use(wrap(cookieParser()));
roomsNamespace.use(wrap(sessionMiddleware));

roomsNamespace.on('connection', (roomSocket) => {
  const users = new Set();
    const userName = roomSocket.request.session?.userName;

    if (userName && !users.has(userName)) {
        users.add(userName);
        console.log(`${userName} has connected`);
    } else {
        console.log(`Disconnecting user: ${userName || 'unknown user'}`);
        roomSocket.disconnect(true); // Disconnect user if userName is already taken or undefined
    }

    roomSocket.on('disconnect', () => {
        users.delete(userName);
        console.log(`${userName} has disconnected`);
    });

  
});


const roomNamespace = io.of('/room');
roomNamespace.use(wrap(cookieParser()));
roomNamespace.use(wrap(sessionMiddleware));
 const users = new Map(); 
 roomNamespace.on('connection', (roomSocket) => {
  let joinedroom = null;
  // Map to store user ID and their socket
  const userName = roomSocket.request.session?.userName;
  const id = roomSocket.request.session?.userId;
  
  if (userName && id) {
    console.log("User connected:", userName);

    // Check if user already exists
    if (users.has(id)) {
      const oldSocket = users.get(id);
      oldSocket.roomSocket.disconnect(true);
    }

    // Save the new connection
    users.set(id, { roomid: null, userName: userName, roomSocket: roomSocket, id: id });

    roomSocket.on('joinroom', (room) => {
      console.log(`${userName} is joining room: ${room}`);
      roomSocket.join(room);
      users.get(id).roomid = room;
      joinedroom = room;


      const sendusers = [];
      for (let [userId, user] of users.entries()) {
        if (user.roomid === room) {
          sendusers.push({
            userName: user.userName,
            id: user.id
          });
        }
      }
      
      //this is to send to only the user that joined the room
      roomSocket.join(id);
      roomNamespace.in(id).emit('loadusers', sendusers);

    
      roomNamespace.in(room).except(id).emit('userjoined', { userName: userName, id: id });

    });



    roomSocket.on('disconnect', () => {
    
            roomNamespace.in(joinedroom).except(id).emit('userleft', {
              userName: userName,
              id: id
            });

            users.delete(id);
     
    });

    roomSocket.on("kickuser", (data) => {
    });

  } else {
    roomSocket.disconnect(true);
  }
});




 




};