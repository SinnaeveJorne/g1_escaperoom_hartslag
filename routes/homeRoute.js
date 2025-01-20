const express = require('express');
const path = require('path');

const router = express.Router();

router.get('/homeroute', (req, res) => {
  const username = req.session.userName || 'Guest';  // Default to 'Guest' if no session username exists
  res.render('home', { username });  // Renders home.ejs with dynamic username
});

module.exports = router;
