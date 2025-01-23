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
const romegameRoute = require('./routes/romegameRoute');
const zwitserlandstoryRoute = require('./routes/zwidserstory');
const zwitserlandgameRoute = require('./routes/zwidGame');
const duitsstory = require('./routes/duitsstoryRoute');
const duitsgame = require('./routes/duitsgame');
const belgstoryRoute = require('./routes/belgstoryRoute');
const parijsgame = require('./routes/parisgame');
const parijsstory = require('./routes/parisstory');
const leaderbordRoute = require('./routes/leaderbordRoute');
const homeRoute = require('./routes/homeRoute');
const crypto = require('crypto');
const secret = "jorne";
const fs = require('fs');
const session = require('express-session');
const path = require('path');
const bodyParser = require('body-parser');
const MemoryStore = require('memorystore')(session);
const cookieParser = require('cookie-parser');
const db = require('./config/db');

app.use(bodyParser.urlencoded({
  extended: true
}));

app.use(bodyParser.json());

const s = session({
  secret: secret,
  resave: false,
  saveUninitialized: true,
  store: new MemoryStore({
    checkPeriod: 86400000 // Prune expired entries every 24h
  }),
  cookie: {
  secure: false ,   
  maxAge: 10 * 365 * 24 * 60 * 60 * 1000,
   sameSite: 'strict',
   httpOnly: true
  } // Set to `true` if using HTTPS
  
});


app.use(cookieParser());
app.use(s);

app.get('/*', (req, res, next) => {
  if (req.session.userId) {
    // Check if the path is not a dynamic room path
    if (!req.path.startsWith('/room/')) {
      const roomsData = JSON.parse(fs.readFileSync(path.join(__dirname, 'data/roomcodes.json')));
      const currentUserId = req.session.userid;

      let isRoomFound = false;
      let userRoomName = "";

      // Find the room where the user is present
      for (const room of roomsData) {
        if (room.users.includes(currentUserId)) {
          isRoomFound = true;
          userRoomName = room.roomname;
          break;
        }
      }


      if (isRoomFound) {
        return res.redirect(`/room/${userRoomName}`);
      }
      else{
        if (req.path.startsWith('/register') || req.path.startsWith('/login')){
          return res.redirect('/homeroute');
        }
        else{
          return next();
        }
      }
    }
    return next();
  } 
  
  
  else {
    // Allow access to login and register pages
    if (req.path === '/login' || req.path === '/register') {
      return next();
    }
    // Redirect unauthenticated users to login
    return res.redirect('/login');
  }
});

 

// Mount register and login routes
app.use(registerRoute);
app.use(loginRoute);
app.use(gamelobbyRoute);
app.use(roomsRoute);
app.use(roomRoute);
app.use(griekelandRoute);
app.use(griekelandgameRoute);
app.use(romestoryRoute);
app.use(romegameRoute);
app.use(zwitserlandstoryRoute);
app.use(zwitserlandgameRoute);
app.use(duitsstory);
app.use(duitsgame);
app.use(belgstoryRoute);
app.use(parijsgame);
app.use(parijsstory);
app.use(leaderbordRoute);



app.use(homeRoute);
 

// Create an HTTP server from the Express app
const server = http.createServer(app);

// Initialize Socket.IO
initSocket(server, s);

// Use environment variable for port or fallback to 3000
const port = process.env.PORT || 3000;


app.use((req, res) => {
  res.redirect('/homeroute');
  
});



// Start the server
server.listen(port, () => {
  const address = server.address();
  const host = address.address === '::' ? 'localhost' : address.address;
  const serverUrl = `http://${host}:${address.port}`;
  console.log(`Server is running on ${serverUrl}`);
  const deleteRoomQuery = 'DELETE FROM gameroom';
  db.query(deleteRoomQuery);
});