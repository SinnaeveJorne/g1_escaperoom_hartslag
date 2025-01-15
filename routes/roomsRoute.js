const express = require('express');
const bcrypt = require('bcrypt');
const fs = require('fs');
const path = require('path');

const router = express.Router();
 

router.get('/rooms', (req, res) => {
  res.sendFile(path.join(__dirname, '../public/rooms.html'));
  }
  );


module.exports = router;
