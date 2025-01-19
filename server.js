const http = require('http');
const app = require('./config/expressConfig');
const initSocket = require('./config/socketConfig');
const registerRoute = require('./routes/registerRoute');
const loginRoute = require('./routes/loginRoute');
const gamelobbyRoute = require('./routes/gamelobbyRoute');
const roomsRoute = require('./routes/roomsRoute');
const roomRoute = require('./routes/roomRoute');
const griekelandRoute = require('./routes/griekelandRoute');
const griekelandgameRoute = require('./routes/griekelandgmeRoute');
const romestoryRoute = require('./routes/romestoryRoute');
// Mount register and login routes
app.use(registerRoute);
app.use(loginRoute);
app.use(gamelobbyRoute);
app.use(roomsRoute);
app.use(roomRoute);
app.use(griekelandRoute);
app.use(griekelandgameRoute);
app.use(romestoryRoute);

// Create an HTTP server from the Express app
const server = http.createServer(app);

// Initialize Socket.IO
initSocket(server);

// Use environment variable for port or fallback to 3000
const port = process.env.PORT || 3000;

// Start the server
server.listen(port, () => {
  const address = server.address();
  const host = address.address === '::' ? 'localhost' : address.address;
  const serverUrl = `http://${host}:${address.port}`;
  console.log(`Server is running on ${serverUrl}`);
});
