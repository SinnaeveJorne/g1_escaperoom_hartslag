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


// Serve static files from the 'public' folder
const publicPath = path.join(__dirname, '../public');
console.log('Static files path:', publicPath);
app.use(express.static(publicPath));

// Parse incoming requests with JSON payloads
app.use(express.json());

module.exports = app;

