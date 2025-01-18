const express = require('express');
const fs = require('fs');
const path = require('path');

const router = express.Router();
 

router.get('/homeroute', (req, res) => {
  res.sendFile(path.join(__dirname, '../public/home.html'));
  }
  );




module.exports = router;
