const express = require('express');
const path = require('path');

const router = express.Router();

router.get('/home', (req, res) => {
  res.render('home');  // Renders home.ejs with dynamic username
});

router.get('/info', (req, res) => {
    res.sendFile(path.join(__dirname, '../public/info.html'));
});

module.exports = router;
