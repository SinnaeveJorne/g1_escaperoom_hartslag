const express = require('express');
const bcrypt = require('bcrypt');
const fs = require('fs');
const path = require('path');

const router = express.Router();
 

router.get('/greecegame', (req, res) => {
  res.sendFile(path.join(__dirname, '../public/greecegame.html'));
  }
  );


module.exports = router;
