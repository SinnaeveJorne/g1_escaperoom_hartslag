const express = require('express');
const cors = require('cors');
const path = require('path');

const app = express();

// Enable CORS for all routes
app.use(cors({
  origin: '*', // Allow all origins for testing, adjust as needed
  methods: ['GET', 'POST'],
  allowedHeaders: ['*'],
}));

app.set('view engine', 'ejs');
app.set('views', './views'); // Directory where your EJS templates will be

// Middleware to block access to URLs ending with .html
app.use((req, res, next) => {
  if (req.path.endsWith('.html')) {
    console.log(`Blocked access to: ${req.path}`);
    return res.status(403).send('Access to .html files is forbidden.');
  }
  next();
});

// Serve static files from the 'public' folder
const publicPath = path.join(__dirname, '../public');
console.log('Static files path:', publicPath);
app.use(express.static(publicPath, { index: false }));

// Parse incoming requests with JSON payloads
app.use(express.json());

module.exports = app;
