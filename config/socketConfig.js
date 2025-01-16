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
    console.log(socket.request.session.cookie);
    console.log(socket.request.session);
    
    if (socket.request.session && socket.request.session.username) {
      console.log(`User connected: ${socket.request.session.username}`);
    }
    // Handle other events...
  });
};